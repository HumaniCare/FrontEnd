import React from "react";

const MicButton = ({onClick}) => {
    return (
        <button onClick={onClick} style={styles.micButton}>
            <img src="/images/mic_icon.png" alt="Mic Icon" style={styles.micIcon} />
        </button>
    );
};

const styles = {
    micButton: {
        background: "none",
        border: "none",
        cursor: "pointer",
        marginBottom: "20px",
    },
    micIcon: {
        width: "60px",
        height: "60px",
    },
};

export default MicButton;