import { IoPlay } from 'react-icons/io5'

type PlayButtonProps = {
    onClick: VoidFunction
}

const PlayButton = ({ onClick }: PlayButtonProps) => {
    return (
        <div className="relative inline-block z-0">
            <button className="
    rounded-full bg-gray-900 font-bold text-white transition-all duration-300 ease-linear p-5
    before:bg-blue-200  before:absolute  before:origin-center before:-translate-y-1/2 before:translate-x-1/2 before:animate-ping before:rounded-full
    hover:bg-white hover:text-blue-900 hover:border-gray-300 hover:before:bg-blue-800
    size-48 
    before:top-1/2 
    before:right-1/2
    before:-z-10
    z-20
    cursor-pointer
    border-3
   border-b-gray-200
    not-hover:before:h-2/3 not-hover:before:w-2/3
    hover:translate-y-[-0.5rem]
    hover:shadow-2xl!
    group
"
                onClick={onClick}
            >
                <span className="text-6xl group-hover:block hidden" >
                    <IoPlay className="size-30 ml-5 text-gray-900" />
                </span>
                <span className="group-hover:hidden">
                    <span className="block mb-4 text-3xl font-extrabold">
                        PLAY
                    </span>
                    <span>
                        ¡Pick a random winner!
                    </span>
                </span>
            </button>
        </div>
    )
}

export default PlayButton