import {IconButton} from "@material-tailwind/react";
import {getTracks} from "@/helpers/fileSystem.ts";
import {getCover, getMetadata} from "@/helpers/track.ts";


export function DrawerList() {
    async function insertTracks() {
            const tracks = await getTracks();

            if (tracks && tracks.length) {
                const sampleFile = await tracks[0].file.getFile()
                const tags = await getMetadata(sampleFile)
                const cover = await getCover(tags)

                if (cover) {
                    const img = new Image()
                    img.src = cover
                    document.body.appendChild(img)
                }
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