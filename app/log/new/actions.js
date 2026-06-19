"use server";
import { supabase } from "@/app/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createWorkout(formData) {
  const { error } = await supabase.from("workouts").insert({
    name: formData.get("name"),
    duration: Number(formData.get("duration")),
    date: formData.get("date"),
    condition: formData.get("condition"),
    memo: formData.get("memo"),
    emoji: formData.get("emoji"),
  });
  if (error) throw new Error(error.message);
  revalidatePath("/log");
  redirect("/log");
}
