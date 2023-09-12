import {Card, List, ListItem, ListItemPrefix} from "@material-tailwind/react";
import {usePlayer} from "@/store/player.ts";
import {storeFile} from "@/types/types.ts";
import {getAllTracks} from "@/helpers/indexedDB.ts";
import {useLayoutEffect, useState} from "react";
import {useTracks} from "@/store/tracks.ts";

export function TracksList() {
    const [tracks, setTracks] = useState([] as Array<storeFile>);
    const setCurrentPlayingTrack = usePlayer(state => state.setCurrentTrack);
    const setPrevPlayingTrack = usePlayer(state => state.setPrevTrack);
    const setNextPlayingTrack = usePlayer(state => state.setNextTrack);

    useTracks.subscribe(state => setTracks(state.tracks));

    function trackSelected(track: storeFile, i: number) {
        setCurrentPlayingTrack(track);
        tracks[i - 1] && setPrevPlayingTrack(tracks[i - 1]);
        tracks[i + 1] && setNextPlayingTrack(tracks[i + 1]);

    }

    useLayoutEffect(() => {
        getAllTracks().then(data => setTracks(data));
    }, []);

    return (
        <Card className="bg-base-100 w-full h-full sm:p-5">
            <List className="overflow-y-scroll">
                {tracks.map((track, i) =>
                   <div key={track.file.name} onClick={() => trackSelected(track, i)}>
                       <ListItem>
                           <ListItemPrefix>
                               <img src={URL.createObjectURL(track.cover)} alt={track.file.name} width="32px" height="32px"/>
                           </ListItemPrefix>
                           <p>{track.file.name}</p>
                       </ListItem>
                   </div>
                )}
            </List>
        </Card>
    );
}
