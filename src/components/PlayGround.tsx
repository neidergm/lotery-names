import { CountDown } from "./CountDown"
import { useGameStatus } from "../context/GameStatusContext"
import PlayButton from "./PlayButton"
import TimerField from "./TimerField"
import clsx from "clsx"

const PlayGround = () => {

    const { gameIsStarted, startGame, gameIsPaused } = useGameStatus()

    const handlePlay = () => {
        startGame(true)
    }

    return (
        <div>
            <div>
                <div className="flex justify-center">
                    {
                        gameIsStarted ?
                            <CountDown onComplete={() => startGame(false)} />
                            :
                            <div className="text-center">
                                <PlayButton onClick={handlePlay} />
                                <TimerField />
                            </div>
                    }
                </div>

                <div
                    className={clsx(
                        "relative overflow-hidden winner-name-card rounded-3xl bg-gray-100/50 backdrop-blur max-w-2xl mx-auto mt-8 min-h-40 flex items-center justify-center"
                        ,
                        { "before:content-none!": gameIsPaused }
                    )}
                >
                    <div className="text-5xl font-bold text-gray-200">
                        {gameIsPaused ?
                            <div>
                                Paused
                            </div>
                            :
                            <div>
                                Neider Galofre
                            </div>}
                    </div>
                </div>
            </div>
            <div>
                <div>
                    {
                        //TODO Menu options 
                    }
                </div>
                <div>
                    {
                        // TODO Ads side 
                    }
                </div>
            </div>

        </div >
    )
}

export default PlayGround