import clsx from 'clsx'
import { useRef } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { IoPause, IoPlay } from 'react-icons/io5'
import { useGameStatus } from '../context/GameStatusContext'

type CountDownProps = {
    duration?: number,
    onComplete?: VoidFunction
}

export const CountDown = ({ duration = 10, onComplete }: CountDownProps) => {

    const { gameIsPaused, pauseGame } = useGameStatus()

    const lastValue = useRef(duration);

    const togglePlaying = () => {
        pauseGame(!gameIsPaused)
        lastValue.current = duration;
    }

    return (
        <div>
            {lastValue.current > 0 &&
                <label className="text-3xl text-black/50 cursor-pointer select-none place-self-end block">
                    <input
                        type="checkbox"
                        checked={!gameIsPaused}
                        onChange={togglePlaying}
                        className="hidden peer"
                    />
                    <IoPlay className={`play peer-checked:hidden animate-[keyframes-fill_0.3s]`} />
                    <IoPause className={`pause hidden peer-checked:block! animate-[keyframes-fill_0.3s]`} />
                </label>
            }
            <CountdownCircleTimer
                colors={['#fff', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
                strokeWidth={20}
                trailColor='#ffffff50'

                isPlaying={!gameIsPaused}
                duration={duration}
                // trailStrokeWidth={10}
                onComplete={(tet) => {
                    console.log('onComplete', tet)
                    lastValue.current = 0;
                    togglePlaying()
                    onComplete?.()
                }}
            >
                {({ remainingTime }) =>
                    <div className={
                        clsx(
                            'text-6xl font-bold',
                            { "animate-ping text-7xl": !gameIsPaused && (remainingTime <= 3 && remainingTime > 0) }
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
