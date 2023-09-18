import {Drawer} from './components/Drawer';
import {Player} from './components/Player';
import {TracksList} from "@/components/Player/TracksList";
import {Route, Routes} from "react-router-dom";
import {Settings} from "@/components/Settings";
import {useRef, useState} from "react";
import {useScreenSize, useSwipeLeft, useSwipeRight} from "@/hooks";
function App() {
    const selectedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.value = selectedTheme;
    const [theme, setTheme] = useState(selectedTheme);
    const swappableDivRef =  useRef<HTMLDivElement>(null);
    const [showDrawer, setShowDrawer] = useState(false);
    const isDesktop: boolean = useScreenSize();

    const handleSwipeLeft = (): void => {
        setShowDrawer(true);
    };


    const handleSwipeRight = (): void => {
        setShowDrawer(false);
    };



    useSwipeLeft(swappableDivRef, handleSwipeLeft);
    useSwipeRight(swappableDivRef, handleSwipeRight);

    function changeTheme(name: string) {
        document.documentElement.classList.value = name;
        localStorage.setItem('theme', name);
        setTheme(name);
    }

  return (
    <>
     <div className="flex relative">
         <div className="bg-base-100 w-full flex flex-col bg-base-100 h-[calc(100dvh)]">
             <div className="w-full sm:px-5 sm:py-2 overflow-hidden basis-4/5" ref={swappableDivRef}>
                    <Routes>
                        <Route path="/" element={<TracksList/>}/>
                        <Route path="/settings" element={<Settings theme={theme} onChangeTheme={(newTheme: string) => changeTheme(newTheme)}/>}/>
                    </Routes>
             </div>
             <div className="basis-1/5 z-[2]">
                 <Player/>
             </div>
         </div>
         {
             (isDesktop || showDrawer) &&
             <div className="bg-base-100 bg-base-100 border-l-2 border-neutral absolute right-0">
                 <Drawer/>
             </div>
         }
     </div>
    </>
  );
}

export default App;
