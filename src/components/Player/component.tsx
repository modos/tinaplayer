import {
    Card,
    CardBody,
    CardFooter,
    IconButton,
    Slider,
} from '@material-tailwind/react';
import { ChangeEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { usePlayer } from '@/store/player.ts';
import { storeFile } from '@/types/types.ts';
import { useTracks } from '@/store/tracks.ts';
import { TrackCover } from '@/components/Player/TracksList/TrackCover';

export function Player() {
    const [iconStates, setIconStates] = useState({
        isPlaying: false,
        isMuted: false,
        isLiked: false,
        isShuffled: false,
    });

    const [timestamp, setTimestamp] = useState(50);
    const [volume, setVolume] = useState(0.5);

    const currentPlayingTrack = usePlayer((state) => state.currentTrack);
    const tracks = useTracks((state) => state.tracks);
    const setCurrentPlayingTrack = usePlayer((state) => state.setCurrentTrack);
    const setPrevPlayingTrack = usePlayer((state) => state.setPrevTrack);
    const setNextPlayingTrack = usePlayer((state) => state.setNextTrack);
    const nextTrack = usePlayer((state) => state.nextTrack);
    const prevTrack = usePlayer((state) => state.prevTrack);

    const audio = useRef(new Audio());
    usePlayer.subscribe((state) => {
        updateTrack(state.currentTrack);
    });

    useEffect(() => {
        playAudio();
    }, [audio.current.src]);

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
        setIconStates({ ...iconStates, isPlaying: true });
        audio.current.volume = volume;
    }

    function playAudio() {
        audio.current
            .play()
            .then()
            .catch(() => {});
    }

    function pauseAudio() {
        audio.current.pause();
    }

    function playIconClicked() {
        playAudio();
        setIconStates({ ...iconStates, isPlaying: true });
    }

    function pauseIconClicked() {
        pauseAudio();
        setIconStates({ ...iconStates, isPlaying: false });
    }

    const playIcon = () => {
        return (
            <IconButton
                onClick={playIconClicked}
                variant="text"
                size="lg"
                color="deep-purple"
            >
                <i className="fas fa-play text-lg" />
            </IconButton>
        );
    };

    const pauseIcon = () => {
        return (
            <IconButton
                onClick={pauseIconClicked}
                variant="text"
                size="lg"
                color="deep-purple"
            >
                <i className="fas fa-pause text-lg" />
            </IconButton>
        );
    };

    const highVolumeIcon = () => {
        return (
            <IconButton onClick={() => toggleIcon('isMuted')} variant="text">
                <i className="fas fa-volume-high" />
            </IconButton>
        );
    };

    const lowVolumeIcon = () => {
        return (
            <IconButton onClick={() => toggleIcon('isMuted')} variant="text">
                <i className="fas fa-volume-low" />
            </IconButton>
        );
    };

    const muteVolumeIcon = () => {
        return (
            <IconButton onClick={() => toggleIcon('isMuted')} variant="text">
                <i className="fas fa-volume-xmark" />
            </IconButton>
        );
    };

    const likedIcon = () => {
        return (
            <IconButton
                className="hidden sm:block"
                onClick={() => toggleIcon('isLiked')}
                variant="text"
                color="red"
            >
                <i className="fas fa-heart" />
            </IconButton>
        );
    };

    const unlikedIcon = () => {
        return (
            <IconButton
                className="hidden sm:block"
                onClick={() => toggleIcon('isLiked')}
                variant="text"
                color="red"
            >
                <i className="fa-regular fa-heart" />
            </IconButton>
        );
    };

    const shuffleIcon = () => {
        return (
            <IconButton
                className="hidden sm:block"
                onClick={() => toggleIcon('isShuffled')}
                variant="text"
            >
                <i className="fas fa-shuffle" />
            </IconButton>
        );
    };

    const unShuffleIcon = () => {
        return (
            <IconButton
                className="hidden sm:block"
                onClick={() => toggleIcon('isShuffled')}
                variant="text"
            >
                <i className="fas fa-maximize" />
            </IconButton>
        );
    };

    const toggleIcon = (iconName: string) => {
        if (iconStates.isMuted) {
            setVolume(1);
        }
        setIconStates((prevState) => ({
            ...prevState,
            [iconName]: !(prevState as never)[iconName],
        }));
    };

    const onChangeVolume = (value: number) => {
        setVolume(value);
    };

    const changeVolumeIcon = (value: number): ReactElement => {
        if (value < 0.1) {
            return muteVolumeIcon();
        } else if (value > 0.1 && value <= 0.5) {
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
        return audio.current.duration > 0
            ? formatAudioTime(audio.current.duration)
            : '00:00';
    }

    useEffect(() => {
        const updateTime = () => {
            audio.current.currentTime > 0 &&
                setTimestamp(
                    (audio.current.currentTime / audio.current.duration) * 100
                );
        };

        audio.current.addEventListener('timeupdate', updateTime);

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            audio.current.removeEventListener('timeupdate', updateTime);
        };
    }, []);

    function updateAudioCurrentTime(e: ChangeEvent<HTMLInputElement>) {
        Math.abs(parseInt(e.target.value) - timestamp) >= 1 &&
            audio.current.currentTime > 0 &&
            (audio.current.currentTime =
                (parseInt(e.target.value) / 100) * audio.current.duration);
    }

    function playNextTrack() {
        setPrevPlayingTrack(currentPlayingTrack);
        setCurrentPlayingTrack(nextTrack);

        tracks.map((track, index) => {
            if (track.id === currentPlayingTrack.id) {
                tracks[index + 2] && setNextPlayingTrack(tracks[index + 2]);
            }
        });
    }

    function playPrevTrack() {
        setNextPlayingTrack(currentPlayingTrack);
        setCurrentPlayingTrack(prevTrack);

        tracks.map((track, index) => {
            if (track.id === currentPlayingTrack.id) {
                tracks[index - 2] && setPrevPlayingTrack(tracks[index - 2]);
            }
        });
    }

    return (
        <>
            <Card className="bg-neutral sm:w-4/5 mx-auto absolute bottom-0 sm:bottom-[2%] right-0 left-0">
                <CardBody className="pb-3">
                    <div className="flex items-center gap-3 text-sm">
                        <span className="text-accent">{audioTimestamp()}</span>
                        <Slider
                            size="sm"
                            value={timestamp}
                            onChange={updateAudioCurrentTime}
                        />
                        <span className="text-accent">{audioDuration()}</span>
                    </div>
                </CardBody>
                <CardFooter className="pt-0 pb-2">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <TrackCover cover={currentPlayingTrack.cover} />
                        </div>
                        <div className="flex items-center">
                            {iconStates.isLiked ? likedIcon() : unlikedIcon()}
                            {iconStates.isShuffled
                                ? shuffleIcon()
                                : unShuffleIcon()}
                            <IconButton
                                variant="text"
                                className="ml-5"
                                onClick={playPrevTrack}
                            >
                                <i className="fas fa-backward-step" />
                            </IconButton>
                            {iconStates.isPlaying ? pauseIcon() : playIcon()}
                            <IconButton variant="text" onClick={playNextTrack}>
                                <i className="fas fa-forward-step" />
                            </IconButton>
                        </div>
                        <div className="flex items-center gap-2">
                            <Slider
                                size="sm"
                                value={(volume * 100).toString()}
                                onChange={(e) =>
                                    onChangeVolume(
                                        parseInt(e.target.value) / 100
                                    )
                                }
                                className="min-w-[100px]"
                            />
                            {changeVolumeIcon(volume)}
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </>
    );
}
