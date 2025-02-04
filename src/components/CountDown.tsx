import clsx from 'clsx'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { IoPause, IoPlay } from 'react-icons/io5'
import { useRoundStore } from '../store/roundStore'
import { RoundStatus } from '../interfaces/round.interface'
import { useConfigStore } from '../store/configStore'

type CountDownProps = {
    onComplete?: VoidFunction
}

export const CountDown = ({ onComplete }: CountDownProps) => {

    const { roundIsPaused, roundIsCompleted, setRoundStatus } = useRoundStore()
    const { timer } = useConfigStore()

    const togglePlaying = () => {
        setRoundStatus(roundIsPaused ? RoundStatus.STARTED : RoundStatus.PAUSED)
    }

    return (
        <div>
            {!roundIsCompleted &&
                <label className="text-3xl text-black/50 cursor-pointer select-none place-self-end block">
                    <input
                        type="checkbox"
                        checked={!roundIsPaused}
                        onChange={togglePlaying}
                        className="hidden peer"
                    />
                    <IoPlay className={`play peer-checked:hidden animate-[keyframes-fill_0.3s] animate-bounce`} />
                    <IoPause className={`pause hidden peer-checked:block! animate-[keyframes-fill_0.3s]`} />
                </label>
            }
            <CountdownCircleTimer
                colors={['#fff', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
                strokeWidth={20}
                trailColor='#ffffff50'

                isPlaying={!roundIsPaused}
                duration={timer}
                // trailStrokeWidth={10}
                onComplete={() => {
                    onComplete?.()
                }}
            >
                {({ remainingTime }) =>
                    <div className={
                        clsx(
                            'text-6xl font-poetsen',
                            { "animate-ping text-7xl": !roundIsPaused && (remainingTime <= 3 && remainingTime > 0) }
                        )
                    }>
                        <div className='pb-2'>
                            {remainingTime}
                        </div>
                    </div>

                }
            </CountdownCircleTimer>
        </div>
    )
}
