import { create } from 'zustand';
import {storeFile} from "@/types/types.ts";

type playerStore = {
    currentTrack: storeFile,
    setCurrentTrack: (v: storeFile) => void
}

export const usePlayer = create<playerStore>()((set) => ({
    currentTrack: {} as storeFile,
    setCurrentTrack: (values: storeFile) => {
        set({currentTrack: {...values}});
    },
}));