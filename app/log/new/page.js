import { createWorkout } from "./actions";

export default function NewWorkoutPage() {
  return (
    <section
      style={{
        background: "#0A0A0A",
        minHeight: "100vh",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2
          style={{
            color: "#ffffff",
            fontSize: "2rem",
            fontWeight: 900,
            marginBottom: "32px",
          }}
        >
          운동 기록 추가
        </h2>
        <form
          action={createWorkout}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <input
            name="name"
            required
            placeholder="운동 이름 (예: 하체 데이)"
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
            max="2099-12-31"
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
            💾 저장하기
          </button>
        </form>
      </div>
    </section>
  );
}
