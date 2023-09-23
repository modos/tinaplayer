import { memo } from 'react';

interface props {
    cover: Blob;
}
export const TrackCover = memo(({ cover }: props) => {
    const currentCover = cover ? URL.createObjectURL(cover) : '/mp3.png';
    return (
        <div className="w-[48px] h-[48px] mb-1">
            <img
                className="rounded-lg object-cover object-center shadow-md shadow-blue-gray-900/50"
                src={currentCover}
                alt="nature image"
            />
        </div>
    );
});
