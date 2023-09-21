import { memo } from 'react';

interface props {
    cover: Blob;
}
export const TrackCover = memo(({ cover }: props) => {
    const currentCover = cover ? URL.createObjectURL(cover) : '/mp3.png';
    return (
        <img
            className="w-[32px] h-[32px] sm:w-[48px] sm:h-[48px] rounded-lg object-cover object-center shadow-md shadow-blue-gray-900/50"
            src={currentCover}
            alt="nature image"
        />
    );
});
