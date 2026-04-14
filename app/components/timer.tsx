"use client";
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Timer() {
    const [timer, setTimer] = useState(25*60);
    const [isActive, setIsActive] = useState(false);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time/60);
        const seconds = time%60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    };

    const toggleTimer = () => {
        setIsActive(prev => !prev);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if(isActive && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev-1);
            }, 1000);
        }
        return () => {
            if(interval) {
                clearInterval(interval);
            }
        };
    },[isActive, timer]);

    return (
        <div>
            <h1>{formatTime(timer)}</h1>
            <button type='button' onClick={toggleTimer}>Start</button>
        </div>
    );
};