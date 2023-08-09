import {Drawer} from './components/Drawer'
function App() {
  return (
    <>
     <div className="flex 100vh">
         <div className="bg-base-100 border-r-2 border-neutral">
             <Drawer/>
         </div>
         <div className="w-full bg-neutral">
             main
         </div>
     </div>
    </>
  )
}

export default App
