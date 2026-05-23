import Link from "next/link";

export default function AboutPage() {
  return (
    <div
      style={{
        background: "#0A0A0A",
        minHeight: "100vh",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
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
          About
        </p>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 900,
            color: "#ffffff",
            marginBottom: "24px",
          }}
        >
          근성 로그란?
        </h1>
        <p
          style={{
            color: "#A0A0A0",
            lineHeight: 1.8,
            fontSize: "1rem",
            marginBottom: "16px",
          }}
        >
          근성 로그는 오늘의 운동과 몸의 변화를 기록하고 성장 과정을 쌓아가는
          운동 아카이브 앱이에요.
        </p>
        <p
          style={{
            color: "#A0A0A0",
            lineHeight: 1.8,
            fontSize: "1rem",
            marginBottom: "40px",
          }}
        >
          꾸준함이 결국 성장이 됩니다. 매일의 기록이 모여 나만의 운동 히스토리가
          되고, 그 데이터가 더 나은 루틴을 만들어줍니다.
        </p>
        <Link
          href="/log"
          style={{
            background: "#39FF14",
            color: "#000",
            padding: "0.9rem 2rem",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "0.95rem",
          }}
        >
          운동 기록 보러가기 →
        </Link>
      </div>
    </div>
  );
}
