import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { deleteWorkout } from "./actions";

export default async function WorkoutDetailPage({ params }) {
  const { id } = await params;

  // workouts + sets 같이 가져오기
  const { data: workout, error } = await supabase
    .from("workouts")
    .select("*, sets(*)")
    .eq("id", id)
    .single();

  if (error || !workout) notFound();

  // 총 볼륨 계산 (weight × set_count × reps 합산)
  const totalVolume = workout.sets
    ? workout.sets
        .filter((s) => s.reps > 0) // 유산소/기타 제외
        .reduce((acc, s) => acc + s.weight * s.set_count * s.reps, 0)
    : 0;
  return (
    <div
      style={{
        background: "#0A0A0A",
        minHeight: "100vh",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <Link
          href="/log"
          style={{
            fontSize: "0.85rem",
            color: "#39FF14",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "32px",
          }}
        >
          ← 운동 기록으로
        </Link>

        {/* 헤더 */}
        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "8px",
            }}
          >
            <span style={{ fontSize: "2rem" }}>{workout.emoji}</span>
            <span
              style={{ fontSize: "0.8rem", color: "#39FF14", fontWeight: 600 }}
            >
              {workout.date}
            </span>
          </div>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 900,
              color: "#ffffff",
              marginBottom: "8px",
            }}
          >
            {workout.name}
          </h1>
          <p style={{ color: "#A0A0A0" }}>{workout.condition}</p>
        </div>

        {/* 운동 목록 */}
        <div
          style={{
            background: "#111111",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: "20px",
          }}
        >
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#39FF14",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            운동 목록
          </p>
          {workout.sets &&
            workout.sets.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "14px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span style={{ fontWeight: 600, color: "#ffffff" }}>
                  {s.exercise_name}
                </span>
                <span style={{ color: "#A0A0A0", fontSize: "0.9rem" }}>
                  {/* 웨이트만 중량/세트/횟수 표시 */}
                  {s.weight > 0 && s.reps > 0
                    ? `${s.weight}kg × ${s.set_count}세트 × ${s.reps}회`
                    : s.weight > 0
                      ? `${s.weight}분`
                      : "기록됨"}
                </span>
              </div>
            ))}
        </div>

        {/* 통계 */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
          <div
            style={{
              background: "#111111",
              borderRadius: "12px",
              padding: "20px 24px",
              border: "1px solid rgba(57,255,20,0.2)",
              flex: 1,
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "0.65rem",
                color: "#39FF14",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "8px",
              }}
            >
              총 볼륨
            </p>
            <p
              style={{ fontSize: "1.8rem", fontWeight: 900, color: "#ffffff" }}
            >
              {totalVolume.toLocaleString()}
              <span style={{ fontSize: "1rem", color: "#A0A0A0" }}>kg</span>
            </p>
          </div>
          <div
            style={{
              background: "#111111",
              borderRadius: "12px",
              padding: "20px 24px",
              border: "1px solid rgba(255,255,255,0.08)",
              flex: 1,
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "0.65rem",
                color: "#A0A0A0",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "8px",
              }}
            >
              총 운동 시간
            </p>
            <p
              style={{ fontSize: "1.8rem", fontWeight: 900, color: "#ffffff" }}
            >
              {workout.duration}
              <span style={{ fontSize: "1rem", color: "#A0A0A0" }}>분</span>
            </p>
          </div>
        </div>

        {/* 메모 */}
        {workout.memo && (
          <div
            style={{
              background: "#111111",
              borderRadius: "16px",
              padding: "24px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p
              style={{
                fontSize: "0.65rem",
                color: "#39FF14",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "12px",
                fontWeight: 600,
              }}
            >
              메모
            </p>
            <p style={{ color: "#A0A0A0", lineHeight: 1.7 }}>{workout.memo}</p>
          </div>
        )}
        {/* 수정 / 삭제 버튼 */}
        <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
          {/* 수정 버튼 — 수정 페이지로 이동 */}
          <Link
            href={`/log/${workout.id}/edit`}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "8px",
              background: "#1a1a1a",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1rem",
              textAlign: "center",
              textDecoration: "none",
              border: "1px solid #333",
            }}
          >
            ✏️ 수정하기
          </Link>

          {/* 삭제 버튼 — Server Action으로 바로 삭제 */}
          <form action={deleteWorkout} style={{ flex: 1 }}>
            <input type="hidden" name="id" value={workout.id} />
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "8px",
                background: "#FF3B30",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: "pointer",
                border: "none",
              }}
            >
              🗑️ 삭제하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
