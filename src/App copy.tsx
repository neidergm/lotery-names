import { useState, useCallback, useRef, ChangeEvent, useEffect } from 'react'
// import viteLogo from '/vite.svg'
import UploadFile from './components/UploadFile';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Confetti from 'react-confetti'
import ConfettiExplosion from 'react-confetti-explosion';

import head_img from './assets/sorteo.png';
import money from './assets/monedas.png';

export type Participant = {
  Nombres: string;
  Apellidos: string;
  __rowNum__: number;
  id: number;
}

function App() {

  const [selected, setSelected] = useState<Participant>();
  const [list, setList] = useState<Participant[]>();
  const [currentRound, setCurrentRound] = useState<Participant[]>([]);
  const [rounds, setRounds] = useState<Array<Participant[]>>([]);
  const [limit, setLimit] = useState(1)
  const [timer, setTimer] = useState(5)

  const [startSelection, setStartSelection] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval>>()
  const listRef = useRef<Participant[]>([])

  const handleLimit = (e: ChangeEvent<HTMLInputElement>) => {
    let val = Number(e.target.value);

    if (val > list!.length) {
      val = list!.length - 1;
    } else if (val < 1) {
      val = 1;
    }

    setLimit(val)
  }
  const handleTimer = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setTimer(val)
  }

  const completedCounter = () => {
    clearInterval(intervalRef.current);

    let other = false;

    setCurrentRound(cr => {
      other = cr.length < limit - 1
      return [...cr, selected!]
    })

    // setList(l => {
    //   l!.splice(selected!.id, 1)
    //   return [...l!];
    // })

    const idx = listRef.current.findIndex(i => i.id === selected?.id)
    listRef.current.splice(idx, 1)

    if (other) {
      setTimeout(() => { startRound(listRef.current) }, 1500);
    } else {
      setStartSelection(false);
      setTimeout(() => {
        if (limit !== 1) { setSelected(undefined); }
        setRounds(r => [...r, currentRound])

      }, 1500);
    }
  }

  const restart = () => {
    clearInterval(intervalRef.current);
    setSelected(undefined);
    setRounds([]);
    setCurrentRound([]);
    setStartSelection(false);
  }

  const initParticipantSelection = () => {
    if (currentRound.length) {
      setCurrentRound(cr => {
        setList(cr)
        return []
      });
    }

    if (limit === listRef.current.length) {
      setLimit(l => l--)
    }

    setStartSelection(true);
    startRound()
  }

  const startRound = (_list = listRef.current) => {
    console.log(_list)

    if (_list && _list.length > 0) {
      intervalRef.current = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * _list.length);
        setSelected(_list[randomIndex]);
      }, 250)
    }
  }

  useEffect(() => {
    if (list) {
      listRef.current = [...list]
    }
  }, [list])

  // console.table(rounds)

  return (
    <>
      <div className='bg-header'></div>

      <div className='container pb-3'>
        {!!selected && !startSelection && <>
          {/* <h1 className='position-absolute text-break pt-5 ps-5 text-white text-bold' style={{ width: "10px" }}>FELICIDADES</h1> */}
          <Confetti />
        </>
        }
        {
          !list ?
            <div className='d-flex align-items-center justify-content-center flex-column' style={{ height: "70vh" }}>
              <p className='text-white small'>
                Seleccione un archivo Excel que contenga dos columnas: "Nombres" y "Apellidos"
              </p>
              <div className='card rounded-5 p-5'>
                <div className='card-body p-5'>
                  <UploadFile callback={l => {
                    setList(l)
                    setRounds([l])
                  }} />
                </div>
              </div>
            </div>
            :
            <>
              <button className='m-2 btn-sm btn btn-danger position-absolute top-0 end-0' onClick={() => restart()}>Reiniciar</button>

              <div>
                <div className='row'>
                  <div className='col-3'></div>
                  <div className='col-6'>
                    {/* <div className='card pb-2 px-md-3 rounded-5 mb-5 radius-top-0'>
                  <div className='card-body'>
                    <h1 className='text-center fw-bold gradient-text'>Se inicia el sorteo</h1>
                    <div className='mb-2'>
                      <h5 className='mb-3 text-center opacity-75'>{list.length} participantes</h5>
                      <div className='my-3 pt-3'>
                        <div className="row g-3 align-items-center">
                          <div className="col-6 text-center">
                            <label htmlFor="limit" className="col-form-label">Participantes a elegir</label>
                            <input
                              id="limit" placeholder='1'
                              className="form-control mx-auto text-center" type='number'
                              min={1}
                              style={{ width: "150px" }}
                              onChange={handleLimit}
                              value={limit}
                            />
                          </div>
                          <div className="col-6 text-center">
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
                  </div>
                </div> */}
                    <div className='card py-4 px-md-3 rounded-5'>
                      <div className='card-body'>
                        <div className='my-5'>
                          <div>
                            <div className='row text-center'>
                              {selected && <div className='col-12 pb-5 text-center'>
                                {!startSelection && <>
                                  <ConfettiExplosion />
                                </>
                                }
                                <h2 className='text-truncate' style={{ fontWeight: 800 }}>{selected?.Nombres} {selected?.Apellidos}</h2>
                              </div>}
                              <div className='col-12'>
                                <div className='d-flex justify-content-center'>
                                  {startSelection ? <CountdownCircleTimer
                                    key={`${intervalRef.current}`}
                                    isPlaying={startSelection}
                                    duration={timer}
                                    colors={['#50cb29', '#004777', '#F7B801', '#A30000']}
                                    colorsTime={[5, 3, 1, 0]}
                                    strokeWidth={20}
                                    trailColor='#ffffff'
                                    onComplete={() => {
                                      completedCounter()
                                    }}
                                  >
                                    {({ remainingTime, color }) => <h1 className="m-0" style={{ color, fontWeight: 800, fontSize: "60px" }}>{remainingTime}</h1>}
                                  </CountdownCircleTimer>
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

                  <div className='col'>
                    {limit > 1 &&
                      <div>
                        <p>
                          Elegidos:
                        </p>
                        <ol>
                          {currentRound.map((p, i) => <li key={`selected-${p.id}-${i}`}>{p.Nombres} {p.Apellidos}</li>)}
                        </ol>
                      </div>
                    }
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
