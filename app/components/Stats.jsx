import { supabase } from "../lib/supabase";

export default async function Stats() {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? 6 : day - 1;
  const monday = new Date(now);
  monday.setDate(now.getDate() - diff);
  const mondayStr = monday.toISOString().split("T")[0];

  // 이번 주 운동 데이터
  const { data: weekWorkouts } = await supabase
    .from("workouts")
    .select("id, date, duration")
    .gte("date", mondayStr);

  const weekCount = weekWorkouts?.length || 0;
  const weekDuration =
    weekWorkouts?.reduce((acc, w) => acc + (w.duration || 0), 0) || 0;

  // 전체 누적 운동 횟수
  const { count: totalCount } = await supabase
    .from("workouts")
    .select("*", { count: "exact", head: true });

  return (
    <section className="stats">
      <div className="stats-inner">
        <div className="stat-card">
          <p className="stat-num green">
            {totalCount || 0}
            <span style={{ fontSize: "2rem" }}>회</span>
          </p>
          <p className="stat-label">총 운동 횟수</p>
        </div>
        <div className="stat-card">
          <p className="stat-num orange">
            {weekCount}
            <span style={{ fontSize: "2rem" }}>회</span>
          </p>
          <p className="stat-label">이번 주 운동 횟수</p>
        </div>
        <div className="stat-card">
          <p className="stat-num white">
            {weekDuration}
            <span style={{ fontSize: "1.5rem" }}>분</span>
          </p>
          <p className="stat-label">이번 주 운동 시간</p>
        </div>
      </div>
    </section>
  );
}
