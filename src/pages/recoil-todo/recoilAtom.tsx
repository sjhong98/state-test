import { atom } from "recoil";
import todoType from "./todoType";

export const recoilAtom = atom<todoType[]>({
    // atom의 식별자
    key: 'recoilAtom',
    default: []
})