import { supabase } from "../lib/supabase";

export default async function Hero() {
  // 가장 최근 운동 + sets 가져오기
  const { data: workout } = await supabase
    .from("workouts")
    .select("*, sets(*)")
    .order("date", { ascending: false })
    .limit(1)
    .single();

  // 총 볼륨 계산 (웨이트만)
  const totalVolume = workout?.sets
    ? workout.sets
        .filter((s) => s.exercise_type === "weight" && s.reps > 0)
        .reduce((acc, s) => acc + s.weight * s.set_count * s.reps, 0)
    : 0;

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
            <a href="/log/new" className="btn-primary">
              운동 기록 하기
            </a>
            <a href="/log" className="btn-secondary">
              운동 기록 보기
            </a>
          </div>
        </div>

        <div className="hero-visual fade-up delay-4">
          <div className="hero-card">
            <div className="hero-card-header">
              <span className="hero-card-title">최근 운동 루틴</span>
              <span className="hero-card-title">
                {workout ? `${workout.date} ` : "최근 루틴"}
              </span>
              <span className="hero-card-badge">{workout?.emoji || "💪"}</span>
            </div>

            {workout && workout.sets && workout.sets.length > 0 ? (
              workout.sets.slice(0, 4).map((s, i) => (
                <div className="workout-row" key={i}>
                  <span className="workout-row-name">{s.exercise_name}</span>
                  <span className="workout-row-val">
                    {s.exercise_type === "weight" && s.reps > 0
                      ? `${s.weight}kg × ${s.reps}`
                      : s.exercise_type === "cardio"
                        ? `${s.weight}분`
                        : s.exercise_note || "-"}
                  </span>
                </div>
              ))
            ) : (
              <div className="workout-row">
                <span className="workout-row-name" style={{ color: "#A0A0A0" }}>
                  운동 기록을 추가해봐요!
                </span>
              </div>
            )}

            <div className="hero-card-footer">
              <div>
                <p className="stat-mini-label">총 볼륨</p>
                <p className="stat-mini-val">
                  {totalVolume > 0 ? totalVolume.toLocaleString() : "-"}
                  <span>kg</span>
                </p>
              </div>
              <div>
                <p className="stat-mini-label">운동 시간</p>
                <p className="stat-mini-val">
                  {workout?.duration || "-"}
                  <span>분</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
