
const Header = () => {
    return (
        <section className="xl:pt-10 pt-4">
            <div className="flex gap-6 justify-center flex-wrap">
                <img
                    src="/lottery-logo.svg"
                    width={150}
                    alt="Lottery game"
                />
                <h1 className="text-center text-9xl font-extrabold text-white filter drop-shadow-xl">
                    Lottery
                </h1>
                <div className="w-full text-center text-2xl font-bold text-white opacity-70">
                    Choose a lucky winner in few clicks
                </div>
            </div>
        </section>
    )
}

export default Header