export default function Features() {
  return (
    <section id="features" className="features">
      <div className="features-inner">
        <div className="features-header">
          <h3>
            강력한 <em>핵심 기능</em>
          </h3>
          <p>운동 기록부터 성장 분석까지, 필요한 모든 것을 하나의 앱에서.</p>
        </div>
        <div className="features-grid">
          <article className="feature-card">
            <p className="feature-num">01</p>
            <span className="feature-icon">📋</span>
            <h4>운동 기록 관리</h4>
            <p>
              종목, 세트, 중량, 컨디션까지 빠르게 기록하고 체계적으로
              관리하세요.
            </p>
          </article>
          <article className="feature-card">
            <p className="feature-num">02</p>
            <span className="feature-icon">📊</span>
            <h4>루틴 시각화</h4>
            <p>
              나만의 루틴을 시각적으로 확인하고 최적의 운동 패턴을 발견하세요.
            </p>
          </article>
          <article className="feature-card">
            <p className="feature-num">03</p>
            <span className="feature-icon">📈</span>
            <h4>성장 그래프 확인</h4>
            <p>
              중량 증가와 운동 빈도를 그래프로 추적하며 나의 성장을 눈으로
              확인하세요.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
