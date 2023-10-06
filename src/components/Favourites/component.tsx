import { useLayoutEffect, useState } from 'react';
import { getAllFavTracks } from '@/helpers/indexedDB.ts';
import { storeFile } from '@/types/types.ts';
import {
    Card,
    CardBody,
    CardFooter,
    IconButton,
} from '@material-tailwind/react';
import { usePlayer } from '@/store/player.ts';

export function Favourites() {
    const [favTracks, setFavTracks] = useState([] as Array<storeFile>);
    const setCurrentPlayingTrack = usePlayer((state) => state.setCurrentTrack);

    function trackSelected(track: storeFile) {
        setCurrentPlayingTrack(track);
    }

    useLayoutEffect(() => {
        getAllFavTracks().then((data) => {
            setFavTracks([...data]);
        });
    }, []);
    return (
        <>
            <div className="flex gap-3">
                {favTracks.map((favTrack) => (
                    <Card key={favTrack.id} className="w-[128px]">
                        <CardBody className="p-0 relative group">
                            <div className="hidden group-hover:block absolute right-0 left-0 my-auto top-5 bottom-5 mx-auto w-max h-max">
                                <IconButton
                                    className="rounded hover:none focus:none active:shadow-none"
                                    onClick={() => {
                                        trackSelected(favTrack);
                                    }}
                                    variant="text"
                                    size="md"
                                >
                                    <i className="fas fa-play text-3xl px-2 rounded" />
                                </IconButton>
                            </div>
                            <img
                                src={
                                    favTrack.cover
                                        ? URL.createObjectURL(favTrack.cover)
                                        : ''
                                }
                                width={128}
                                height={128}
                                alt=""
                            />
                        </CardBody>
                        <CardFooter className="p-0">
                            <div className="text-[12px] pl-2 flex justify-center">
                                <span>{favTrack.file.name}</span>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    );
}
