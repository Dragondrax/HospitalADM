import { IconType } from "react-icons/lib";
import { AiOutlineIdcard } from "react-icons/ai";
import { MdPeople } from "react-icons/md";


type NavConfig = {
    id: number;
    name: string;
    path: string;
    icon: IconType;
    children?: NavConfig[];
}

export const navConfig: NavConfig[] = [
    {
        id: 1,
        name: 'Fichas',
        path: '/home',
        icon: AiOutlineIdcard
    },
    {
        id: 1,
        name: 'Usuários',
        path: '/user',
        icon: MdPeople
    }
];