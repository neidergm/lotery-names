import useAudio from "../hooks/useAudio"
import { RoundStatus } from "../interfaces/round.interface"
import { useRoundStore } from "../store/roundStore"
import { CountDown } from "./CountDown"
import PlayButton from "./PlayButton"
import TimerField from "./TimerField"
import WinnerPannel from "./WinnerPannel"

const PlayGround = () => {

    const { roundIsStarted, setRoundStatus, roundIsCompleted } = useRoundStore()
    const audio = useAudio('/play.mp3')

    const handlePlay = () => {
        setRoundStatus(RoundStatus.STARTED)
        audio.play()
    }

    return (
        <div>
            <div>
                <div className="flex justify-center">
                    {!roundIsCompleted &&
                        (roundIsStarted ?
                            <CountDown onComplete={() => { setRoundStatus(RoundStatus.COMPLETED) }} />
                            :
                            <div className="text-center">
                                <PlayButton onClick={handlePlay} />
                                <TimerField />
                            </div>
                        )
                    }
                </div>

                {(roundIsStarted || roundIsCompleted) && <WinnerPannel />}
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