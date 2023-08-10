import {Drawer} from './components/Drawer'
import {Player} from './components/Player'
function App() {
  return (
    <>
     <div className="flex 100vh">
         <div className="bg-base-100 border-r-2 border-gray-300">
             <Drawer/>
         </div>
         <div className="w-full bg-base-100">
             <Player/>
         </div>
     </div>
    </>
  )
}

export default App
