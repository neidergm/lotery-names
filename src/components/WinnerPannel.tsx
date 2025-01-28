import { useEffect, useRef, useState } from "react"
import clsx from "clsx"
import { useRoundStore } from "../store/roundStore"
import { useParticipantsStore } from "../store/participantsStore"
import { randomParticipant } from "../helpers/randomParticipant"
import { IoArrowBack } from "react-icons/io5"
import { useConfigStore } from "../store/configStore"
import ConfettiExplosion from "react-confetti-explosion"

const WinnerPannel = () => {

    const { roundIsPaused, roundIsCompleted, resetRoundStatus } = useRoundStore()
    const { currentWinner, participants, setCurrentWinner } = useParticipantsStore()
    const { randomMilisecondsTime } = useConfigStore()

    const [participant, setParticipant] = useState<typeof currentWinner>()
    const randomIntervalRef = useRef<ReturnType<typeof setInterval>>()

    const goBack = () => {
        setCurrentWinner()
        resetRoundStatus()
    }

    useEffect(() => {
        if (roundIsPaused) {
            clearInterval(randomIntervalRef.current)
        } else {
            if (!currentWinner) {
                randomIntervalRef.current = setInterval(() => {
                    const part = randomParticipant(participants)
                    setParticipant(part)
                }, randomMilisecondsTime)
            }
        }

        return () => clearInterval(randomIntervalRef.current)
    }, [roundIsPaused, participants])

    useEffect(() => {
        if (roundIsCompleted) {
            clearInterval(randomIntervalRef.current)
            setCurrentWinner(participant)
        }
    }, [roundIsCompleted])

    if (roundIsCompleted) {
        return <>
            <div className="relative rounded-3xl bg-white/40 backdrop-blur-xl max-w-2xl mx-auto border border-white/15 mt-10">
                <span className="absolute font-extrabold -top-10 left-24 text-5xl -rotate-3 py-3 px-9 bg-white rounded-2xl text-gray-800 shadow">
                    ¡WINNER!
                </span>
                <div className="flex items-center justify-center min-h-40 relative">
                    <ConfettiExplosion
                        key={"conf-1"}
                        force={0.8}
                        duration={6000}
                        particleCount={250}
                        width={1600}
                        className="absolute top-0 left-0"
                    />
                    <ConfettiExplosion
                        className="absolute top-0 right-0"
                        key={"conf-2"}
                        force={0.8}
                        duration={6000}
                        particleCount={250}
                        width={1600}
                    />
                    <p className="text-5xl font-bold text-white mt-4 text-center px-4 py-10">
                        {currentWinner ? currentWinner.name : "The winner is..."}
                    </p>
                </div>
            </div>
            <div>
                <button
                    onClick={goBack}
                    className="flex items-center gap-2 mx-auto mt-7 px-4 py-2 text-white bg-blue-500 rounded-lg font-bold hover:bg-blue-950 "
                >
                    <IoArrowBack size={25} /> Go back
                </button>
            </div>
        </>
    }

    return (
        <div
            className={clsx(
                "relative overflow-hidden winner-name-card rounded-3xl bg-gray-100/50 backdrop-blur max-w-2xl mx-auto mt-8 min-h-40 flex items-center justify-center"
                ,
                { "before:content-none!": roundIsPaused || roundIsCompleted }
            )}
        >
            <div className="text-5xl font-bold text-gray-200">
                {roundIsPaused ?
                    <div className="animate-pulse">Paused</div>
                    :
                    <div>{participant?.name}</div>
                }
            </div>
        </div>
    )
}

export default WinnerPannel