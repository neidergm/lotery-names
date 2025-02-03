
const Footer = () => {
    return (
        // <div className="text-center text-white bg-gray-800/10 p-5 w-full mt-5">
        <div className="p-3 w-full pt-0">
            <div className="text-center text-white bg-gray-800/10 p-5 rounded-2xl">
                {/* <div className="flex flex-col w-full h-fit" data-darkreader-inline-bgcolor="" data-darkreader-inline-color=""> */}
                <div className="flex gap-3 sm:gap-7 xl:gap-20 justify-center items-center">
                    {/* <div className="flex flex-col gap-2 justify-center"> */}
                    <div>
                        <div className="flex items-center gap-4 select-none">
                            <div>
                                <img alt="Lottery" src="/lottery-logo.svg" width="80" />
                            </div>
                            <div>
                                <p className="text-4xl font-extrabold ">Lottery</p>
                                <p className="opacity-50 font-semibold text-sm">Created by NG</p>
                                <p className="opacity-50 mt-3 text-xs text-nowrap">
                                    &copy; {new Date().getFullYear()} - All rights reserved
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="border-r border-gray-500/40"></div>
                    {/* <div> */}
                    <div className="flex items-center xl:gap-4 text-gray-300 text-nowrap flex-wrap ">
                        <a href="#" className="hover:bg-white/10 hover:text-white rounded-xl py-2 px-4">How it works</a>
                        <a href="#" className="hover:bg-white/10 hover:text-white rounded-xl py-2 px-4">About the game</a>
                        <a href="#" className="hover:bg-white/10 hover:text-white rounded-xl py-2 px-4">Privacy Policy</a>
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

// const Footer = () => {
//     return (
//         <div className="text-center text-white bg-gray-800 p-5 bg-opacity-85 w-full">
//             <div>
//                 {/* Ads place */}
//             </div>
//             <div>
//                 How it works
//                 How to use
//                 Create a lottery with a few clicks
//             </div>
//             <div>
//                 &copy; lottery, {new Date().getFullYear()} all rights reserved
//                 Created by NG
//             </div>
//         </div>
//     )
// }

// export default Footer