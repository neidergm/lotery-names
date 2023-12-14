import { useState, useRef, ChangeEvent, useEffect } from 'react'
import UploadFile from './components/UploadFile';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Confetti from 'react-confetti'
import ConfettiExplosion from 'react-confetti-explosion';

export type Participant = {
  Nombres: string;
  Apellidos: string;
  __rowNum__: number;
  id: number;
}

function App() {

  const [selected, setSelected] = useState<Participant>();
  const [list, setList] = useState<Participant[]>();
  const [timer, setTimer] = useState(30)

  const [startSelection, setStartSelection] = useState(false);

  const listRef = useRef<Participant[]>([])
  const listContainerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()
  const playRef = useRef(new Audio("play.mp3"))
  const playingRef = useRef(new Audio("playing2.mp3"))
  const winnerRef = useRef(new Audio("winner.mp3"))

  const handleTimer = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setTimer(val)
  }

  const completedCounter = () => {
    clearInterval(intervalRef.current);

    const idx = listRef.current.findIndex(i => i.id === selected?.id)
    listRef.current.splice(idx, 1)

    setStartSelection(false);

    playingRef.current.currentTime = 0;
    playingRef.current.pause();
    winnerRef.current.play();
  }

  const restart = () => {
    clearInterval(intervalRef.current);
    setSelected(undefined);
    setStartSelection(false);

    playingRef.current.currentTime = 0;
    playingRef.current.pause();
    winnerRef.current.currentTime = 0;
    winnerRef.current.pause();
  }

  const initParticipantSelection = () => {
    playRef.current.play();
    playingRef.current.play();
    winnerRef.current.currentTime = 0;
    winnerRef.current.pause();

    setStartSelection(true);
    startRound()
  }

  const startRound = (_list = listRef.current) => {
    if (_list && _list.length > 0) {
      intervalRef.current = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * _list.length);
        setSelected(_list[randomIndex]);
      }, 250)
    }
  }

  useEffect(() => {
    playingRef.current.loop = true
  }, [])

  useEffect(() => {
    if (list) {
      listRef.current = [...list]
    }
  }, [list])

  useEffect(() => {
    setTimeout(() => {
      if (list?.length) {
        const h = listContainerRef.current?.offsetHeight;
        const parent_h = listContainerRef.current?.parentElement?.offsetHeight;

        if (h! > parent_h!) {
          listContainerRef.current!.style.animation = `smoothScroll ${list.length * 0.35}s linear infinite alternate`;
        } else {
          listContainerRef.current?.parentElement?.classList.add("d-flex", "align-items-center")
        }
      }
    }, 500);
  }, [startSelection, list])

  return (
    <>
      <div className='bg-header'></div>
      {!!selected && !startSelection && <>
        <Confetti />
        <div className='d-flex justify-content-around'>
          <ConfettiExplosion force={1} zIndex={2} />
          <ConfettiExplosion force={1} zIndex={2} />
        </div>
      </>}

      {!!list && <>
        <div className='position-fixed overflow-hidden text-white animate-top'>
          {!startSelection && <div ref={listContainerRef}>
            {list.map(i => <div className='text-uppercase text-truncate' key={i.id}>{i.Nombres}
              <p className='text-truncate opacity-75'>{i.Apellidos}</p>
            </div>)
            }
          </div>}
        </div>
        <button className='m-2 btn-sm btn btn-danger position-absolute top-0 end-0' onClick={() => restart()}>Reiniciar</button>
      </>}

      <div className='container pb-3'>
        {
          !list ?
            <div className='d-flex align-items-center justify-content-center flex-column'>
              <p className='text-white small'>
                Seleccione un archivo Excel que contenga dos columnas: "Nombres" y "Apellidos"
              </p>
              <div className='card rounded-5 p-5 pb-4'>
                <div className='card-body p-5'>
                  <UploadFile callback={l => {
                    setList(l)
                  }} />

                  <div className="text-center mt-5">
                    <label htmlFor="timer" className="col-form-label">Tiempo (segundos)</label>
                    <input
                      id="timer" placeholder='3'
                      className="form-control text-center mx-auto" type='number'
                      min={3}
                      style={{ width: "150px" }}
                      onChange={handleTimer}
                      value={timer}
                    />
                  </div>
                </div>
              </div>
            </div>
            :
            <>
              <div>
                <div className='card py-4 px-md-3 rounded-5 main-game'>
                  <div className='card-body'>
                    <div className=''>
                      <div>
                        <div className='row text-center'>
                          {selected && <div className='col-12 text-center'>
                            <h1 className='text-truncate text-uppercase' style={{ fontWeight: 800, fontSize: "60px" }}>
                              {selected?.Nombres}
                            </h1>
                            <h1 className='text-uppercase text-truncate opacity-75' style={{ fontWeight: 600, fontSize: "50px" }}>
                              {selected?.Apellidos}
                            </h1>
                          </div>}
                          <div className='col-12'>
                            <div className='d-flex justify-content-center my-5'>
                              {startSelection ? <>
                                <CountdownCircleTimer
                                  key={`${intervalRef.current}`}
                                  isPlaying={startSelection}
                                  duration={timer}
                                  colors={['#50cb29', '#004777', '#F7B801', '#A30000', "#000"]}
                                  colorsTime={[Math.floor(timer / 2), Math.floor(timer / 3), Math.floor(timer / 4), 2, 0]}
                                  strokeWidth={20}
                                  trailColor='#ffffff'
                                  onComplete={() => {
                                    completedCounter()
                                  }}
                                >
                                  {({ remainingTime, color }) => <h1 className="m-0" style={{ color, fontWeight: 800, fontSize: "60px" }}>{remainingTime}</h1>}
                                </CountdownCircleTimer>
                              </>
                                :
                                <button className='btn start-button btn-dark text-uppercase' onClick={() => initParticipantSelection()}>Iniciar</button>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
        }
      </div>
      <div className='bg-footer'></div>
    </>
  )
}

export default App
