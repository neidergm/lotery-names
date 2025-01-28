
const Header = () => {
    return (
        <section className="xl:pt-10 pt-4">
            <div className="flex gap-6 justify-center flex-wrap">
                <img
                    src="/lottery-logo.svg"
                    width={150}
                    alt="Lottery game"
                />
                <div>

                    <h1 className="text-center text-9xl font-extrabold text-white filter drop-shadow-xl">
                        Lottery
                    </h1>
                    <div className="w-full text-center text-2xl font-bold text-white opacity-70 mt-2">
                        Find a lucky winner
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header