import {storeFile} from "@/types/types.ts";

export function insertTrack(track: storeFile) {
    const db = window.indexedDB.open('tinaplayer', 1);

    db.onupgradeneeded = function () {
      db.result.createObjectStore('tracks', {keyPath: 'id', autoIncrement: true});
    };

    db.onsuccess = function() {
        const transaction = db.result.transaction('tracks', 'readwrite');
        const objectStore = transaction.objectStore('tracks');

        const addDataRequest = objectStore.add(track);


        addDataRequest.onerror = function(event: Event) {
            console.error('Error adding data to the database:', event);
        };

        transaction.oncomplete = function() {
            db.result.close();
        };
    };
}

export function clearTracks() {
    const db = window.indexedDB.open('tinaplayer', 1);

    db.onsuccess = function() {
        const transaction = db.result.transaction('tracks', 'readwrite');
        const objectStore = transaction.objectStore('tracks');

        objectStore.clear();

        transaction.oncomplete = function() {
            db.result.close();
        };
    };
}