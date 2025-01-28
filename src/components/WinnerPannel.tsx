import { useEffect, useState } from "react"
import clsx from "clsx"
import { useGameStore } from "../store/roundStore"
import { useParticipantsStore } from "../store/participantsStore"
import { randomParticipant } from "../helpers/randomParticipant"

const WinnerPannel = () => {

    const { roundIsPaused, roundIsStarted } = useGameStore()
    const { currentWinner, participants, setCurrentWinner } = useParticipantsStore()
    const [participant, setParticipant] = useState<typeof currentWinner>()

    useEffect(() => {
        console.log({ roundIsPaused, roundIsStarted, participant })

        if (!roundIsPaused) {
            const interval = setInterval(() => {
                const part = randomParticipant(participants)

                if (roundIsStarted) {
                    setParticipant(part)
                } else {
                    setCurrentWinner(part)
                    clearInterval(interval)
                }
            }, 700)

            return () => clearInterval(interval)
        }
    }, [roundIsPaused, participants, roundIsStarted])

    return (
        <div
            className={clsx(
                "relative overflow-hidden winner-name-card rounded-3xl bg-gray-100/50 backdrop-blur max-w-2xl mx-auto mt-8 min-h-40 flex items-center justify-center"
                ,
                { "before:content-none!": roundIsPaused }
            )}
        >
            {currentWinner ?
                <div>
                    The winner is
                    {currentWinner.name}
                </div>
                :
                <div className="text-5xl font-bold text-gray-200">
                    {roundIsPaused ?
                        <div>
                            Paused
                        </div>
                        :
                        <div>
                            {participant?.name}
                        </div>}
                </div>}
        </div>
    )
}

export default WinnerPannel