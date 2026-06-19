"use client";
import Link from "next/link";

export default function WorkoutCard({ workout }) {
  return (
    <Link href={`/log/${workout.id}`}>
      <article
        style={{
          cursor: "pointer",
          background: "#111111",
          borderRadius: "16px",
          padding: "24px",
          border: "1px solid rgba(255,255,255,0.08)",
          transition: "all 0.2s",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.borderColor = "rgba(57,255,20,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <span
            style={{ fontSize: "0.72rem", color: "#39FF14", fontWeight: 600 }}
          >
            {workout.date}
          </span>
          <span style={{ fontSize: "1.4rem" }}>{workout.emoji}</span>
        </div>
        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "8px",
          }}
        >
          {workout.name}
        </h3>
        <p
          style={{ fontSize: "0.8rem", color: "#A0A0A0", marginBottom: "20px" }}
        >
          {workout.condition}
        </p>
        <div
          style={{
            display: "flex",
            gap: "8px",
            paddingTop: "12px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span
            style={{
              fontSize: "0.72rem",
              background: "rgba(57,255,20,0.1)",
              color: "#39FF14",
              padding: "5px 12px",
              borderRadius: "6px",
              border: "1px solid rgba(57,255,20,0.2)",
            }}
          >
            {workout.duration}분
          </span>
        </div>
      </article>
    </Link>
  );
}
