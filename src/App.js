import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import { getTlfData } from './services/getTlfData';
import { Badge } from './components/Badge';
import CycleHire from './components/CycleHire';

function App() {
  
  const [tlfData, setTlfData] = useState([]);
  const [lineStatus, setLineStatus] = useState('');
  const [disruptionReason, setDisruptionReason] = useState([]);
  const [isCycleHire, setIsCycleHire] = useState(false);

  useEffect(() => {
    getTlfData()
      .then(result => {

        function compare( a, b ) {
          return a.modeName.localeCompare(b.modeName) || b.name - a.name;
        }

        setTlfData(result.sort(compare))
      })
      .catch(error => error);
  }, [])

  const onLineClick = (e) => {
    const tlfLine = e.target.outerText;
    const lineData = tlfData.filter(line => line.name === tlfLine);
    console.log({lineData})
    const statusSeverity = lineData[0].lineStatuses.every(line => line.statusSeverity === 10)
    const isDisrupted = statusSeverity ? 'No service disruptions' : 'Service currently suffering disruptions';
    const disruptionReason = lineData[0].lineStatuses.map(line => line.reason) || [];

    setDisruptionReason(disruptionReason);
    setLineStatus(isDisrupted);
  }

  const onCycleHire = () => {
    setIsCycleHire(true);
  }

  return (
    <div className="App">
      <aside>
        <nav>
          {
            tlfData && tlfData.map((data, id) => {
              const isServiceTypeNight = data.serviceTypes.some(type => type.name === 'Night') ? 'fa fa-moon-o' : '';

              const statusSeverity = data.lineStatuses.every(status => status.statusSeverity === 10);

              const statusSeverityDescription = statusSeverity ? [] : data.lineStatuses.map(status => status.statusSeverityDescription)

              return <a key={id} href="#" title={`click here for ${data.name} info`}>
                  <span className='underground-line' onClick={onLineClick}>{data.name}</span>

                  <i className={isServiceTypeNight} aria-hidden="true" title={'operates in the evenings'}></i>
                  
                  {statusSeverityDescription.map((problem, id) => (
                    <Badge key={id} statusSeverityDescription={problem}/>
                  ))}
                
                </a>
            })
          }
          <a title={`click here for searching bike points`} onClick={onCycleHire}><span className="underground-line">Cycle Hire</span><i class="fa fa-search"></i></a>
        </nav>
      </aside>
      <div className='container'> 
        <section>
          {!isCycleHire ? (
            <Fragment>
              <header>
                <h4>{lineStatus}</h4>
              </header>
              <div>
                <ul>
                  {
                    disruptionReason.map((reason, id) => (
                      <li key={id} className='disruption-reason'>{reason}</li>
                    ))
                  }
                </ul>
              </div>
            </Fragment>
          ) : <CycleHire />
          }
        </section>
      </div>
    </div>
  );
}

export default App;
