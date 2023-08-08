import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CoordinateFormControlsProps {
  increaseInput: () => void;
  decreaseInput: () => void;
}

export const CoordinateFormControls: React.FC<CoordinateFormControlsProps> = ({decreaseInput,increaseInput}) => {
    return (
        <div className="w-full flex justify-center items-center gap-2 mt-4">
            <button
                type="button"
                onClick={increaseInput}
                className="w-[30px] h-[30px] flex justify-center items-center rounded-[50%] bg-blue-500"
                aria-label="Increase coordinates"
            >
                <AiOutlinePlus color="white" />
            </button>
            <label>ou</label>
            <button
                type="button"
                onClick={decreaseInput}
                className="w-[30px] h-[30px] flex justify-center items-center rounded-[50%] bg-blue-500"
                aria-label="Decrease coordinates"
            >
                <AiOutlineMinus color="white" />
            </button>
        </div>
    );
};
