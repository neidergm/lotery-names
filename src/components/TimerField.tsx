import { PiTimerBold } from "react-icons/pi"

const TimerField = () => {
    return (
        <div className="mt-10 text-center bg-white rounded-xl py-2 px-4 grid text-gray-600">
            <label htmlFor="time" className="font-semibold text-gray-400 row-span-2 self-center pr-3">
                <PiTimerBold className="inline" size={20} /> TIMER
            </label>
            <input type="number" id="time"
                min={5}
                max={120}
                defaultValue={10}
                className="min-w-10 outline-0 col-start-2 text-center pl-2 font-bold"
            />
            <span className="text-sm col-start-2 text-center font-semibold">Seconds</span>
        </div>
    )
}

export default TimerField