export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-bg"></div>
      <div className="hero-grid"></div>
      <div className="hero-inner">
        <div className="hero-text">
          <div className="hero-badge fade-up">
            <span className="hero-badge-dot"></span>
            피트니스 아카이브
          </div>
          <h2 className="fade-up delay-1">
            기록하는 순간,
            <br />
            <em>몸이 바뀐다</em>
          </h2>
          <p className="fade-up delay-2">
            운동 루틴과 성장을 한눈에 관리하세요.
            <br />
            꾸준함이 결국 최고의 루틴이 됩니다.
          </p>
          <div className="hero-actions fade-up delay-3">
            <a href="/log" className="btn-primary">
              지금 시작하기
            </a>
            <a href="/log" className="btn-secondary">
              운동 기록 보기
            </a>
          </div>
        </div>
        <div className="hero-visual fade-up delay-4">
          <div className="hero-card">
            <div className="hero-card-header">
              <span className="hero-card-title">오늘의 루틴</span>
              <span className="hero-card-badge">진행 중</span>
            </div>
            <div className="workout-row">
              <span className="workout-row-name">스쿼트</span>
              <span className="workout-row-val">
                120kg × 5<span className="workout-row-pr">PR</span>
              </span>
            </div>
            <div className="workout-row">
              <span className="workout-row-name">레그프레스</span>
              <span className="workout-row-val">200kg × 10</span>
            </div>
            <div className="workout-row">
              <span className="workout-row-name">루마니안 데드</span>
              <span className="workout-row-val">90kg × 8</span>
            </div>
            <div className="workout-row">
              <span className="workout-row-name">레그 컬</span>
              <span className="workout-row-val">55kg × 12</span>
            </div>
            <div className="hero-card-footer">
              <div>
                <p className="stat-mini-label">총 볼륨</p>
                <p className="stat-mini-val">
                  4,820<span>kg</span>
                </p>
              </div>
              <div>
                <p className="stat-mini-label">운동 시간</p>
                <p className="stat-mini-val">
                  68<span>분</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
