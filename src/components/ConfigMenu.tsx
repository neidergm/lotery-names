import { IoChevronBack, IoChevronForward, IoHomeOutline, IoSpeedometerOutline, IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5"
import { PiAlignLeft, PiAlignLeftSimple } from "react-icons/pi"
import { useConfigStore } from "../store/configStore"
import { ParticipantsStyle } from "../interfaces/config.interface"
import { useParticipantsStore } from "../store/participantsStore"
import Tooltip from "./Tooltip"
import { useRoundStore } from "../store/roundStore"

const ConfigMenu = () => {
    const {
        sound,
        participantsAnimationSpeed,
        participantsStyle,
        showList,
        setShowList,
        setSound,
        setParticipantsStyle,
        setParticipantsAnimationDuration,
    } = useConfigStore();

    const { setParticipantsReady } = useParticipantsStore()
    const { roundIsCompleted } = useRoundStore()

    const participantsStyleObject = {
        [ParticipantsStyle.INLINE]: <PiAlignLeftSimple size={23} />,
        [ParticipantsStyle.UP_DOWN]: <PiAlignLeft size={23} className="rotate-x-180" />,
        [ParticipantsStyle.DOWN_UP]: <PiAlignLeft size={23} />
    }

    const speedObject: { [key: number]: string } = { 0.6: '1x', 0.4: '2x', 0.2: '3x' }

    const changeStyle = () => {
        switch (participantsStyle) {
            case ParticipantsStyle.INLINE:
                return setParticipantsStyle(ParticipantsStyle.UP_DOWN)
            case ParticipantsStyle.UP_DOWN:
                return setParticipantsStyle(ParticipantsStyle.DOWN_UP)
            default:
                setParticipantsStyle(ParticipantsStyle.INLINE)
        }
    }

    const changeSpeed = () => {
        switch (participantsAnimationSpeed) {
            case 0.6:
                return setParticipantsAnimationDuration(0.4)
            case 0.4:
                return setParticipantsAnimationDuration(0.2)
            default:
                setParticipantsAnimationDuration(0.6)
        }
    }

    const changeListVisibility = () => setShowList(!showList)

    return (
        <div className="text-gray-700 flex flex-col gap-2 bg-gray-200 rounded-xl py-3 px-1 shadow-2xl">

            {!roundIsCompleted && <><Tooltip content="Go back to lobby" >
                <div
                    className="p-1 rounded-lg hover:bg-gray-300 cursor-pointer"
                    onClick={() => setParticipantsReady(false)}
                >
                    <IoHomeOutline size={23} />
                </div>
            </Tooltip>
                <div className="border-t border-gray-300 w-full rounded-xl"></div>
            </>}
            <Tooltip content={sound ? "Volume off" : "Volume on"} >
                <div
                    className="p-1 rounded-lg hover:bg-gray-300 cursor-pointer"
                    onClick={() => setSound(!sound)}
                >
                    {sound ? <IoVolumeHighOutline size={23} /> : <IoVolumeMuteOutline size={23} />}
                </div>
            </Tooltip>
            <Tooltip content={"Toggle list aligment"} >
                <div
                    className="p-1 rounded-lg hover:bg-gray-300 cursor-pointer"
                    onClick={changeStyle}
                >
                    {participantsStyleObject[participantsStyle]}
                </div>
            </Tooltip>
            <Tooltip content={`Change animation speed`} >
                <div
                    className="p-1 rounded-lg hover:bg-gray-300 cursor-pointer relative pb-2"
                    onClick={changeSpeed}>
                    <IoSpeedometerOutline size={23} />
                    <span className="font-bold text-[0.55rem] absolute bottom-0 left-0 text-center w-full rounded-lg px-1">
                        {speedObject[participantsAnimationSpeed]}
                    </span>
                </div>
            </Tooltip>
            <Tooltip className="hidden! lg:inline-block!" content={showList ? `Hide participants list` : "Show participants list"} >
                <div
                    className="p-1 rounded-lg hover:bg-gray-300 cursor-pointer"
                    onClick={changeListVisibility}>
                    {showList ? <IoChevronBack size={23} /> : <IoChevronForward size={23} />}
                </div>
            </Tooltip>
        </div>
    )
}

export default ConfigMenu