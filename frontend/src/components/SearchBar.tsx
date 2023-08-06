import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    search: string;
}

export const SearchBar: React.FC = () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<Inputs>();

    const onSubmitSearch: SubmitHandler<Inputs> = ({ search }) => {
        if (search) {
            router.push({
                pathname: "/search",
                query: { search },
            });
        } else {
            console.error('Nothing to search for');
        }
    }

    return (
        <form className="relative mr-2 absolute" onSubmit={handleSubmit(onSubmitSearch)}>
            <input type="text" className="bg-gray-100 border-2 border-gray-300 rounded-md w-64 px-4 py-1 text-sm focus:outline-none focus:border-primary" placeholder="Search" {...register("search", { required: true })} />
            <button type="submit" className="absolute right-0 top-0 mt-1 mr-2">
                Search
            </button>
        </form>
    );
}
