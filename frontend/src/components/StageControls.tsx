import React from "react";
import { Button } from "./Button";

interface StageControlsProps {
    submitButtonText: string;
    onSubmit: () => void;
    submitButtonDisabled: boolean;
    previousButtonDisabled?: boolean;
    onPrevious?: () => void;
}
export const StageControls: React.FC<StageControlsProps> = ({
    onSubmit,
    onPrevious,
    previousButtonDisabled = false,
    submitButtonDisabled,
    submitButtonText,
}) => {
    return (
        <div className="w-full flex flex-row items-center justify-center gap-2 mt-12">
            {onPrevious && <Button disabled={previousButtonDisabled} onClick={onPrevious} text="Back Page" />}
            <Button disabled={submitButtonDisabled} onClick={onSubmit} text={submitButtonText} />
        </div>
    );
};
