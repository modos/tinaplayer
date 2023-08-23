import {Card, CardBody, CardFooter, IconButton, Slider} from "@material-tailwind/react";
import {ChangeEvent, ReactElement, useEffect, useRef, useState} from "react";
import {usePlayer} from "@/store/player.ts";
import {storeFile} from "@/types/types.ts";

export function Player() {

    const [iconStates, setIconStates] = useState({
        isPlaying: true,
        isMuted: false,
        isLiked: false,
        isShuffled: false
    });

    const [timestamp, setTimestamp] = useState(50);
    const [volume, setVolume] = useState(0.5);

    const currentPlayingTrack = usePlayer(state => state.currentTrack);
    const audio = useRef(new Audio());
    usePlayer.subscribe( (state) => {updateTrack(state.currentTrack);});

    useEffect(() => {
        audio.current.volume = volume;
    }, [volume]);

    useEffect(() => {
        if (iconStates.isMuted) {
            setVolume(0);
        }
    }, [iconStates.isMuted]);

    function updateTrack(newTrack: storeFile) {
        audio.current.src = URL.createObjectURL(newTrack.file);
        audio.current.volume = volume;
    }

     function playAudio() {
            audio.current.play().then();
    }

    function pauseAudio() {
            audio.current.pause();
    }

    function playIconClicked() {
        playAudio();
        toggleIcon("isPlaying");
    }

    function pauseIconClicked() {
        pauseAudio();
        toggleIcon("isPlaying");
    }


    const playIcon = () => {
        return (
            <IconButton onClick={() => playIconClicked()} variant="text" size="lg" color="deep-purple">
                <i className="fas fa-play text-lg" />
            </IconButton>
        );
    };

    const pauseIcon = () => {
        return (
            <IconButton onClick={() => pauseIconClicked()} variant="text" size="lg" color="deep-purple">
                <i className="fas fa-pause text-lg" />
            </IconButton>
        );
    };

    const highVolumeIcon = () => {
        return (
            <IconButton onClick={() => toggleIcon("isMuted")} variant="text">
                <i className="fas fa-volume-high" />
            </IconButton>
        );
    };

    const lowVolumeIcon = () => {
        return (
            <IconButton onClick={() => toggleIcon("isMuted")} variant="text">
                <i className="fas fa-volume-low" />
            </IconButton>
        );
    };

    const muteVolumeIcon = () => {
        return (
            <IconButton onClick={() => toggleIcon("isMuted")} variant="text">
                <i className="fas fa-volume-xmark" />
            </IconButton>
        );
    };

    const likedIcon = () => {
            return (
                <IconButton onClick={() => toggleIcon("isLiked")} variant="text" color="red">
                    <i className="fas fa-heart" />
                </IconButton>
            );
    };

    const unlikedIcon = () => {
        return (
            <IconButton onClick={() => toggleIcon("isLiked")} variant="text" color="red">
                <i className="fa-regular fa-heart" />
            </IconButton>
        );
    };

    const shuffleIcon = () => {
        return (
            <IconButton onClick={() => toggleIcon("isShuffled")} variant="text">
                <i className="fas fa-shuffle" />
            </IconButton>
        );
    };

    const unShuffleIcon = () => {
        return (
            <IconButton onClick={() => toggleIcon("isShuffled")} variant="text">
                <i className="fas fa-maximize" />
            </IconButton>
        );
    };

    const toggleIcon = (iconName: string) => {
        if (iconStates.isMuted) {
            setVolume(1);
        }
        setIconStates((prevState => ({
            ...prevState,
            [iconName]: !(prevState as never)[iconName]
        })));
    };

    const onChangeVolume = (value: number) => {
        setVolume(value);
    };

    const changeVolumeIcon = (value: number) : ReactElement => {
        if (value < 0.1) {
            return muteVolumeIcon();
        }else if (value > 0.1 && value <= 0.5) {
            return lowVolumeIcon();
        }
        return highVolumeIcon();
    };

    function formatAudioTime(time: number): string {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    }

    function audioTimestamp(): string {
        return formatAudioTime(audio.current.currentTime);
    }

    function audioDuration(): string {
        return audio.current.duration > 0 ? formatAudioTime(audio.current.duration) : '00:00';
    }

    useEffect(() => {
        const updateTime = () => {
            audio.current.currentTime > 0 && setTimestamp(audio.current.currentTime / audio.current.duration * 100);
        };

            audio.current.addEventListener('timeupdate', updateTime);

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            audio.current.removeEventListener('timeupdate', updateTime);
        };
    }, []);

    function updateAudioCurrentTime(e: ChangeEvent<HTMLInputElement>) {
        Math.abs(parseInt(e.target.value) - timestamp) >= 1 &&  (audio.current.currentTime = parseInt(e.target.value) / 100 * audio.current.duration);
    }

    return(
        <>
            <Card className="w-4/5 mx-auto absolute bottom-[2%] right-0 left-0">
                <CardBody className="pb-3">
                    <div className="flex items-center gap-3 text-sm">
                        <span>{audioTimestamp()}</span>
                            <Slider size="sm" value={timestamp}  onChange={updateAudioCurrentTime}/>
                        <span>{audioDuration()}</span>
                    </div>
                </CardBody>
                <CardFooter className="pt-0 pb-2">
                    <div className="flex justify-between items-center">
                        <div>
                            <img
                                className="w-[48px] h-[48px] rounded-lg object-cover object-center shadow-md shadow-blue-gray-900/50"
                                src={
                                currentPlayingTrack.cover ? currentPlayingTrack.cover : "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                            }
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
                            <Slider size="sm" value={(volume * 100).toString()} onChange={(e) => onChangeVolume(parseInt(e.target.value) / 100)} className="min-w-[100px]"/>
                            {changeVolumeIcon(volume)}
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </>
    );
}