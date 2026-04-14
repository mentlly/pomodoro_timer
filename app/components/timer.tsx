"use client";
import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import ReactMarkdown from 'react-markdown';

interface TimerProps {
    globalTimer: number,
    timer: number,
    setTimer: Dispatch<SetStateAction<number>>,
    isActive: boolean,
    setIsActive: Dispatch<SetStateAction<boolean>>
};

export default function Timer({ globalTimer, timer, setTimer, isActive, setIsActive }: TimerProps) {

    const formatTime = (time: number) => {
        const minutes = Math.floor(time/60);
        const seconds = time%60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    };

    const resetTimer = () => {
        setTimer(globalTimer);
        setIsActive(false);
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
            <button type='button' onClick={toggleTimer}>{isActive? 'Pause': 'Start'}</button>
            <button type='button' onClick={resetTimer}>Reset</button>
        </div>
    );
};