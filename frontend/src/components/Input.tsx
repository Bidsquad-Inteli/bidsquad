import React from "react";

export interface InputProps {
    type?: string;
    placeholder: string;
    register: any
    name: string
}

export const Input: React.FC<InputProps> = ({ placeholder,name,register, type = "text" }) => {
    return (
        <input
            className="border-2 border-blue-500 px-2 py-2 rounded outline-0 w-full"
            type={type}
            placeholder={placeholder}
            {...register(name)}
        />
    );
};
