import { useEffect, useRef } from 'react';

export function useSwipeRight (
    elementRef: React.RefObject<HTMLDivElement>,
    onSwipeRight: () => void,
): void {
    const startXRef = useRef<number | null>(null);

    useEffect(() => {
        const handleTouchStart = (event: TouchEvent): void => {
            startXRef.current = event.touches[0].clientX;
        };

        const handleTouchMove = (event: TouchEvent): void => {
            if (startXRef.current === null) return;

            const currentX = event.touches[0].clientX;
            const deltaX = currentX - startXRef.current;

            // Check if the swipe is towards the right and exceeds a threshold
            if (deltaX > 0 && deltaX > 100) {
                onSwipeRight();
            }
        };

        const handleTouchEnd = (): void => {
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
    }, [elementRef, onSwipeRight]);
}