import { create } from 'zustand';
import {storeFile} from "@/types/types.ts";
import {clearTracks, insertTrack} from "@/helpers/indexedDB.ts";

type tracksStore = {
    tracks: storeFile[]
    add: (values: Array<storeFile>) => void
}

export const useTracks = create<tracksStore>()((set) => ({
    tracks: [],
    add: (values) => {
        set({tracks: [...values]});
        clearTracks();
        values.map(value => insertTrack(value));
    },
}));