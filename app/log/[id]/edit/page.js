"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export default function EditWorkoutPage() {
  const { id } = useParams();
  const router = useRouter();
  const [workout, setWorkout] = useState(null);
  const [weightSets, setWeightSets] = useState([
    { exercise_name: "", weight: "", set_count: "", reps: "" },
  ]);
  const [cardioSets, setCardioSets] = useState([]);
  const [etcSets, setEtcSets] = useState([]);

  useEffect(() => {
    supabase
      .from("workouts")
      .select("*, sets(*)")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        if (data) {
          setWorkout(data);
          const w = data.sets.filter((s) => s.exercise_type === "weight");
          const c = data.sets.filter((s) => s.exercise_type === "cardio");
          const e = data.sets.filter((s) => s.exercise_type === "etc");
          setWeightSets(
            w.length > 0
              ? w
              : [{ exercise_name: "", weight: "", set_count: "", reps: "" }],
          );
          setCardioSets(c);
          setEtcSets(e);
        }
      });
  }, [id]);

  const addWeight = () =>
    setWeightSets([
      ...weightSets,
      { exercise_name: "", weight: "", set_count: "", reps: "" },
    ]);
  const removeWeight = (i) =>
    setWeightSets(weightSets.filter((_, idx) => idx !== i));
  const addCardio = () =>
    setCardioSets([
      ...cardioSets,
      { exercise_name: "", weight: "", exercise_note: "" },
    ]);
  const removeCardio = (i) =>
    setCardioSets(cardioSets.filter((_, idx) => idx !== i));
  const addEtc = () =>
    setEtcSets([...etcSets, { exercise_name: "", exercise_note: "" }]);
  const removeEtc = (i) => setEtcSets(etcSets.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

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

    await supabase.from("sets").delete().eq("workout_id", id);

    const exerciseNames = formData.getAll("exercise_name");
    const weights = formData.getAll("weight");
    const setCounts = formData.getAll("set_count");
    const reps = formData.getAll("reps");
    const exerciseNotes = formData.getAll("exercise_note");
    const exerciseTypes = formData.getAll("exercise_type");

    if (exerciseNames.length > 0 && exerciseNames[0] !== "") {
      const setsData = exerciseNames.map((name, i) => ({
        workout_id: id,
        exercise_name: name,
        weight: Number(weights[i]) || 0,
        set_count: Number(setCounts[i]) || 1,
        reps: Number(reps[i]) || 0,
        exercise_note: exerciseNotes[i] || null,
        exercise_type: exerciseTypes[i] || "weight",
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

  const sectionStyle = {
    background: "#111",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "12px",
    border: "1px solid #333",
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

          {/* 🏋️ 웨이트 */}
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
              🏋️ 웨이트
            </p>
            {weightSets.map((s, i) => (
              <div key={i} style={sectionStyle}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ color: "#A0A0A0", fontSize: "0.8rem" }}>
                    종목 {i + 1}
                  </span>
                  {weightSets.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeWeight(i)}
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
                <input name="exercise_type" type="hidden" value="weight" />
                <input
                  name="exercise_name"
                  defaultValue={s.exercise_name}
                  placeholder="종목명 (예: 스쿼트)"
                  required
                  style={{ ...inputStyle, marginBottom: "8px" }}
                />
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
                    defaultValue={s.weight}
                    placeholder="중량(kg)"
                    style={inputStyle}
                  />
                  <input
                    name="set_count"
                    type="number"
                    defaultValue={s.set_count}
                    placeholder="세트수"
                    style={inputStyle}
                  />
                  <input
                    name="reps"
                    type="number"
                    defaultValue={s.reps}
                    placeholder="횟수"
                    style={inputStyle}
                  />
                </div>
                <input name="exercise_note" type="hidden" defaultValue="" />
              </div>
            ))}
            <button
              type="button"
              onClick={addWeight}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                background: "transparent",
                color: "#39FF14",
                border: "1px dashed #39FF14",
                cursor: "pointer",
                fontSize: "0.85rem",
                marginBottom: "24px",
              }}
            >
              + 웨이트 종목 추가
            </button>
          </div>

          {/* 🏃 유산소 */}
          <div style={{ borderTop: "1px solid #333", paddingTop: "20px" }}>
            <p
              style={{
                color: "#A0A0A0",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              🏃 유산소
            </p>
            {cardioSets.map((s, i) => (
              <div key={i} style={sectionStyle}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ color: "#A0A0A0", fontSize: "0.8rem" }}>
                    유산소 {i + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeCardio(i)}
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
                </div>
                <input name="exercise_type" type="hidden" value="cardio" />
                <input
                  name="exercise_name"
                  defaultValue={s.exercise_name}
                  placeholder="종목명 (예: 러닝)"
                  required
                  style={{ ...inputStyle, marginBottom: "8px" }}
                />
                <input
                  name="weight"
                  type="number"
                  defaultValue={s.weight}
                  placeholder="시간 (분)"
                  style={{ ...inputStyle, marginBottom: "8px" }}
                />
                <input name="set_count" type="hidden" defaultValue="1" />
                <input name="reps" type="hidden" defaultValue="0" />
                <input
                  name="exercise_note"
                  defaultValue={s.exercise_note}
                  placeholder="메모 (예: 공원 3바퀴, 5km)"
                  style={inputStyle}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addCardio}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                background: "transparent",
                color: "#A0A0A0",
                border: "1px dashed #444",
                cursor: "pointer",
                fontSize: "0.85rem",
                marginBottom: "24px",
              }}
            >
              + 유산소 추가
            </button>
          </div>

          {/* ⚽ 기타 */}
          <div style={{ borderTop: "1px solid #333", paddingTop: "20px" }}>
            <p
              style={{
                color: "#A0A0A0",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              ⚽ 기타
            </p>
            {etcSets.map((s, i) => (
              <div key={i} style={sectionStyle}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ color: "#A0A0A0", fontSize: "0.8rem" }}>
                    기타 {i + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeEtc(i)}
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
                </div>
                <input name="exercise_type" type="hidden" value="etc" />
                <input
                  name="exercise_name"
                  defaultValue={s.exercise_name}
                  placeholder="종목명 (예: 풋살, 등산)"
                  required
                  style={{ ...inputStyle, marginBottom: "8px" }}
                />
                <input name="weight" type="hidden" defaultValue="0" />
                <input name="set_count" type="hidden" defaultValue="1" />
                <input name="reps" type="hidden" defaultValue="0" />
                <input
                  name="exercise_note"
                  defaultValue={s.exercise_note}
                  placeholder="메모 (예: 풋살 2시간)"
                  style={inputStyle}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addEtc}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                background: "transparent",
                color: "#A0A0A0",
                border: "1px dashed #444",
                cursor: "pointer",
                fontSize: "0.85rem",
              }}
            >
              + 기타 추가
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
              marginTop: "16px",
            }}
          >
            💾 수정 완료
          </button>
        </form>
      </div>
    </section>
  );
}
