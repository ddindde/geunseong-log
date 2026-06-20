"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export default function EditWorkoutPage() {
  const { id } = useParams();
  const router = useRouter();
  const [workout, setWorkout] = useState(null);
  const [sets, setSets] = useState([]);

  useEffect(() => {
    supabase
      .from("workouts")
      .select("*, sets(*)")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        if (data) {
          setWorkout(data);
          setSets(
            data.sets.length > 0
              ? data.sets.map((s) => ({
                  id: s.id,
                  exercise_name: s.exercise_name,
                  weight: s.weight,
                  set_count: s.set_count,
                  reps: s.reps,
                  type:
                    s.reps === 0
                      ? "etc"
                      : s.weight > 0 && s.set_count === 1
                        ? "cardio"
                        : "weight",
                }))
              : [
                  {
                    exercise_name: "",
                    weight: "",
                    set_count: "",
                    reps: "",
                    type: "weight",
                  },
                ],
          );
        }
      });
  }, [id]);

  const addSet = () =>
    setSets([
      ...sets,
      {
        exercise_name: "",
        weight: "",
        set_count: "",
        reps: "",
        type: "weight",
      },
    ]);
  const removeSet = (index) => setSets(sets.filter((_, i) => i !== index));
  const changeType = (index, type) => {
    const newSets = [...sets];
    newSets[index] = { ...newSets[index], type };
    setSets(newSets);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // workouts 수정
    await supabase
      .from("workouts")
      .update({
        name: formData.get("name"),
        duration: Number(formData.get("duration")),
        date: formData.get("date"),
        condition: formData.get("condition"),
        memo: formData.get("memo"),
        emoji: formData.get("emoji"),
      })
      .eq("id", id);

    // 기존 sets 삭제 후 새로 INSERT
    await supabase.from("sets").delete().eq("workout_id", id);

    const exerciseNames = formData.getAll("exercise_name");
    const weights = formData.getAll("weight");
    const setCounts = formData.getAll("set_count");
    const reps = formData.getAll("reps");

    if (exerciseNames.length > 0 && exerciseNames[0] !== "") {
      const setsData = exerciseNames.map((name, i) => ({
        workout_id: id,
        exercise_name: name,
        weight: Number(weights[i]) || 0,
        set_count: Number(setCounts[i]) || 1,
        reps: Number(reps[i]) || 0,
      }));
      await supabase.from("sets").insert(setsData);
    }

    router.push("/log");
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "6px",
    background: "#0A0A0A",
    color: "#fff",
    border: "1px solid #444",
    boxSizing: "border-box",
    width: "100%",
  };

  if (!workout)
    return (
      <div
        style={{
          background: "#0A0A0A",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "#39FF14" }}>불러오는 중...</p>
      </div>
    );

  return (
    <section
      style={{
        background: "#0A0A0A",
        minHeight: "100vh",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <Link
          href={`/log/${id}`}
          style={{
            color: "#39FF14",
            textDecoration: "none",
            fontSize: "0.85rem",
          }}
        >
          ← 돌아가기
        </Link>
        <h2
          style={{
            color: "#ffffff",
            fontSize: "2rem",
            fontWeight: 900,
            margin: "24px 0 32px",
          }}
        >
          운동 기록 수정
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <input
            name="name"
            required
            defaultValue={workout.name}
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
            defaultValue={workout.duration}
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
            defaultValue={workout.date}
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
            defaultValue={workout.condition}
            placeholder="컨디션"
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
            defaultValue={workout.emoji}
            placeholder="이모지"
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
            defaultValue={workout.memo}
            placeholder="메모"
            style={{
              padding: "12px",
              borderRadius: "8px",
              background: "#1a1a1a",
              color: "#fff",
              border: "1px solid #333",
              minHeight: "80px",
            }}
          />

          {/* 운동 목록 */}
          <div
            style={{
              borderTop: "1px solid #333",
              paddingTop: "20px",
              marginTop: "8px",
            }}
          >
            <p
              style={{
                color: "#39FF14",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              운동 목록
            </p>

            {sets.map((set, index) => (
              <div
                key={index}
                style={{
                  background: "#1a1a1a",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "12px",
                  border: "1px solid #333",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <span style={{ color: "#A0A0A0", fontSize: "0.8rem" }}>
                    종목 {index + 1}
                  </span>
                  {sets.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSet(index)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#FF3B30",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                      }}
                    >
                      삭제
                    </button>
                  )}
                </div>

                <div
                  style={{ display: "flex", gap: "8px", marginBottom: "12px" }}
                >
                  {[
                    { key: "weight", label: "🏋️ 웨이트" },
                    { key: "cardio", label: "🏃 유산소" },
                    { key: "etc", label: "⚽ 기타" },
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => changeType(index, key)}
                      style={{
                        flex: 1,
                        padding: "7px",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                        border: "1px solid",
                        borderColor: set.type === key ? "#39FF14" : "#444",
                        background:
                          set.type === key
                            ? "rgba(57,255,20,0.1)"
                            : "transparent",
                        color: set.type === key ? "#39FF14" : "#A0A0A0",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <input
                  name="exercise_name"
                  defaultValue={set.exercise_name}
                  placeholder="종목명"
                  required
                  style={{ ...inputStyle, marginBottom: "8px" }}
                />

                {set.type === "weight" && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: "8px",
                    }}
                  >
                    <input
                      name="weight"
                      type="number"
                      defaultValue={set.weight}
                      placeholder="중량(kg)"
                      style={inputStyle}
                    />
                    <input
                      name="set_count"
                      type="number"
                      defaultValue={set.set_count}
                      placeholder="세트수"
                      style={inputStyle}
                    />
                    <input
                      name="reps"
                      type="number"
                      defaultValue={set.reps}
                      placeholder="횟수"
                      style={inputStyle}
                    />
                  </div>
                )}

                {set.type === "cardio" && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <input
                      name="weight"
                      type="number"
                      defaultValue={set.weight}
                      placeholder="시간 (분)"
                      style={inputStyle}
                    />
                    <input name="reps" type="hidden" defaultValue="0" />
                    <input name="set_count" type="hidden" defaultValue="1" />
                    <input
                      name="exercise_note"
                      placeholder="메모 (예: 공원 3바퀴)"
                      style={inputStyle}
                    />
                  </div>
                )}

                {set.type === "etc" && (
                  <div>
                    <input name="weight" type="hidden" defaultValue="0" />
                    <input name="reps" type="hidden" defaultValue="0" />
                    <input name="set_count" type="hidden" defaultValue="1" />
                    <input
                      name="exercise_note"
                      placeholder="메모 (예: 풋살 2시간)"
                      style={inputStyle}
                    />
                  </div>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addSet}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                background: "transparent",
                color: "#39FF14",
                border: "1px dashed #39FF14",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              + 종목 추가
            </button>
          </div>

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
              marginTop: "8px",
            }}
          >
            💾 수정 완료
          </button>
        </form>
      </div>
    </section>
  );
}
