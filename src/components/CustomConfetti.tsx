import { useEffect, useState } from 'react';
import Conf from 'react-confetti'

const CustomConfetti = () => {

    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const updateDimensions = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        window.addEventListener('resize', updateDimensions)

        return () => window.removeEventListener('resize', updateDimensions)
    }, []);

    return (
        <Conf {...dimensions} />
    )
}

export default CustomConfetti