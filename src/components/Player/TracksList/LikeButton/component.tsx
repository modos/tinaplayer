import { IconButton } from '@material-tailwind/react';
import { memo } from 'react';

interface Props {
    isLiked: boolean;
    onValueChanged: (isLiked: boolean) => void;
}
export const LikeButton = memo(({ isLiked, onValueChanged }: Props) => {
    const likedIcon = () => {
        return (
            <IconButton
                className="hidden sm:block"
                onClick={() => onValueChanged(false)}
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
                onClick={() => onValueChanged(true)}
                variant="text"
                color="red"
            >
                <i className="fa-regular fa-heart" />
            </IconButton>
        );
    };

    return <>{isLiked ? likedIcon() : unlikedIcon()}</>;
});
