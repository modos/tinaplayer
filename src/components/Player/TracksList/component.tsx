import {Card, List, ListItem} from "@material-tailwind/react";
import {useTracks} from "@/store/tracks.ts";

export function TracksList() {
    const tracks = useTracks(state => state.tracks)
    return (
        <Card className="w-full h-full p-5">
            <List className="overflow-y-scroll h-full">
                {tracks.map(track =>
                    <ListItem key={track.file.name}>
                        <img src={track.cover} alt={track.file.name} width={'32px'} height={'32px'}/>
                        <p>{track.file.name}</p>
                    </ListItem>
                )}
            </List>
        </Card>
    );
}
