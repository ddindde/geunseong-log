import Link from "next/link";
import { notFound } from "next/navigation";
import { workouts } from "../../data/workouts";

export default async function WorkoutDetailPage({ params }) {
  const { id } = await params;
  const workout = workouts.find((w) => w.id === Number(id));

  if (!workout) notFound();

  return (
    <div
      style={{
        background: "#0A0A0A",
        minHeight: "100vh",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        {/* 뒤로가기 */}
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
            <span style={{ fontSize: "2rem" }}>
              {workout.condition.split(" ")[0]}
            </span>
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
            {workout.title}
          </h1>
          <p style={{ color: "#A0A0A0" }}>
            {workout.condition.split(" ").slice(1).join(" ")}
          </p>
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
          {workout.exercises.map((ex, i) => (
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
                {ex.name}
              </span>
              <span style={{ color: "#A0A0A0", fontSize: "0.9rem" }}>
                {ex.weight > 0 ? `${ex.weight}kg × ` : ""}
                {ex.sets}세트 × {ex.reps}회
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
              {workout.volume.toLocaleString()}
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
              운동 시간
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
      </div>
    </div>
  );
}
