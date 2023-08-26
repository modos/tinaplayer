import { create } from 'zustand';
import {storeFile} from "@/types/types.ts";

type playerStore = {
    currentTrack: storeFile
    prevTrack: storeFile
    nextTrack: storeFile
    setCurrentTrack: (v: storeFile) => void
    setPrevTrack: (v: storeFile) => void
    setNextTrack: (v: storeFile) => void
}

export const usePlayer = create<playerStore>()((set) => ({
    currentTrack: {} as storeFile,
    prevTrack: {} as storeFile,
    nextTrack: {} as storeFile,
    setCurrentTrack: (values: storeFile) => {
        set({currentTrack: {...values}});
    },
    setPrevTrack: (values: storeFile) => {
        set({prevTrack: {...values}});
    },
    setNextTrack: (values: storeFile) => {
        set({nextTrack: {...values}});
    },
}));