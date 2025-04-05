import React from 'react';
import {useNavigate } from 'react-router-dom';
import Logo from "../components/Logo";

const FinalPage = () => {
    const navigate = useNavigate();

    const handleFinish = () => {
        window.close();
    };

    return (
        <div style = {styles.container}>
            <Logo/>
            <p style = {styles.text}>완료되었습니다.</p>
            <button onClick={handleFinish} style={styles.button}>휴머니케어 시작</button>
        </div>
    )
}

const styles = {
    container: {
      backgroundColor: '#F4E6CE',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 120,
      marginBottom: 20,
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 60,
    },
    button: {
      padding: '10px 24px',
      border: '1px solid black',
      borderRadius: '16px',
      backgroundColor: '#F4E6CE',
      cursor: 'pointer',
    },
  };
  
  export default FinalPage;