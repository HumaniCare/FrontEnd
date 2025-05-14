import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import Logo from "../components/Logo";
import axios from "axios";
import { SPRING_API_URL } from "../constants/api";
import { getAccessToken } from "../components/Header";

const keywords = {
    "수면 여부 확인": ["아침", "밤"],
    "식사 여부 확인": ["아침", "점심", "저녁"],
    "약 복용 여부 확인": ["아침", "점심", "저녁"],
    "활동 여부 확인": ["외출", "청소", "교회", "운동", "목욕"]
};

const timeSettingKeywords = new Set([
    "수면 여부 확인", "식사 여부 확인", "약 복용 여부 확인", "활동 여부 확인"
]);

const weekdays = ["월", "화", "수", "목", "금", "토", "일"];
const dayMap = {
    "월": "MONDAY", "화": "TUESDAY", "수": "WEDNESDAY",
    "목": "THURSDAY", "금": "FRIDAY", "토": "SATURDAY", "일": "SUNDAY"
};
const reverseDayMap = Object.fromEntries(
    Object.entries(dayMap).map(([k, v]) => [v, k])
);

const TimeSetting = ({ value, onSave }) => {
    const [time, setTime] = useState(value.time);
    const [days, setDays] = useState(value.days || []);

    const toggleDay = (day) => {
        const newDays = days.includes(day)
            ? days.filter(d => d !== day)
            : [...days, day];
        setDays(newDays);
        onSave({ time, days: newDays });
    };

    const handleTimeChange = (newTime) => {
        setTime(newTime);
        onSave({ time: newTime, days });
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
                            backgroundColor: days.includes(day) ? "#DABEC9" : "#EEE"
                        }}
                    >
                        {day}
                    </button>
                ))}
            </div>
            <TimePicker
                onChange={handleTimeChange}
                value={time}
                disableClock
                clearIcon={null}
                format="HH:mm"
            />
        </div>
    );
};

const KeywordOption = ({ category, keyword, data, onToggle, onSave }) => (
    <div style={styles.keywordBlock}>
        <button
            onClick={onToggle}
            style={{
                ...styles.keywordButton,
                backgroundColor: data.selected ? "#DABEC9" : "#FFF",
                color: data.selected ? "#FFF" : "#000",
            }}
        >
            {keyword}
        </button>
        {data.selected && timeSettingKeywords.has(category) && (
            <TimeSetting
                value={{ time: data.time, days: data.days }}
                onSave={onSave}
            />
        )}
    </div>
);

const KeywordSelectionPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [selected, setSelected] = useState(
        Object.fromEntries(
            Object.entries(keywords).map(([category, list]) => [
                category,
                Object.fromEntries(
                    list.map((keyword) => [
                        keyword,
                        { selected: false, time: "08:00", days: [] }
                    ])
                )
            ])
        )
    );
    
    const [guardianTitle, setGuardianTitle] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const token = getAccessToken();
            if (!token) return;

            try {
                const response = await axios.get(
                    `${SPRING_API_URL}/all-basic-schedules`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                console.log("확인하기");
                const schedules = response.data.result;
                console.log("JSON 파싱 직전");
                console.log(schedules);

                const updatedSelected = Object.fromEntries(
                    Object.entries(keywords).map(([category, list]) => [
                        category,
                        Object.fromEntries(
                            list.map((keyword) => [
                                keyword,
                                { selected: false, time: "08:00", days: [] }
                            ])
                        )
                    ])
                );

                schedules.forEach(item => {
                    const [categoryPrefix, keyword] = item.scheduleTitle.split("_");
                    const category = Object.keys(keywords).find(
                        c => c.replace(/\s/g, "") === categoryPrefix
                    );
                    if (!category || !keywords[category].includes(keyword)) return;

                    const time = item.startTime.slice(0, 5);
                    const days = item.days.map(d => reverseDayMap[d]).filter(Boolean);

                    updatedSelected[category][keyword] = {
                        selected: true,
                        time,
                        days
                    };
                });

                setSelected(updatedSelected);
            } catch (error) {
                console.error("기존 키워드 데이터를 불러오는 중 오류 발생:", error);
            }
        };

        fetchData();
    }, [id]);

    const toggleSelection = (category, keyword) => {
        setSelected(prev => ({
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
        setSelected(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [keyword]: { ...prev[category][keyword], ...newData }
            }
        }));
    };

    const handleComplete = async () => {
        const token = getAccessToken();
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        const payload = [];
        for (const [category, options] of Object.entries(selected)) {
            for (const [keyword, { selected, time, days }] of Object.entries(options)) {
                if (selected && days.length > 0) {
                    payload.push({
                        scheduleTitle: `${category.replace(/\s/g, "")}_${keyword}`,
                        startTime: time + ":00",
                        days: days.map(d => dayMap[d])
                    });
                }
            }
        }

        if (guardianTitle.trim() !== "") {
            payload.push({
                scheduleTitle : "GuardianTitle_" + guardianTitle.trim(),
                startTime: "00:00:00",
                days: []
            });
        }

        try {
            const response = await axios.post(
                `${ SPRING_API_URL}/basic-schedules`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("서버 응답:", response.data);
            navigate("/final");
        } catch (error) {
            console.error("데이터 전송 실패:", error);
            alert("데이터 전송 중 오류가 발생했습니다.");
        }
    };

    return (
        <div style={styles.container}>
        <Logo />
        <h2 style={styles.title}>확인하고 싶은 키워드를 선택해주세요.</h2>

        <div style={styles.contentWrapper}>
            <div style={styles.leftColumn}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>부르고 싶은 보호자의 호칭을 입력해주세요.</label>
                <input
                    style={styles.input}
                    placeholder="예: 엄마, 아버지"
                    value={guardianTitle}
                    onChange={(e) => setGuardianTitle(e.target.value)}
                />
            </div>

            {Object.entries(keywords).map(([category, options]) => (
                <div key={category} style={styles.category}>
                    <p style={styles.categoryTitle}>• {category}</p>
                    <div style={styles.buttonContainer}>
                        {options.map((keyword) => (
                            <KeywordOption
                                key={keyword}
                                category={category}
                                keyword={keyword}
                                data={selected[category][keyword]}
                                onToggle={() => toggleSelection(category, keyword)}
                                onSave={(data) => saveTimeAndDays(category, keyword, data)}
                            />
                        ))}
                    </div>
                </div>
            ))}
            </div>
        </div>
            <button style={styles.completeButton} onClick={handleComplete}>완료</button>
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
    inputGroup: {
        width: "100%",
        maxWidth: "400px",
        marginBottom: "15px",
    },
    label: {
        display: "block",
        marginBottom : "5px",
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        padding: "10px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
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
    contentWrapper: {
        display: "flex",
        justifyContent: "flex-start",
        width: "100%",
        maxWidth: "800px",
    },
    leftColumn: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
    },
};

export default KeywordSelectionPage;
