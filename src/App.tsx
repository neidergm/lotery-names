import { Analytics } from '@vercel/analytics/react';
import Footer from "./components/Footer"
import Header from "./components/Header"
import NamesList from "./components/NamesList"
import PlayGround from "./components/PlayGround"
import { useParticipantsStore } from "./store/participantsStore"
import { useRoundStore } from "./store/roundStore"
import Lobby from "./components/Lobby"
import ConfigMenu from "./components/ConfigMenu"
import { useConfigStore } from "./store/configStore"
import clsx from "clsx"

function App() {
  const { roundIsStarted, roundIsCompleted } = useRoundStore()
  const { participantsReady, participants } = useParticipantsStore()
  const { showList } = useConfigStore()

  return (
    <>
      {!roundIsStarted && participantsReady &&
        // <div className="bg-white/30 backdrop-blur border-r border-white/30 w-72 h-screen overflow-hidden sticky top-0 left-0">
        <div className={clsx("h-screen sticky top-0 left-0 px-0", { "lg:p-3 pr-0!": showList })}>
          <div className={clsx(
            "absolute left-full p-3 pl-0 top-1/2 transform -translate-y-1/2 ms-3",
            { "lg:p-0": showList, "hidden lg:block": roundIsCompleted }
          )}>
            <ConfigMenu />
          </div>

          <div className={clsx(
            "bg-gray-800/50 backdrop-blur text-white/70 w-72 rounded-2xl overflow-hidden max-h-full transition-all",
            { "w-0!": !showList },
            "hidden lg:block font-poetsen"
          )
          }>
            <h3 className="w-full absolute z-1 text-center bg-blue-950 text-gray-300 py-2 shadow-2xl">
              {participants.length} Participants
            </h3>
            <NamesList participants={participants} />
          </div>
        </div>
      }

      <main className="flex flex-col min-h-screen grow gap-10 justify-between ">

        <div>
          <Header />
        </div>
        <div className="px-2 container mx-auto">
          {participantsReady ? <PlayGround /> : <Lobby />}
        </div>
        <div className="flex flex-col place-content-end">
          <Footer />
        </div>
      </main>
      <Analytics />
    </>
  )
}

export default App
