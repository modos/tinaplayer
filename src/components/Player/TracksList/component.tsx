import {Card, List, ListItem, ListItemPrefix} from "@material-tailwind/react";
import {useTracks} from "@/store/tracks.ts";
import {usePlayer} from "@/store/player.ts";

export function TracksList() {
    const tracks = useTracks(state => state.tracks);
    const setCurrentPlayingTrack = usePlayer(state => state.setCurrentTrack);
    return (
        <Card className="w-full h-full p-5">
            <List className="overflow-y-scroll">
                {tracks.map(track =>
                   <div key={track.file.name} onClick={() => setCurrentPlayingTrack(track)}>
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
