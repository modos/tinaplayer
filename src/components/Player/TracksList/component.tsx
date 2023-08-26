import {Card, List, ListItem, ListItemPrefix} from "@material-tailwind/react";
import {useTracks} from "@/store/tracks.ts";
import {usePlayer} from "@/store/player.ts";
import {storeFile} from "@/types/types.ts";

export function TracksList() {
    const tracks = useTracks(state => state.tracks);
    const setCurrentPlayingTrack = usePlayer(state => state.setCurrentTrack);
    const setPrevPlayingTrack = usePlayer(state => state.setPrevTrack);
    const setNextPlayingTrack = usePlayer(state => state.setNextTrack);
    
    function trackSelected(track: storeFile, i: number) {
        setCurrentPlayingTrack(track);
        tracks[i - 1] && setPrevPlayingTrack(tracks[i - 1]);
        tracks[i + 1] && setNextPlayingTrack(tracks[i + 1]);

    }
    return (
        <Card className="w-full h-full p-5">
            <List className="overflow-y-scroll">
                {tracks.map((track, i) =>
                   <div key={track.file.name} onClick={() => trackSelected(track, i)}>
                       <ListItem>
                           <ListItemPrefix>
                               <img src={track.cover} alt={track.file.name} width={'32px'} height={'32px'}/>
                           </ListItemPrefix>
                           <p>{track.file.name}</p>
                       </ListItem>
                   </div>
                )}
            </List>
        </Card>
    );
}
