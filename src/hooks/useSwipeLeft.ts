import { useEffect, useRef } from 'react';

const useSwipeLeft = (
    elementRef: React.RefObject<HTMLDivElement>,
    onSwipeLeft: () => void,
    onSwipeLeftEnd: () => void,
): void => {
    const startXRef = useRef<number | null>(null);

    useEffect(() => {
        const handleTouchStart = (event: TouchEvent): void => {
            startXRef.current = event.touches[0].clientX;
        };

        const handleTouchMove = (event: TouchEvent): void => {
            if (startXRef.current === null) return;

            const currentX = event.touches[0].clientX;
            const deltaX = startXRef.current - currentX;

            // Check if the swipe is towards the left and exceeds a threshold
            if (deltaX > 0 && deltaX > 100) {
                onSwipeLeft();
            }
        };

        const handleTouchEnd = (): void => {
            onSwipeLeftEnd();
            startXRef.current = null;
        };

        const element = elementRef.current;

        if (element) {
            element.addEventListener('touchstart', handleTouchStart);
            element.addEventListener('touchmove', handleTouchMove);
            element.addEventListener('touchend', handleTouchEnd);
        }

        return () => {
            if (element) {
                element.removeEventListener('touchstart', handleTouchStart);
                element.removeEventListener('touchmove', handleTouchMove);
                element.removeEventListener('touchend', handleTouchEnd);
            }
        };
    }, [elementRef, onSwipeLeft]);
};

export default useSwipeLeft;