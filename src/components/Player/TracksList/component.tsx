import {
    Button,
    Card,
    List,
    ListItem,
    ListItemPrefix,
} from '@material-tailwind/react';
import { usePlayer } from '@/store/player.ts';
import { storeFile } from '@/types/types.ts';
import { getAllTracks } from '@/helpers/indexedDB.ts';
import { useLayoutEffect, useState } from 'react';
import { useTracks } from '@/store/tracks.ts';
import { getTracks } from '@/helpers/fileSystem.ts';
import { mapImportedTracks } from '@/helpers/track.ts';
export function TracksList() {
    const [tracks, setTracks] = useState([] as Array<storeFile>);
    const setCurrentPlayingTrack = usePlayer((state) => state.setCurrentTrack);
    const setPrevPlayingTrack = usePlayer((state) => state.setPrevTrack);
    const setNextPlayingTrack = usePlayer((state) => state.setNextTrack);
    const sync = useTracks((state) => state.sync);

    useTracks.subscribe((state) => setTracks(state.tracks));

    function trackSelected(track: storeFile, i: number) {
        setCurrentPlayingTrack(track);
        tracks[i - 1] && setPrevPlayingTrack(tracks[i - 1]);
        tracks[i + 1] && setNextPlayingTrack(tracks[i + 1]);
    }

    const storeTracks = useTracks((state) => state.add);

    async function insertTracks() {
        const tracksTemp = await getTracks();

        if (tracksTemp.length) {
            storeTracks(await mapImportedTracks(tracksTemp));
        }
    }

    useLayoutEffect(() => {
        getAllTracks().then((data) => {
            setTracks(() => data);
            sync(data);
        });
    }, [sync]);

    return tracks.length <= 0 ? (
        <div className="h-full flex justify-center items-center">
            <Button color="amber" onClick={insertTracks}>
                {' '}
                <i className="fas fa-music mr-3" />
                Import Tracks
            </Button>
        </div>
    ) : (
        <Card className="bg-base-100 w-full h-full sm:p-5">
            <List className="overflow-y-scroll">
                {tracks.map((track, i) => (
                    <div
                        key={track.file.name}
                        onClick={() => trackSelected(track, i)}
                    >
                        <ListItem>
                            <ListItemPrefix>
                                <img
                                    src={
                                        track.cover
                                            ? URL.createObjectURL(track.cover)
                                            : '/mp3.png'
                                    }
                                    alt={track.file.name}
                                    width="32px"
                                    height="32px"
                                />
                            </ListItemPrefix>
                            <p>{track.file.name}</p>
                        </ListItem>
                    </div>
                ))}
            </List>
        </Card>
    );
}
