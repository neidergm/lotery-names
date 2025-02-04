
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
                <div className="font-poetsen">
                    <h1 className="text-center text-6xl sm:text-7xl md:text-8xl font-extrabold text-white filter drop-shadow-xl">
                        RaffleNG
                    </h1>
                    <h2 className="w-full text-center text-lg sm:text-xl md:text-2xl text-white opacity-70 mt-2">
                        Find a lucky winner
                    </h2>
                </div>
            </div>
        </section>
    )
}

export default Header