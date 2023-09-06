import {Drawer} from './components/Drawer';
import {Player} from './components/Player';
import {TracksList} from "@/components/Player/TracksList";
import {Route, Routes} from "react-router-dom";
import {Settings} from "@/components/Settings";
import {useState} from "react";
function App() {
    const selectedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.value = selectedTheme;
    const [theme, setTheme] = useState(selectedTheme);

    function changeTheme(name: string) {
        document.documentElement.classList.value = name;
        localStorage.setItem('theme', name);
        setTheme(name);
    }

  return (
    <>
     <div className="flex 100vh">
         <div className="bg-base-100 bg-base-100 border-r-2 border-neutral">
             <Drawer/>
         </div>
         <div className="bg-base-100 w-full flex flex-col bg-base-100 h-screen">
             <div className="w-full px-5 py-2 overflow-hidden basis-4/5">
                    <Routes>
                        <Route path="/" element={<TracksList/>}/>
                        <Route path="/settings" element={<Settings theme={theme} onChangeTheme={(newTheme: string) => changeTheme(newTheme)}/>}/>
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
