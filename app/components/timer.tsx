"use client";
import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import ReactMarkdown from 'react-markdown';

interface TimerProps {
    isBreak: boolean,
    setIsBreak: Dispatch<SetStateAction<boolean>>,
    fixedTimer: number,
    setFixedTimer: Dispatch<SetStateAction<number>>,
    timer: number,
    setTimer: Dispatch<SetStateAction<number>>,
    isActive: boolean,
    setIsActive: Dispatch<SetStateAction<boolean>>
};

export default function Timer({ isBreak, setIsBreak, fixedTimer, setFixedTimer, timer, setTimer, isActive, setIsActive }: TimerProps) {

    const formatTime = (time: number) => {
        const minutes = Math.floor(time/60);
        const seconds = time%60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    };

    const resetTimer = () => {
        setTimer(fixedTimer);
        setIsActive(false);
    };

    const toggleTimer = () => {
        setIsActive(prev => !prev);
    };

    //Start and Pause Button and interval
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
            <div className='button-row'>
                <button type='button' onClick={toggleTimer}>{isActive? 'Pause': 'Start'}</button>
                <button type='button' onClick={resetTimer}>Reset</button>
            </div>
            <style jsx>{`
                .button-row {
                    display: flex;
                    flex-direction: row; /* This forces the horizontal line */
                    justify-content: center;
                    align-items: center;
                    gap: 15px; /* Adjust this for more/less space between buttons */
                    margin-top: 10px;
                    width: 100%;
                }

                /* Ensure the buttons don't stretch weirdly */
                .button-row button {
                    min-width: 120px;
                    margin: 0; /* Clear any old margins that might interfere */
                }
            `}</style>
        </div>
    );
};