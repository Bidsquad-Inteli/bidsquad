import Link from "next/link"

export const Footer = () => {
    return (
        <div className="flex flex-col md:flex-row justify-center w-full px-4 py-8 bg-[#000000af] text-white">
            <div className="flex flex-col justify-start lg:w-1/3 md:text-end h-full">
                <p className="text-2xl mb-4">Next.js + TypeScript + TailwindCSS + Eslint + Prettier template</p>
                <p className="text-lg">Created by <Link href="https://github.com/marcelofeitoza">Marcelo Feitoza</Link></p>
            </div>
            <div className="flex flex-col justify-end lg:w-1/3 md:text-end h-full">
                <p className="mb-4">This project is licensed under the terms of the MIT license.</p>
                <p className="font-semibold text-lg">Available on <Link className="text-blue-300 hover:underline" href="https://github.com/marcelofeitoza/nextjs-typescript-tailwindcss-eslint-prettier">GitHub</Link></p>
            </div>
        </div>
    )
}