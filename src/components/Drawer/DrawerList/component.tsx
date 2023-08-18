import {IconButton} from "@material-tailwind/react"
import {getTracks} from "@/helpers/fileSystem.ts"
import {mapImportedTracks} from "@/helpers/track.ts"
import {useTracks} from "@/store/tracks.ts"

export function DrawerList() {
    const storeTracks = useTracks(state => state.add)
    async function insertTracks() {
            const tracks = await getTracks();

            if (tracks && tracks.length) {
                storeTracks(await mapImportedTracks(tracks))
            }
    }


    return (
       <div>
           <div className="flex flex-col gap-3">
               <IconButton color="blue" onClick={insertTracks}>
                   <i className="fas fa-music"/>
               </IconButton>
           </div>
       </div>
    );
}