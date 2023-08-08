import { useState } from "react";
import { useForm } from "react-hook-form";
import { SemipolarLoading } from "react-loadingg";
import { Button } from "../Button";
import { CoordinateFormControls } from "./formControls";
import { StageControls } from "../StageControls";
import { Input } from "../Input";

interface CoordinateFormProps {
    stage: number;
    setStage: (stage: any) => void;
    setMap: (str: string) => void;
    map: string;
}

export const CoordinateForm: React.FC<CoordinateFormProps> = ({
    setMap,
    stage,
    setStage,
    map,
}) => {
    const [inputQuantity, setInputQuantity] = useState<number>(1);

    const increaseInput = () => {
        setInputQuantity((prevInputQuantity) => prevInputQuantity + 1);
    };

    const decreaseInput = () => {
        if (inputQuantity > 1) {
            setInputQuantity((prevInputQuantity) => prevInputQuantity - 1);
            // clean input
        }
    };

    const onSubmit = async (data) => {
        const joined = data.coordinates.join("|");

        setMap(
            `https://maps.googleapis.com/maps/api/staticmap?size=400x400&maptype=satellite&path=color:0xff0000ff|weight:5|${joined}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );

        console.log(joined);
        reset({
            coordinates: [""],
        });
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const nextStage = () => {
        if (stage === 0) {
            setStage((prevStage) => prevStage + 1);
        }
    };

    return (
        <>
            <h4 className="mt-2 md:mt-4 text-center text-2xl mb-12">
                Choose the coordinates of your preservation area
            </h4>
            <div className="w-[80%] mx-auto flex flex-col md:flex-row justify-evenly items-center">
                <form
                    className="min-w-[30%] w-1/3"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <label className="block text-md font-bold mb-2">
                        Coordinates
                    </label>
                    {[...Array(inputQuantity)].map((_, index) => (
                        <Input
                            key={index}
                            placeholder={`Coordinate ${index + 1}`}
                            register={register}
                            name={`coordinates[${index}]`}
                        />
                    ))}
                    <CoordinateFormControls
                        decreaseInput={decreaseInput}
                        increaseInput={increaseInput}
                    />
                    <div className="w-full flex justify-center items-center mt-8">
                        <Button type="submit" text="Process coordinates" />
                    </div>
                </form>
                <div className="w-2/5">
                    {map ? (
                        <div className="w-full flex flex-col justify-center items-center">
                            <label className="w-full font-bold mb-2 text-xl">
                                Image
                            </label>
                            <img
                                className="border-4 border-blue-500 rounded-2xl w-full"
                                alt="Sattelite Image"
                                src={map}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-6">
                            <label>Waiting for coordinates</label>
                            <div className="relative mr-8">
                                <SemipolarLoading
                                    color="#3B82F6"
                                    size="small"
                                    speed={8}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <StageControls
                onSubmit={nextStage}
                submitButtonText="Next page"
                submitButtonDisabled={map === ""}
            />
        </>
    );
};
