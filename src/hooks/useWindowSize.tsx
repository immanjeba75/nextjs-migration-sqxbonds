import React from 'react'
import { isClient } from '@/utils/isClient'

const useWindowSize = () => {
    const [windowSize, setWindowSize] = React.useState({
        width: isClient() ? window.innerWidth : 0,
        height: isClient() ? window.innerHeight : 0,
    });

    React.useEffect(() => {
        if (!isClient()) {
            return;
        }

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}

export default useWindowSize