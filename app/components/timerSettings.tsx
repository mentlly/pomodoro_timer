"use client";
import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import ReactMarkdown from 'react-markdown';

interface TimerProps {
    fixedTimer: number,
    setFixedTimer: Dispatch<SetStateAction<number>>,
    timer: number,
    setTimer: Dispatch<SetStateAction<number>>,
    isActive: boolean,
    setIsActive: Dispatch<SetStateAction<boolean>>
};

export default function TimerSettings({ fixedTimer, setFixedTimer, timer, setTimer, isActive, setIsActive }: TimerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [minutes, setMinutes] = useState(Math.floor(fixedTimer/60));
    const [seconds, setSeconds] = useState(fixedTimer%60);

    const ChangeTimer = () => {
        const newFixedTimer = (Number((minutes*60))+Number(seconds));
        setFixedTimer(newFixedTimer);
        setTimer(newFixedTimer);
        setIsActive(false);
        setIsOpen(false);
    };

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Settings</button>
            {isOpen && (
                <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Timer Settings</h2>
                    <form onSubmit={ChangeTimer}>
                        <label>Set Custom Timer:</label>
                        <input 
                            type='number'
                            min={0}
                            max={60}
                            value={minutes.toString().padStart(2,'0')}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val.length <= 2 || Number(val) <= 60) {
                                    setMinutes(Number(val));
                                }
                            }} 
                            placeholder='Minutes'
                        />
                        <input 
                            type='number' 
                            min={0}
                            max={59}
                            value={seconds.toString().padStart(2,'0')}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val.length <= 2 || Number(val) <= 59) {
                                    setSeconds(Number(val));
                                }
                            }} 
                            placeholder='Seconds'
                        />
                        <button type='submit'>Change Timer</button>
                    </form>
                    <br/>
                    <button onClick={() => setIsOpen(false)}>Close</button>
                </div>
                </div>
            )}

            <style jsx>{`
                .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5); /* Dim the background */
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                }
                .modal-content {
                background: white;
                padding: 2rem;
                border-radius: 8px;
                text-align: center;
                }
            `}</style>
        </div>
    );
}