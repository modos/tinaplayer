import {Drawer} from './components/Drawer'
import {Player} from './components/Player'
import {useTracks} from "@/store/tracks.ts";
function App() {
    const storedTracks = useTracks(state => state.tracks)
  return (
    <>
     <div className="flex 100vh">

         <div className="bg-base-100 border-r-2 border-gray-300">
             <Drawer/>
         </div>
         <div className="w-full bg-base-100">
             {storedTracks.map(track => <li key={track.file.name}>
                 <img src={track.cover} width={'64px'} height={'64px'} alt={track.file.name}/>
                 <span>{track.file.name}</span>
             </li>)}
             <Player/>
         </div>
     </div>
    </>
  )
}

export default App
