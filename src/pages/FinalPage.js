import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../components/Logo";

const FinalPage = () => {
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleLogoutClick = () => {
        setShowConfirm(true);
    };

    const handleConfirmYes = () => {
        setShowConfirm(false);
        navigate('/');
    };

    const handleConfirmNo = () => {
        setShowConfirm(false);
    };

    return (
        <div style={styles.container}>
            <Logo />
            <p style={styles.text}>완료되었습니다.</p>
            <button style={styles.mainButton}>휴머니케어가 시작되었습니다.</button>
            <button onClick={handleLogoutClick} style={styles.logoutButton}>로그아웃</button>

            {showConfirm && (
                <div style={styles.popupOverlay}>
                    <div style={styles.popupBox}>
                        <p>진짜 로그아웃 하시겠습니까?</p>
                        <div style={styles.popupButtons}>
                            <button onClick={handleConfirmYes} style={styles.popupBtn}>예</button>
                            <button onClick={handleConfirmNo} style={styles.popupBtn}>아니오</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#F4E6CE',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    mainButton: {
        padding: '10px 24px',
        border: '1px solid black',
        borderRadius: '16px',
        backgroundColor: '#F4E6CE',
        marginBottom: 20,
        cursor: 'default',
    },
    logoutButton: {
        padding: '10px 24px',
        border: '1px solid black',
        borderRadius: '16px',
        backgroundColor: '#fff',
        color: '#000',
        cursor: 'pointer',
    },
    popupOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    popupBox: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 12,
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        textAlign: 'center',
    },
    popupButtons: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: 16,
    },
    popupBtn: {
        padding: '8px 16px',
        borderRadius: 8,
        border: '1px solid #000',
        backgroundColor: '#F4E6CE',
        cursor: 'pointer',
    },
};

export default FinalPage;
