"use client";
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Timer from './components/timer'
import TimerSettings from './components/timerSettings';

export default function page() {
  const [fixedTimer, setFixedTimer] = useState(25*60);
  const [timer, setTimer] = useState(fixedTimer);
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <div>
        <Timer 
        fixedTimer={fixedTimer}
        setFixedTimer={setFixedTimer}
        timer={timer}
        setTimer={setTimer}
        isActive={isActive}
        setIsActive={setIsActive}
        />
        <TimerSettings 
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