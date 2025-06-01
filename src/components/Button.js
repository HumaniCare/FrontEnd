import React from "react";

const Button = ({ text, color, onClick, icon }) => {
    return (
        <button onClick = {onClick}
        style = {{
            backgroundColor : color,
            color : "#fff",
            border : "none",
            padding : "12px 16px",
            borderRadius : "8px",
            fontSize: "16px",
            width: "250px",
            display : "flex",
            alignItems: "center",
            justifyContent : "center",
            gap : "8px",
            cursor: "pointer"
        }}
        >
            {icon && <img src ={icon} alt="icon" width="20" />}
            {text}
        </button>
    );
};

export default Button;