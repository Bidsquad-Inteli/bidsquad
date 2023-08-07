import React from "react";

interface ButtonProps {
    disabled?: boolean;
    onClick?: () => void;
    text: string;
    type?: "button" | "submit";
}

export const Button: React.FC<ButtonProps> = ({ disabled = false, onClick, text, type = "button" }) => {
    return (
        <button
            disabled={disabled}
            className="hover:-translate-y-1 transition-all px-4 py-2 text-white font-bold flex justify-center items-center rounded bg-blue-500 disabled:opacity-50"
            onClick={onClick}
            type={type}
        >
            {text}
        </button>
    );
};
