"use client";
import { useState } from "react";
import { createWorkout } from "./actions";
import Link from "next/link";

export default function NewWorkoutPage() {
  // 웨이트 종목 목록 (여러 개 추가 가능)
  const [weightSets, setWeightSets] = useState([
    { exercise_name: "", weight: "", set_count: "", reps: "" },
  ]);

  // 유산소 목록
  const [cardioSets, setCardioSets] = useState([]);

  // 기타 목록
  const [etcSets, setEtcSets] = useState([]);

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
      { exercise_name: "", duration: "", note: "" },
    ]);
  const removeCardio = (i) =>
    setCardioSets(cardioSets.filter((_, idx) => idx !== i));

  const addEtc = () =>
    setEtcSets([...etcSets, { exercise_name: "", note: "" }]);
  const removeEtc = (i) => setEtcSets(etcSets.filter((_, idx) => idx !== i));

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
    background: "#1a1a1a",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "12px",
    border: "1px solid #333",
  };

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
          href="/log"
          style={{
            color: "#39FF14",
            textDecoration: "none",
            fontSize: "0.85rem",
          }}
        >
          ← 운동 기록으로
        </Link>

        <h2
          style={{
            color: "#ffffff",
            fontSize: "2rem",
            fontWeight: 900,
            margin: "24px 0 32px",
          }}
        >
          운동 기록 추가
        </h2>

        <form
          action={createWorkout}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          {/* workouts 기본 정보 */}
          <input
            name="name"
            required
            placeholder="운동 이름 (예: 하체 데이)"
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
            placeholder="총 운동 시간 (분)"
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
            max="2099-12-31"
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
            placeholder="컨디션 (예: 최상, 보통)"
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
            placeholder="이모지 (예: 💪)"
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

          {/* 🏋️ 웨이트 섹션 */}
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
                {/* hidden으로 type 전달 */}
                <input name="exercise_type" type="hidden" value="weight" />
                <input
                  name="exercise_name"
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
                    placeholder="중량(kg)"
                    style={inputStyle}
                  />
                  <input
                    name="set_count"
                    type="number"
                    placeholder="세트수"
                    style={inputStyle}
                  />
                  <input
                    name="reps"
                    type="number"
                    placeholder="횟수"
                    style={inputStyle}
                  />
                </div>
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

          {/* 🏃 유산소 섹션 */}
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
                  placeholder="종목명 (예: 러닝, 자전거)"
                  required
                  style={{ ...inputStyle, marginBottom: "8px" }}
                />
                <input
                  name="weight"
                  type="number"
                  placeholder="시간 (분)"
                  style={{ ...inputStyle, marginBottom: "8px" }}
                />
                <input name="set_count" type="hidden" defaultValue="1" />
                <input name="reps" type="hidden" defaultValue="0" />
                <input
                  name="exercise_note"
                  placeholder="메모 (예: 공원 3바퀴)"
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

          {/* ⚽ 기타 섹션 */}
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
                  placeholder="종목명 (예: 풋살, 등산)"
                  required
                  style={{ ...inputStyle, marginBottom: "8px" }}
                />
                <input name="weight" type="hidden" defaultValue="0" />
                <input name="set_count" type="hidden" defaultValue="1" />
                <input name="reps" type="hidden" defaultValue="0" />
                <input
                  name="exercise_note"
                  placeholder="메모 (예: 풋살 2시간, 북한산)"
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
            💾 저장하기
          </button>
        </form>
      </div>
    </section>
  );
}
