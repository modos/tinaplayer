import { useState, useEffect } from 'react';

export function useScreenSize(): boolean {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = (): void => {
            setIsDesktop(window.innerWidth >= 960); // Adjust the threshold as per your needs
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Initial check on component mount
        handleResize();

        // Clean up the event listener
        return (): void => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isDesktop;
}