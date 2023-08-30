'use client'
import React, { useRef, useState } from 'react'

function Home() {
  const startTime = useRef(0);
  const intervalRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = (time % 1000).toFixed(3);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds}`;
  };

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
        <h1 className='seconds-elapsed'>Stopwatch Time: {formatTime(currentTime)}</h1>
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
            <p key={index}>{formatTime(lapTime)}</p>
          ))}
        </section>
      </section>
    </div>
  )
}

export default Home

