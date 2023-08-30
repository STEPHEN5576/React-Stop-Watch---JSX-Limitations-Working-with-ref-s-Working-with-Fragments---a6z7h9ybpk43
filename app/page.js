import React, { useRef, useState } from 'react';

function Home() {
  const startTime = useRef(0);
  const intervalRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);

  const start = () => {
    if (!intervalRef.current) {
      startTime.current = Date.now() - currentTime;
      intervalRef.current = setInterval(() => {
        setCurrentTime(Date.now() - startTime.current);
      }, 10);
    }
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const lap = () => {
    if (intervalRef.current) {
      setLaps((prevLaps) => [...prevLaps, currentTime]);
    }
  };

  const reset = () => {
    stop();
    setCurrentTime(0);
    setLaps([]);
  };

  return (
    <div id="main">
      <section>
        <h1 className='seconds-elapsed'>Stopwatch Time: {currentTime / 1000} seconds</h1>
        <section className='buttons'>
          <button className="start-btn" onClick={start}>START</button>
          <button className="stop-btn" onClick={stop}>STOP</button>
          <button className="lap-btn" onClick={lap}>LAP</button>
          <button className="reset-btn" onClick={reset}>RESET</button>
        </section>
      </section>
      <section className='lap-section'>
        <h2>Laps</h2>
        <section className='laps'>
          {laps.map((lapTime, index) => (
            <p key={index}>{(lapTime / 1000).toFixed(2)} seconds</p>
          ))}
        </section>
      </section>
    </div>
  );
}

export default Home;
