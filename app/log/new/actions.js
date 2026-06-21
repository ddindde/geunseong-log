"use server";
import { supabase } from "@/app/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createWorkout(formData) {
  const { data: workout, error } = await supabase
    .from("workouts")
    .insert({
      name: formData.get("name"),
      duration: Number(formData.get("duration")),
      date: formData.get("date"),
      condition: formData.get("condition"),
      memo: formData.get("memo"),
      emoji: formData.get("emoji"),
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  const exerciseNames = formData.getAll("exercise_name");
  const weights = formData.getAll("weight");
  const setCounts = formData.getAll("set_count");
  const reps = formData.getAll("reps");
  const exerciseNotes = formData.getAll("exercise_note");
  const exerciseTypes = formData.getAll("exercise_type");

  if (exerciseNames.length > 0 && exerciseNames[0] !== "") {
    const setsData = exerciseNames.map((name, i) => ({
      workout_id: workout.id,
      exercise_name: name,
      weight: Number(weights[i]) || 0,
      set_count: Number(setCounts[i]) || 1,
      reps: Number(reps[i]) || 0,
      exercise_note: exerciseNotes[i] || null,
      exercise_type: exerciseTypes[i] || "weight",
    }));

    const { error: setsError } = await supabase.from("sets").insert(setsData);
    if (setsError) throw new Error(setsError.message);
  }

  revalidatePath("/log");
  redirect("/log");
}
