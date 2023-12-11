import { useState, useCallback, useRef } from 'react'
import viteLogo from '/vite.svg'
import UploadFile from './components/UploadFile';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

export type Participant = {
  Nombres: string;
  Apellidos: string;
}
const timer = 5;

function App() {

  const [selected, setSelected] = useState<Participant>();
  const [list, setList] = useState<Participant[]>();
  const [rounds, setRounds] = useState<Array<Participant[]>>([]);

  const [startTimer, setStartTimer] = useState(false);
  const [startSelection, setStartSelection] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval>>()

  const startRound = useCallback(() => {
    setStartSelection(true);

    if (list && list.length > 0) {
      intervalRef.current = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * list.length);
        setSelected(list[randomIndex]);
      }, 200)

      // setRounds(r => ({ ...r, [Object.keys(r).length + 1]: [list[randomIndex]] }))
      // return list[randomIndex];
    }
  }, [list])
  console.log(intervalRef)
  return (
    <div className='container-fluid'>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Sorteo</h1>
      {!list ?
        <div>
          <UploadFile callback={l => setList(l)} />
        </div>
        :
        <div className='row mt-5'>
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
          <div className='col-9'>
            <div className='card'>
              <div className='card-body'>
                <div className='mb-5'>
                  <h4>Ronda {rounds.length + 1}</h4>
                  <div className='my-3'>
                    <div className="row g-3 align-items-center">
                      <div className="col-auto">
                        <label htmlFor="limit" className="col-form-label">Participantes a elegir</label>
                      </div>
                      <div className="col-auto">
                        <input id="limit" className="form-control" type='number' min={1} defaultValue={1} />
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className='mt-5'>
                  <div>
                    <button className='btn btn-dark' onClick={() => startRound()}>Iniciar ronda  {rounds.length + 1}</button>

                    <div className='row align-items-center'>
                      <div className='col-6'>
                        <h2>{selected?.Nombres} {selected?.Apellidos}</h2>
                      </div>

                      <div className='col-6'>
                        <CountdownCircleTimer
                          key={`${intervalRef.current}`}
                          isPlaying={startSelection}
                          duration={timer}
                          colors={['#50cb29', '#004777', '#F7B801', '#A30000']}
                          colorsTime={[5, 3, 1, 0]}
                          strokeWidth={20}
                          onComplete={() => {
                            clearInterval(intervalRef.current)
                          }}
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
      }
      {/* {!!list && <div className="card">
        {
          Object.entries(rounds).map(([round, list]) => {
            return <div>
              <b>Ronda {round}</b>
              <ol>
                {list?.map(i => <li>{i.Nombres} {i.Apellidos}</li>)}
              </ol>
            </div>
          })
        }
      </div>} */}

      {/* <div className="card">
        <button>
          INICIAR
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </div>
  )
}

export default App
