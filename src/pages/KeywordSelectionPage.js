import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const keywords = {
    "수면여부 확인": ["아침", "밤"],
    "식사여부 확인": ["아침", "점심", "저녁"],
    "약 복용 여부 확인": ["아침", "점심", "저녁"],
    "활동 여부 확인": ["외출", "청소", "교회", "운동", "목욕"],
    "심리적 상태 체크": ["O", "X"]
};

const KeywordSelectionPage = () => {
    const navigate = useNavigate();

    const [selected, setSelected] = useState(
        Object.keys(keywords).reduce((acc, category) => {
            acc[category] = {};
            keywords[category].forEach((keyword) => (acc[category][keyword] = false));
            return acc;
        }, {})
    );

    const toggleSelection = (category, keyword) => {
        setSelected((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [keyword]: !prev[category][keyword] // 해당 키워드만 변경
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
                            <button
                                key={keyword}
                                style={{
                                    ...styles.keywordButton,
                                    backgroundColor: selected[category][keyword] ? "#DABEC9" : "#FFF",
                                    color: selected[category][keyword] ? "#FFF" : "#000",
                                }}
                                onClick={() => toggleSelection(category, keyword)}
                            >
                                {keyword}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
            <button style={styles.completeButton} onClick={() => navigate("/")}>완료</button>
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
};

export default KeywordSelectionPage;
