import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import Logo from "../components/Logo";

const keywords = {
    "수면 여부 확인": ["아침", "밤"],
    "식사 여부 확인": ["아침", "점심", "저녁"],
    "약 복용 여부 확인": ["아침", "점심", "저녁"],
    "활동 여부 확인": ["외출", "청소", "교회", "운동", "목욕"],
    "심리적 상태 체크": ["O", "X"]
};

const timeSettingKeywords = {
    "수면 여부 확인": ["아침"],
    "식사 여부 확인": ["아침", "점심", "저녁"],
    "약 복용 여부 확인": ["아침", "점심", "저녁"]
};

const weekdays = ["월", "화", "수", "목", "금", "토", "일"];

const TimeSetting = ({ value, onSave }) => {
    const [tempTime, setTempTime] = useState(value.time);
    const [tempDays, setTempDays] = useState(value.days || []);

    const toggleDay = (day) => {
        setTempDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    const handleSave = () => {
        onSave({
            time: tempTime,
            days: tempDays
        });
    };

    return (
        <div style={styles.timeSettingContainer}>
            <div style={styles.weekdayContainer}>
                {weekdays.map((day) => (
                    <button
                        key={day}
                        onClick={() => toggleDay(day)}
                        style={{
                            ...styles.dayButton,
                            backgroundColor: tempDays.includes(day) ? "#DABEC9" : "#EEE"
                        }}
                    >
                        {day}
                    </button>
                ))}
            </div>
            <TimePicker
                onChange={setTempTime}
                value={tempTime}
                disableClock
                clearIcon={null}
                format="HH:mm"
            />
            <button style={styles.saveButton} onClick={handleSave}>저장</button>
        </div>
    );
};

const KeywordSelectionPage = () => {
    const navigate = useNavigate();

    const [selected, setSelected] = useState(
        Object.keys(keywords).reduce((acc, category) => {
            acc[category] = {};
            keywords[category].forEach((keyword) => {
                acc[category][keyword] = {
                    selected: false,
                    time: "08:00",
                    days: []
                };
            });
            return acc;
        }, {})
    );

    const toggleSelection = (category, keyword) => {
        setSelected((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [keyword]: {
                    ...prev[category][keyword],
                    selected: !prev[category][keyword].selected
                }
            }
        }));
    };

    const saveTimeAndDays = (category, keyword, newData) => {
        setSelected((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [keyword]: {
                    ...prev[category][keyword],
                    ...newData
                }
            }
        }));
    };

    return (
        <div style={styles.container}>
            <Logo />
            <h2 style={styles.title}>확인하고 싶은 키워드를 선택해주세요.</h2>
            {Object.entries(keywords).map(([category, options]) => (
                <div key={category} style={styles.category}>
                    <p style={styles.categoryTitle}>• {category}</p>
                    <div style={styles.buttonContainer}>
                        {options.map((keyword) => (
                            <div key={keyword} style={styles.keywordBlock}>
                                <button
                                    style={{
                                        ...styles.keywordButton,
                                        backgroundColor: selected[category][keyword].selected ? "#DABEC9" : "#FFF",
                                        color: selected[category][keyword].selected ? "#FFF" : "#000",
                                    }}
                                    onClick={() => toggleSelection(category, keyword)}
                                >
                                    {keyword}
                                </button>
                                {selected[category][keyword].selected &&
                                    timeSettingKeywords[category]?.includes(keyword) && (
                                        <TimeSetting
                                            value={{
                                                time: selected[category][keyword].time,
                                                days: selected[category][keyword].days
                                            }}
                                            onSave={(data) => saveTimeAndDays(category, keyword, data)}
                                        />
                                    )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <button style={styles.completeButton} onClick={() => navigate("/final")}>완료</button>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#F8EAD2",
        height: "100vh",
        padding: "20px",
        overflowY: "auto",
    },
    title: {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    category: {
        marginBottom: "15px",
        textAlign: "left",
        width: "100%",
    },
    categoryTitle: {
        fontSize: "16px",
        fontWeight: "bold",
        marginBottom: "5px",
    },
    buttonContainer: {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
    },
    keywordBlock: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5px",
    },
    keywordButton: {
        border: "2px solid black",
        borderRadius: "20px",
        padding: "10px 15px",
        cursor: "pointer",
        fontSize: "14px",
    },
    completeButton: {
        backgroundColor: "#DABEC9",
        border: "none",
        padding: "10px 20px",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
        marginTop: "20px",
    },
    timeSettingContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        backgroundColor: "#FFF",
        padding: "10px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        marginTop: "5px",
    },
    weekdayContainer: {
        display: "flex",
        gap: "6px",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    dayButton: {
        padding: "5px 8px",
        borderRadius: "6px",
        border: "1px solid #888",
        cursor: "pointer",
        fontSize: "12px",
    },
    saveButton: {
        fontSize: "12px",
        padding: "5px 10px",
        borderRadius: "5px",
        backgroundColor: "#DABEC9",
        border: "none",
        cursor: "pointer"
    }
};

export default KeywordSelectionPage;
