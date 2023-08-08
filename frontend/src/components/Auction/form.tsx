import { sendInput, depositEther } from "@/utils/send_data";
import {
    fetchImageAndConvertToBase64,
    sendToIPFS,
    toUnixTime,
} from "@/utils/utils";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { StageControls } from "../StageControls";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { InputForm } from "../Input/form";
import { WaveTopBottomLoading } from "react-loadingg";

const schema = yup
    .object()
    .shape({
        title: yup
            .string()
            .typeError("This must be a string")
            .required("This is a required field"),
        description: yup
            .string()
            .typeError("This must be a string")
            .required("This is a required field"),
        startDate: yup
            .date()
            .typeError("This must be a date")
            .required("This is a required field"),
        endDate: yup
            .date()
            .typeError("This must be a date")
            .required("This is a required field"),
    })
    .required();

interface AuctionFormProps {
    stage: number;
    setStage: (stage: any) => void;
    mapUrl: string;
}

export const AuctionForm: React.FC<AuctionFormProps> = ({
    setStage,
    stage,
    mapUrl,
}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const previousStage = async () => {
        if (stage === 1) {
            setStage((prevStage) => prevStage - 1);
        }
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const { base64Data, file } = await fetchImageAndConvertToBase64(
                mapUrl
            );
            const ipfsFileUrl = await sendToIPFS(file);

            const payload = {
                method: "create",
                args: {
                    base64Image: base64Data,
                    satteliteImageUrl: ipfsFileUrl,
                    title: data.title,
                    description: data.description,
                    start_date: toUnixTime(data.startDate),
                    end_date: toUnixTime(data.endDate),
                },
            };

            await depositEther(data.maxTokenizationCost);
            await sendInput(payload);

            toast.success("Auction created successfully!");
            router.replace("/auctions");
        } catch (error) {
            console.log(error);
            toast.error("Error creating auction!");
            setLoading(false);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    if (loading) {
        return <WaveTopBottomLoading color="#3B82F6" size="large" />;
    }

    return (
        <form className="mt-10 md:mt-24  px-[10%] md:px-[30%] flex flex-col gap-6">
            <h4 className="text-center text-2xl">
                Fill up the auction details
            </h4>
            <InputForm
                errors={errors}
                name="title"
                placeholder="Title"
                register={register}
                label="Title"
            />
            <InputForm
                errors={errors}
                name="description"
                placeholder="Description"
                register={register}
                label="Description"
            />
            <InputForm
                errors={errors}
                name="startDate"
                placeholder="Start date"
                register={register}
                type="date"
                label="Start date"
            />
            <InputForm
                errors={errors}
                name="endDate"
                placeholder="End date"
                register={register}
                type="date"
                label="End date"
            />

            <StageControls
                onSubmit={handleSubmit(onSubmit)}
                submitButtonDisabled={false}
                submitButtonText="Concluir"
                onPrevious={previousStage}
            />
        </form>
    );
};
