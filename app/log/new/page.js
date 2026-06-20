"use client";
import { useState } from "react";
import { createWorkout } from "./actions";
import Link from "next/link";

export default function NewWorkoutPage() {
  const [sets, setSets] = useState([
    { exercise_name: "", weight: "", set_count: "", reps: "", type: "weight" },
  ]);

  const addSet = () => {
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
  };

  const removeSet = (index) => {
    setSets(sets.filter((_, i) => i !== index));
  };

  const changeType = (index, type) => {
    const newSets = [...sets];
    newSets[index] = { ...newSets[index], type };
    setSets(newSets);
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
            placeholder="운동 시간 (분)"
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
                {/* 헤더 */}
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

                {/* 타입 버튼 3개 */}
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

                {/* 종목명 */}
                <input
                  name="exercise_name"
                  placeholder="종목명 (예: 스쿼트, 러닝, 풋살)"
                  required
                  style={{ ...inputStyle, marginBottom: "8px" }}
                />

                {/* 웨이트: 중량 / 세트 / 횟수 */}
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
                )}

                {/* 유산소: 시간 / 메모 */}
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

                {/* 기타: 메모만 */}
                {set.type === "etc" && (
                  <div>
                    <input name="weight" type="hidden" defaultValue="0" />
                    <input name="reps" type="hidden" defaultValue="0" />
                    <input name="set_count" type="hidden" defaultValue="1" />
                    <input
                      name="exercise_note"
                      placeholder="메모 (예: 풋살 2시간, 등산 북한산)"
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
            💾 저장하기
          </button>
        </form>
      </div>
    </section>
  );
}
