import { workouts } from "../data/workouts";
import WorkoutCard from "../components/WorkoutCard";

export default function LogPage() {
  return (
    <section
      style={{
        background: "#0A0A0A",
        minHeight: "100vh",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "40px" }}>
          <p
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#39FF14",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          >
            Muscle Archive
          </p>
          <h2
            style={{
              fontSize: "2.4rem",
              fontWeight: 900,
              color: "#ffffff",
              marginBottom: "8px",
            }}
          >
            운동 기록
          </h2>
          <p style={{ color: "#A0A0A0", fontSize: "0.9rem" }}>
            카드를 클릭하면 상세 내용을 볼 수 있어요.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </div>
    </section>
  );
}
