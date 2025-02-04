
const Header = () => {
    return (
        <section className="xl:pt-10 md:pt-5 pt-6">
            <div className="flex gap-3 md:gap-6 justify-center flex-wrap items-center">
                <img
                    src="/raffleng-logo.svg"
                    // width={150}
                    alt="RaffleNG game"
                    className="md:w-36 sm:w-28 w-20"
                />
                <div>

                    <h1 className="text-center text-6xl sm:text-7xl md:text-9xl font-extrabold text-white filter drop-shadow-xl">
                        RaffleNG
                    </h1>
                    <div className="w-full text-center text-lg sm:text-xl md:text-2xl font-bold text-white opacity-70 mt-2">
                        Find a lucky winner
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header