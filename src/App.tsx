import Footer from "./components/Footer"
import Header from "./components/Header"
import NamesList from "./components/NamesList"
import PlayGround from "./components/PlayGround"
import { useGameStore } from "./store/roundStore"

function App() {
  const { roundIsStarted } = useGameStore()

  return (
    <>
      {!roundIsStarted &&
        // <div className="bg-white/30 backdrop-blur border-r border-white/30 w-72 h-screen overflow-hidden sticky top-0 left-0">
        <div className="p-3 h-screen sticky top-0 left-0">
         <div className="bg-gray-800/50 backdrop-blur text-white/70 w-72 rounded-2xl overflow-hidden max-h-full ">
          <NamesList />
         </div>
        </div>
      }
      <main className="flex flex-col min-h-screen grow gap-10 justify-between">
        <div>
          <Header />
        </div>
        <div>
          <PlayGround />
          {
            // TODO Screen to upload file of names or enter names
          }
        </div>
        <div className="flex flex-col place-content-end">
          <Footer />
        </div>
      </main>
    </>
  )
}

export default App
