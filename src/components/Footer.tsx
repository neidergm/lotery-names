
const Footer = () => {
    return (
        // <div className="text-center text-white bg-gray-800/10 p-5 w-full mt-5">
        <div className="sm:p-3 w-full pt-0 max-w-screen">
            <div className="text-center text-white bg-gray-800/10 py-5 px-2 sm:px-5 sm:rounded-2xl">
                {/* <div className="flex flex-col w-full h-fit" data-darkreader-inline-bgcolor="" data-darkreader-inline-color=""> */}
                <div className="flex gap-3 sm:gap-5 xl:gap-20 justify-center items-center">
                    {/* <div className="flex flex-col gap-2 justify-center"> */}
                    <div>
                        <div className="flex items-center sm:gap-3 md:gap-4 select-none flex-col sm:flex-row">
                            <div className="w-10 md:w-auto">
                                <img alt="RaffleNG" src="/raffleng-logo.svg" width="80" />
                            </div>
                            <div>
                                <p className="text-xl md:text-4xl font-extrabold ">RaffleNG</p>
                                <p className="opacity-50 font-semibold text-sm">Created by NG</p>
                                <p className="opacity-50 mt-3 text-xs text-nowrap">
                                    &copy; {new Date().getFullYear()} - All rights reserved
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="border-r border-gray-500/40 h-24"></div>
                    {/* <div> */}
                    <div className="flex items-center xl:gap-4 text-gray-300 text-nowrap flex-wrap h-fit">
                        <a href="#" className="hover:bg-white/10 hover:text-white rounded-xl p-2 sm:px-4">How it works</a>
                        <a href="#" className="hover:bg-white/10 hover:text-white rounded-xl p-2 sm:px-4">About the game</a>
                        <a href="#" className="hover:bg-white/10 hover:text-white rounded-xl p-2 sm:px-4">Privacy Policy</a>
                    </div>
                    {/* </div> */}
                </div>
                {/* <div className="w-full border-t border-gray-500 my-8"></div> */}
                {/* <div className="text-center"> &copy; {new Date().getFullYear()} - All rights reserved</div> */}
            </div>
            {/* </div> */}
        </div>
    )
}

export default Footer
