import {Card, CardBody, CardFooter, IconButton, Slider} from "@material-tailwind/react";
import {ReactElement, useState} from "react";

export function Player() {
    const [iconStates, setIconStates] = useState({
        isPlaying: true,
        isMuted: false,
        isLiked: false,
        isShuffled: false
    });

    const [timestamp, setTimestamp] = useState(50);
    const [volume, setVolume] = useState(50);

    const playIcon = () => {
        return (
            <IconButton onClick={() => toggleIcon("isPlaying")} variant="text" size="lg" color="deep-purple">
                <i className="fas fa-play text-lg" />
            </IconButton>
        );
    }

    const pauseIcon = () => {
        return (
            <IconButton onClick={() => toggleIcon("isPlaying")} variant="text" size="lg" color="deep-purple">
                <i className="fas fa-pause text-lg" />
            </IconButton>
        );
    }

    const highVolumeIcon = () => {
        return (
            <IconButton onClick={() => toggleIcon("isMuted")} variant="text">
                <i className="fas fa-volume-high" />
            </IconButton>
        );
    }

    const lowVolumeIcon = () => {
        return (
            <IconButton onClick={() => toggleIcon("isMuted")} variant="text">
                <i className="fas fa-volume-low" />
            </IconButton>
        );
    }

    const muteVolumeIcon = () => {
        return (
            <IconButton onClick={() => toggleIcon("isMuted")} variant="text">
                <i className="fas fa-volume-xmark" />
            </IconButton>
        );
    }

    const likedIcon = () => {
            return (
                <IconButton onClick={() => toggleIcon("isLiked")} variant="text" color="red">
                    <i className="fas fa-heart" />
                </IconButton>
            );
    }

    const unlikedIcon = () => {
        return (
            <IconButton onClick={() => toggleIcon("isLiked")} variant="text" color="red">
                <i className="fa-regular fa-heart" />
            </IconButton>
        );
    }

    const shuffleIcon = () => {
        return (
            <IconButton onClick={() => toggleIcon("isShuffled")} variant="text">
                <i className="fas fa-shuffle" />
            </IconButton>
        );
    }

    const unShuffleIcon = () => {
        return (
            <IconButton onClick={() => toggleIcon("isShuffled")} variant="text">
                <i className="fas fa-maximize" />
            </IconButton>
        );
    }

    const toggleIcon = (iconName: string) => {
        setIconStates((prevState => ({
            ...prevState,
            [iconName]: !(prevState as never)[iconName]
        })));
    };

    const onChangeVolume = (value: number) => {
        setVolume(value);
    }

    const changeVolumeIcon = (value: number) : ReactElement => {
        if (value < 1 || iconStates.isMuted) {
            return muteVolumeIcon();
        }else if (value > 0 && value <= 50) {
            return lowVolumeIcon();
        }
        return highVolumeIcon();
    }

    return(
        <>
            <Card className="w-4/5 mx-auto absolute bottom-[2%] right-0 left-0">
                <CardBody className="pb-3">
                    <div className="flex items-center gap-3 text-sm">
                        <span>00:00</span>
                        <Slider size="sm" value={timestamp} onChange={(e) => setTimestamp(e.target.value as never)}/>
                        <span>00:00</span>
                    </div>
                </CardBody>
                <CardFooter className="pt-0 pb-2">
                    <div className="flex justify-between items-center">
                        <div>
                            <img
                                className="w-[48px] h-[48px] rounded-lg object-cover object-center shadow-md shadow-blue-gray-900/50"
                                src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                                alt="nature image"
                            />
                        </div>
                        <div>
                            {iconStates.isLiked ? likedIcon() : unlikedIcon()}
                            {iconStates.isShuffled ? shuffleIcon() : unShuffleIcon()}
                            <IconButton variant="text" className="ml-5">
                                <i className="fas fa-backward-step" />
                            </IconButton>
                            {iconStates.isPlaying ? playIcon() : pauseIcon()}
                            <IconButton variant="text">
                                <i className="fas fa-forward-step" />
                            </IconButton>
                        </div>
                        <div className="flex items-center gap-2">
                            <Slider size="sm" value={volume.toString()} onChange={(e) => onChangeVolume(parseInt(e.target.value))} className="min-w-[100px]"/>
                            {changeVolumeIcon(volume)}
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </>
    );
}