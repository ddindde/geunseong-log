import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { updateWorkout } from "../actions";
import Link from "next/link";

export default async function EditWorkoutPage({ params }) {
  const { id } = await params;

  // 기존 데이터 불러오기
  const { data: workout, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !workout) notFound();

  // Server Action — id를 bind로 고정
  const updateWithId = updateWorkout.bind(null, id);

  return (
    <section
      style={{
        background: "#0A0A0A",
        minHeight: "100vh",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <Link
          href={`/log/${id}`}
          style={{
            color: "#39FF14",
            textDecoration: "none",
            fontSize: "0.85rem",
          }}
        >
          ← 돌아가기
        </Link>

        <h2
          style={{
            color: "#ffffff",
            fontSize: "2rem",
            fontWeight: 900,
            margin: "24px 0 32px",
          }}
        >
          운동 기록 수정
        </h2>

        <form
          action={updateWithId}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <input
            name="name"
            required
            defaultValue={workout.name}
            placeholder="운동 이름"
            style={{
              padding: "12px",
              borderRadius: "8px",
              background: "#1a1a1a",
              color: "#fff",
              border: "1px solid #333",
            }}
          />
          <input
            type="number"
            name="duration"
            required
            defaultValue={workout.duration}
            placeholder="운동 시간 (분)"
            style={{
              padding: "12px",
              borderRadius: "8px",
              background: "#1a1a1a",
              color: "#fff",
              border: "1px solid #333",
            }}
          />
          <input
            type="date"
            name="date"
            required
            defaultValue={workout.date}
            style={{
              padding: "12px",
              borderRadius: "8px",
              background: "#1a1a1a",
              color: "#fff",
              border: "1px solid #333",
            }}
          />
          <input
            name="condition"
            defaultValue={workout.condition}
            placeholder="컨디션 (예: 최상, 보통)"
            style={{
              padding: "12px",
              borderRadius: "8px",
              background: "#1a1a1a",
              color: "#fff",
              border: "1px solid #333",
            }}
          />
          <input
            name="emoji"
            defaultValue={workout.emoji}
            placeholder="이모지 (예: 💪)"
            style={{
              padding: "12px",
              borderRadius: "8px",
              background: "#1a1a1a",
              color: "#fff",
              border: "1px solid #333",
            }}
          />
          <textarea
            name="memo"
            defaultValue={workout.memo}
            placeholder="메모"
            style={{
              padding: "12px",
              borderRadius: "8px",
              background: "#1a1a1a",
              color: "#fff",
              border: "1px solid #333",
              minHeight: "100px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "14px",
              borderRadius: "8px",
              background: "#39FF14",
              color: "#000",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
              border: "none",
            }}
          >
            💾 수정 완료
          </button>
        </form>
      </div>
    </section>
  );
}
