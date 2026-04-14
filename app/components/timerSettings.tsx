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

export default function TimerSettings({ globalTimer, timer, setTimer, isActive, setIsActive }: TimerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const ChangeTimer = () => {
        setIsOpen(false);
        setTimer((minutes*60)+seconds);
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
                            value={minutes}
                            onChange={(e) => setMinutes(Number(e.target.value))}
                            placeholder='Minutes'
                        />
                        <input 
                            type='number' 
                            value={seconds}
                            onChange={(e) => setSeconds(Number(e.target.value))} 
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