import { IconButton } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

export function DrawerList() {
    return (
        <div>
            <div className="flex flex-col gap-3">
                <Link to="/">
                    <IconButton color="blue">
                        <i className="fas fa-music" />
                    </IconButton>
                </Link>
                <Link to="settings">
                    <IconButton color="purple">
                        <i className="fas fa-cog" />
                    </IconButton>
                </Link>
                <Link to="favourites">
                    <IconButton color="red">
                        <i className="fas fa-heart" />
                    </IconButton>
                </Link>
            </div>
        </div>
    );
}
