import {IconButton} from "@material-tailwind/react";

export function DrawerList() {
    return (
       <div>
           <div className="flex flex-col gap-3">
               <IconButton color="blue">
                   <i className="fas fa-music" />
               </IconButton>
           </div>
       </div>
    );
}