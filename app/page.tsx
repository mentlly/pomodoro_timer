"use client";
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Timer from './components/timer'
import TimerSettings from './components/timerSettings';

export default function page() {
  let globalTimer = 25*60;
  const [timer, setTimer] = useState(globalTimer);
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <div>
        <Timer 
        globalTimer={globalTimer}
        timer={timer}
        setTimer={setTimer}
        isActive={isActive}
        setIsActive={setIsActive}
        />
        <TimerSettings 
        globalTimer={globalTimer}
        timer={timer}
        setTimer={setTimer}
        isActive={isActive}
        setIsActive={setIsActive}
        />
      </div>
    </>
  );
}