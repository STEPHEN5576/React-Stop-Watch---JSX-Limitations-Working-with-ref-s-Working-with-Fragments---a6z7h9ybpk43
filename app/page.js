"use client";
import React, { useEffect, useRef, useState } from "react";

function Home() {
  const startTime = useRef(0);
  const intervalRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);

  const start = () => {
    startTime.current = Date.now();
    intervalRef.current = setInterval(() => {
      setCurrentTime(Date.now());
    }, 10);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
  };
  const reset = () => {
    clearInterval(intervalRef.current);
    setCurrentTime(0);
    startTime.current = 0;
    setLaps([]);
  };
  const lap = () => {
    setLaps([...laps, ((currentTime - startTime.current) / 1000).toFixed(3)]);
  };

  return (
    <div id="main">
      <section>
        <h1 className="seconds-elapsed">
          {((currentTime - startTime.current) / 1000).toFixed(3)}
        </h1>
        <section className="buttons">
          <button className="start-btn" onClick={start}>
            START
          </button>
          <button className="stop-btn" onClick={stop}>
            STOP
          </button>
          <button className="lap-btn" onClick={lap}>
            LAP
          </button>
          <button className="reset-btn" onClick={reset}>
            RESET
          </button>
        </section>
      </section>
      {laps.length >= 1 && (
        <section className="lap-section">
          <h2>Laps</h2>
          <section className="laps">
            {laps?.map((value) => {
              return <p>{value}</p>;
            })}
          </section>
        </section>
      )}
    </div>
  );
}

export default Home;
