import Link from "next/link";
import { usePathname } from "next/navigation";

type NavbarItemProps = {
    href: string;
    label: string;
};

export const NavbarItem: React.FC<NavbarItemProps> = ({ href, label }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    const className = `p-4 border-b-2 border-primary border-opacity-0 duration-200 cursor-pointer ${
        isActive
            ? "border-opacity-100 text-black"
            : "hover:border-opacity-100 hover:text-black "
    }`;

    return (
        <Link href={href} className={className}>
            {label}
        </Link>
    );
};
