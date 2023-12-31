import { storeFile } from '@/types/types.ts';
import { openDB } from 'idb';

export async function getAllTracks() {
    const db = await openDB('tinaplayer', 1, {
        upgrade(db) {
            db.createObjectStore('tracks', {
                keyPath: 'id',
                autoIncrement: true,
            });
        },
    });

    if (db.objectStoreNames.contains('tracks')) {
        const transaction = db.transaction('tracks', 'readonly');

        const objectStore = transaction.objectStore('tracks');

        return objectStore.getAll();
    }

    db.close();

    return [];
}

export async function getAllFavTracks() {
    const allTracks = await getAllTracks();
    return allTracks.filter((track) => track.liked);
}

export async function insertTrack(track: storeFile) {
    const db = await openDB('tinaplayer', 1, {});

    await db.add('tracks', track);
}

export async function clearTracks() {
    const db = await openDB('tinaplayer', 1);
    if (db.objectStoreNames.contains('tracks')) {
        const transaction = db.transaction('tracks', 'readwrite');
        const objectStore = transaction.objectStore('tracks');
        objectStore.clear();
        db.close();
    }
}

export async function toggleLikeTrack(
    track: storeFile,
    likeOrUnLike: boolean = false
) {
    const db = await openDB('tinaplayer', 1);
    if (db.objectStoreNames.contains('tracks')) {
        const transaction = db.transaction('tracks', 'readwrite');
        const objectStore = transaction.objectStore('tracks');
        await objectStore.put({ ...track, liked: likeOrUnLike });
        db.close();
    }
}
