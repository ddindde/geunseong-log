"use server";
import { supabase } from "../../lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// 수정
export async function updateWorkout(id, formData) {
  const { error } = await supabase
    .from("workouts")
    .update({
      name: formData.get("name"),
      duration: Number(formData.get("duration")),
      date: formData.get("date"),
      condition: formData.get("condition"),
      memo: formData.get("memo"),
      emoji: formData.get("emoji"),
    })
    .eq("id", id); // 이 id의 행만 수정 (없으면 전체 수정됨!)

  if (error) throw new Error(error.message);
  revalidatePath("/log");
  redirect("/log");
}

// 삭제
export async function deleteWorkout(formData) {
  const id = formData.get("id");
  const { error } = await supabase.from("workouts").delete().eq("id", id); // 이 id의 행만 삭제 (없으면 전체 삭제됨!)

  if (error) throw new Error(error.message);
  revalidatePath("/log");
  redirect("/log");
}
