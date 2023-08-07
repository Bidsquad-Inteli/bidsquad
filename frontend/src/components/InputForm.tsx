import React from "react";
import { Input, InputProps } from "./Input"; // Import the Input and InputProps from the existing file
import { FieldErrors } from "react-hook-form";

interface InputFormProps extends InputProps {
    label: string;
    errors?: FieldErrors;
}

export const InputForm: React.FC<InputFormProps> = ({ label, errors, ...inputProps }) => {
  const error = errors?.[inputProps.name]?.message;

    return (
        <div className="flex flex-col">
            <label htmlFor={inputProps.name} className="text-md block font-bold mb-2">
                {label}
            </label>
            <Input {...inputProps} />
            {error && <p className="text-red-500 text-sm mt-1 block">{error as string}</p>}
        </div>
    );
};
