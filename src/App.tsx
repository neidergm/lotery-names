import { useState, useCallback, useRef, ChangeEvent } from 'react'
import viteLogo from '/vite.svg'
import UploadFile from './components/UploadFile';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

export type Participant = {
  Nombres: string;
  Apellidos: string;
}
const timer = 3;

function App() {

  const [selected, setSelected] = useState<Participant>();
  const [list, setList] = useState<Participant[]>();
  const [currentRound, setCurrentRound] = useState<Participant[]>([]);
  const [rounds, setRounds] = useState<Array<Participant[]>>([]);
  const [limit, setLimit] = useState(1)

  const [startSelection, setStartSelection] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval>>()

  const handleLimit = (e: ChangeEvent<HTMLInputElement>) => {
    let val = Number(e.target.value);

    if (val > list!.length) {
      val = list!.length - 1;
    } else if (val < 1) {
      val = 1;
    }

    setLimit(val)
  }

  const completedCounter = async () => {
    clearInterval(intervalRef.current);

    let other = false;

    setCurrentRound(cr => {
      // const lastRound = r[lastIdx];
      cr.push(selected!)

      if (cr.length < limit) {
        other = true
      } else {
        other = false;
      }
      return [...cr]
    })

    setStartSelection(false);
    if (other) {
      startRound()
    }
  }

  const initParticipantSelection = () => {
    setRounds(r => [...r, currentRound])
    setCurrentRound([])
    startRound()
  }

  const startRound = useCallback(() => {
    if (list && list.length > 0) {
      setStartSelection(true);
      intervalRef.current = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * list.length);
        setSelected(list[randomIndex]);
      }, 200)
    }
  }, [list])

  // console.table(rounds)

  return (
    <div className='container-fluid py-5'>
      <div className='d-flex gap-4 align-items-center'>
        <div>
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </div>
        <h1>Sorteo</h1>
      </div>
      <div className='mt-5'></div>
      {!list ?
        <div className='d-flex align-items-center justify-content-center flex-column' style={{ height: "70vh" }}>
          <p className='opacity-50 small'>
            Seleccione un archivo Excel que contenga dos columnas: "Nombres" y "Apellidos"
          </p>
          <div className='card rounded-5 p-5'>
            <div className='card-body p-5'>
              <UploadFile callback={l => setList(l)} />
            </div>
          </div>
        </div>
        :
        <div className='row'>
          <div className='col-3'>

            {list && <>
              <p>
                Participantes: {list.length}
              </p>
              <ol>
                {list.map((participant, idx) => (
                  <li key={`participant-${idx}`}>
                    {participant.Nombres} {participant.Apellidos}
                  </li>
                ))}
              </ol>
            </>
            }
          </div>

          <div className='col-6'>
            <div className='card py-4 px-md-3 rounded-5'>
              <div className='card-body'>
                <div className='mb-5'>
                  <h4>Ronda {rounds.length}</h4>
                  <div className='my-3 pt-3'>
                    <div className="row g-3 align-items-center">
                      <div className="col-auto">
                        <label htmlFor="limit" className="col-form-label">Participantes a elegir</label>
                      </div>
                      <div className="col-auto">
                        <input
                          id="limit" placeholder='1'
                          className="form-control text-center" type='number'
                          min={1} defaultValue={1}
                          style={{ width: "100px" }}
                          onChange={handleLimit}
                          value={limit}
                        />
                      </div>
                      <div className="col-auto text-end flex-grow-1">
                        {!startSelection &&
                          <button className='btn btn-dark' onClick={() => initParticipantSelection()}>Iniciar ronda</button>
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className='mt-5'>
                  <div>
                    <div className='row text-center'>
                      <div className='col-12 mb-5'>
                        <h2 className='text-truncate'>{selected?.Nombres} {selected?.Apellidos}</h2>
                      </div>

                      <div className='col-12'>
                        <div className='d-flex justify-content-center'>
                          <CountdownCircleTimer
                            key={`${intervalRef.current}`}
                            isPlaying={startSelection}
                            duration={timer}
                            colors={['#50cb29', '#004777', '#F7B801', '#A30000']}
                            colorsTime={[5, 3, 1, 0]}
                            strokeWidth={20}
                            onComplete={() => { completedCounter() }}
                          >
                            {({ remainingTime, color }) => <h1 className="m-0" style={{ color }}>{remainingTime}</h1>}
                          </CountdownCircleTimer>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col'>
            {/* {rounds.length > 1 && */}
            <div>
              <p>
                Elegidos:
              </p>
              <ol>
                {currentRound.map((p, i) => <li key={i}>{p.Nombres} {p.Apellidos}</li>)}
              </ol>
            </div>
            {/* } */}
          </div>
        </div>
      }
    </div>
  )
}

export default App
