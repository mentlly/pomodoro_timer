"use client";
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Timer from './components/timer'
import TimerSettings from './components/timerSettings';

export default function page() {
  const [isBreak, setIsBreak] = useState(false);
  const [fixedTimer, setFixedTimer] = useState(25*60);
  const [timer, setTimer] = useState(fixedTimer);
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <h1>{isBreak ? "Break" : "Study"}</h1>
      <div>
        <Timer 
        isBreak={isBreak}
        setIsBreak={setIsBreak}
        fixedTimer={fixedTimer}
        setFixedTimer={setFixedTimer}
        timer={timer}
        setTimer={setTimer}
        isActive={isActive}
        setIsActive={setIsActive}
        />
        <TimerSettings
        isBreak={isBreak}
        setIsBreak={setIsBreak}
        fixedTimer={fixedTimer}
        setFixedTimer={setFixedTimer}
        timer={timer}
        setTimer={setTimer}
        isActive={isActive}
        setIsActive={setIsActive}
        />
      </div>
    </>
  );
}