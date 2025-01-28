import { useEffect, useRef } from "react";
import { useParticipantsStore } from "../store/participantsStore";

const NamesList = () => {

    const { participants } = useParticipantsStore();

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

    const printNames = () => {
        return participants.map((p, index) => (
            <div
                key={`${p.name}-${index}`}
                className="pl-8 h-12 flex items-center text-lg hover:bg-gray-100/20"
            >
                {p.name}
            </div>
        ))
    }


    useEffect(() => {
        checkHeight()
        window.addEventListener('resize', checkHeight);
        return () => {
            window.removeEventListener('resize', checkHeight);
        };
    }, [participants]);

    const animationDuration = participants.length * SECONDS_PER_ITEM;

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