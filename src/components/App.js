import { useState, useEffect, useRef } from 'react';

const App = () => {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const startTimer = () => {
    if (!running) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 10);
      setRunning(true);
    }
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const lapTimer = () => {
    setLaps([...laps, time]);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setLaps([]);
    setRunning(false);
  };

  const formatTime = time => {
    const pad = num => (num < 10 ? '0' + num : num);
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time / 100) % 60);
    const centiseconds = time % 100;
    return `${pad(minutes)}:${pad(seconds)}:${pad(centiseconds)}`;
  };

  return (
    <div>
      <div>{formatTime(time)}</div>
      <button onClick={running ? stopTimer : startTimer}>{running ? 'Stop' : 'Start'}</button>
      <button onClick={lapTimer} disabled={!running}>Lap</button>
      <button onClick={resetTimer}>Reset</button>
      <ul>
        {laps.map((lap, index) => (
          <li key={index}>{formatTime(lap)}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
