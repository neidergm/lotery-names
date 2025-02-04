import React, { useCallback, useEffect, useRef } from 'react';
import { useConfigStore } from "../store/configStore";
import clsx from "clsx";
import { ParticipantsStyle } from "../interfaces/config.interface";

interface Props {
    participants: string[][];
}

const NamesList: React.FC<Props> = ({ participants }) => {

    const { participantsAnimationSpeed, participantsStyle } = useConfigStore();
    const SECONDS_PER_ITEM = participantsAnimationSpeed;

    const namesListContainerRef = useRef<HTMLDivElement>(null);
    const namesSeparatorRef = useRef<HTMLDivElement>(null);

    const isListHigherThanScreen = () => {
        const listHeight = namesListContainerRef.current?.clientHeight || 0;
        const screenHeight = window.innerHeight;
        return (listHeight - namesSeparatorRef.current!.clientHeight) / 2 > screenHeight;
    }

    const checkHeight = useCallback((): void => {
        const animatedClass = 'lg:animate-[auto-desplazing-names_linear_infinite]';
        const higher = isListHigherThanScreen();
        const container = namesListContainerRef.current;
        const separator = namesSeparatorRef.current;

        if (!container) return;

        const hasAnimated = container.classList.contains(animatedClass);

        if (higher && !hasAnimated) {
            container.classList.add(animatedClass);
            separator?.classList.add("hidden");
        } else if (!higher && hasAnimated) {
            container.classList.remove(animatedClass);
            separator?.classList.remove("hidden");
        }
    }, []);

    const printNames = useCallback(() => {
        return participants.map((p, index) => (
            <div
                key={`${p[0]}-${index}`}
                className="flex items-center hover:bg-gray-100/20"
            >
                <p className="px-6 py-2 truncate">
                    <span className={clsx(
                        "pe-2 font-semibold text-2xl text-gray-200",
                        { "block": participantsStyle !== ParticipantsStyle.INLINE },
                    )}>
                        {p[participantsStyle === ParticipantsStyle.UP_DOWN ? 1 : 0]}
                    </span>
                    <span className="text-lg">{p[participantsStyle === ParticipantsStyle.UP_DOWN ? 0 : 1]}</span>
                </p>
            </div>
        ));
    }, [participants, participantsStyle]);

    useEffect(() => {
        checkHeight()
        window.addEventListener('resize', checkHeight);
        return () => {
            window.removeEventListener('resize', checkHeight);
        };
    }, [participants, participantsStyle]);

    const animationDuration = participants.length * SECONDS_PER_ITEM;

    return (
        <div
            className='pt-10'
            ref={namesListContainerRef}
            style={{ 'animationDuration': `${animationDuration}s` }}
        >
            {printNames()}
            <div className="h-screen" ref={namesSeparatorRef}></div>
            {printNames()}
        </div>
    );
};

export default NamesList;