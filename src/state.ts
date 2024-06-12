import { atom } from "jotai";
import { data } from "./utils";
import { atomWithStorage } from "jotai/utils";

const LOCALSTORAGE_KEY = "interactive_comemnts_section_storage_key";

export const replyIDAtom = atom<null | number>(null);
export const commentsAtom = atomWithStorage<typeof data.comments>(
    LOCALSTORAGE_KEY,
    data.comments
);
