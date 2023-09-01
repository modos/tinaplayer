import {Drawer} from './components/Drawer';
import {Player} from './components/Player';
import {TracksList} from "@/components/Player/TracksList";
import {Route, Routes} from "react-router-dom";
function App() {
  return (
    <>
     <div className="flex 100vh">

         <div className="bg-base-100 border-r-2 border-gray-300">
             <Drawer/>
         </div>
         <div className="w-full flex flex-col bg-base-100 h-screen">
             <div className="w-full px-5 py-2 overflow-hidden basis-4/5">
                    <Routes>
                        <Route path="/" element={<TracksList/>}/>
                        <Route path="/settings" element={<p>Settings</p>}/>
                    </Routes>
             </div>
             <div className="basis-1/5">
                 <Player/>
             </div>
         </div>
     </div>
    </>
  );
}

export default App;
