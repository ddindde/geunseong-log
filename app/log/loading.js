// app/log/loading.js
export default function Loading() {
  return (
    <div
      style={{
        background: "#0A0A0A",
        minHeight: "100vh",
        padding: "80px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p style={{ color: "#39FF14", fontSize: "1rem", letterSpacing: "0.1em" }}>
        ⏳ 불러오는 중...
      </p>
    </div>
  );
}
