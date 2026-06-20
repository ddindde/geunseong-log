"use server";
import { supabase } from "@/app/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createWorkout(formData) {
  // 1. workouts 먼저 INSERT
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
    .select() // 삽입된 행 반환 (id 필요)
    .single();

  if (error) throw new Error(error.message);

  // 2. sets INSERT (운동 종목별로 여러 개)
  const exerciseNames = formData.getAll("exercise_name");
  const weights = formData.getAll("weight");
  const setCounts = formData.getAll("set_count");
  const reps = formData.getAll("reps");

  // 입력된 세트가 있을 때만 INSERT
  if (exerciseNames.length > 0 && exerciseNames[0] !== "") {
    const setsData = exerciseNames.map((name, i) => ({
      workout_id: workout.id,
      exercise_name: name,
      weight: Number(weights[i]) || 0,
      set_count: Number(setCounts[i]) || 1,
      reps: Number(reps[i]) || 0,
    }));

    const { error: setsError } = await supabase.from("sets").insert(setsData);

    if (setsError) throw new Error(setsError.message);
  }

  revalidatePath("/log");
  redirect("/log");
}
