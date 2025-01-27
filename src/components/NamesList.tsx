import { useEffect, useMemo, useRef } from "react";

const generateNames = (count: number) => {
    const baseNames = [
        "María García", "Juan Rodríguez", "Ana Martínez", "Carlos López",
        "Laura Sánchez", "José González", "Carmen Pérez", "Miguel Fernández"
    ];

    const result = [];
    for (let i = 0; i < count; i++) {
        result.push(`${i + 1} - ${baseNames[i % baseNames.length]}`);
    }
    return result;
};

const NamesList = () => {

    const namesListContainerRef = useRef<HTMLDivElement>(null);
    const namesSeparatorRef = useRef<HTMLDivElement>(null);
    const SECONDS_PER_ITEM = 0.3;

    const isListHigherThanScreen = () => {
        const listHeight = namesListContainerRef.current?.clientHeight || 0;
        const screenHeight = window.innerHeight;
        return (listHeight - namesSeparatorRef.current!.clientHeight) / 2 > screenHeight;
    }

    const checkHeight = () => {
        const animatedClass = 'animate-[auto-desplazing-names_linear_infinite]';
        const higher = isListHigherThanScreen();

        if (higher) {
            if (!namesListContainerRef.current?.classList.contains(animatedClass)) {
                namesListContainerRef.current?.classList.add(animatedClass)
                namesSeparatorRef.current?.classList.add("hidden")
            }
        } else {
            if (namesListContainerRef.current?.classList.contains(animatedClass)) {
                namesListContainerRef.current?.classList.remove(animatedClass)
                namesSeparatorRef.current?.classList.remove("hidden")
            }
        }
    }

    const names = useMemo(() => generateNames(15), []);

    const printNames = () => {
        return names.map((name, index) => (
            <div
                key={`${name}-${index}`}
                className="pl-8 h-12 flex items-center text-lg hover:bg-gray-100/20"
            >
                {name}
            </div>
        ))
    }


    useEffect(() => {
        checkHeight()
        window.addEventListener('resize', checkHeight);
        return () => {
            window.removeEventListener('resize', checkHeight);
        };
    }, [names]);

    const animationDuration = names.length * SECONDS_PER_ITEM;

    return (
        <div
            ref={namesListContainerRef}
            style={{ 'animationDuration': `${animationDuration}s` }}
        >
            {printNames()}
            <div className="h-screen" ref={namesSeparatorRef}></div>
            {printNames()}
        </div>
    );
};


export default NamesList