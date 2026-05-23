export default function Stats() {
  return (
    <section className="stats">
      <div className="stats-inner">
        <div className="stat-card">
          <p className="stat-num green">
            5<span style={{ fontSize: "2rem" }}>회</span>
          </p>
          <p className="stat-label">이번 주 운동 횟수</p>
        </div>
        <div className="stat-card">
          <p className="stat-num orange">
            3,240<span style={{ fontSize: "1.5rem" }}>kcal</span>
          </p>
          <p className="stat-label">총 소모 칼로리</p>
        </div>
        <div className="stat-card">
          <p className="stat-num white">
            14<span style={{ fontSize: "2rem" }}>일</span>
          </p>
          <p className="stat-label">연속 운동 일수</p>
        </div>
      </div>
    </section>
  );
}
