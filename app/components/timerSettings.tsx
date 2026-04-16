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

export default function TimerSettings({ isBreak, setIsBreak, fixedTimer, setFixedTimer, timer, setTimer, isActive, setIsActive }: TimerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [studyMinutes, setStudyMinutes] = useState(Math.floor(fixedTimer/60));
    const [studySeconds, setStudySeconds] = useState(fixedTimer%60);
    const [breakMinutes, setBreakMinutes] = useState(5);
    const [breakSeconds, setBreakSeconds] = useState(0);

    const BreakTimer = (e?: React.FormEvent) => {
        if(e) e.preventDefault();
        const breakTimer = (Number(breakMinutes*60)+Number(breakSeconds));
        if(isBreak) {
            setFixedTimer(breakTimer);
            setTimer(breakTimer);
        }
        setIsActive(false);
        setIsOpen(false);
    };

    const StudyTimer = (e?: React.FormEvent) => {
        if(e) e.preventDefault();
        const studyTimer = (Number((studyMinutes*60))+Number(studySeconds));
        setFixedTimer(studyTimer);
        if(!isBreak) {
            setFixedTimer(studyTimer);
            setTimer(studyTimer);
        }
        setIsActive(false);
        setIsOpen(false);
    };

    useEffect(() => {
        const studyTimer = (Number((studyMinutes*60))+Number(studySeconds));
        const breakTimer = (Number(breakMinutes*60)+Number(breakSeconds));
        if(!isBreak && timer === 0) {
            setTimer(breakTimer);
            setIsBreak(true);
            setIsActive(false);
        } else if(isBreak && timer === 0) {
            setTimer(studyTimer);
            setIsBreak(false);
            setIsActive(false);
        }
    }, [timer]);

    useEffect(() => {
        const studyTimer = (Number((studyMinutes*60))+Number(studySeconds));
        const breakTimer = (Number(breakMinutes*60)+Number(breakSeconds));
        if(isBreak)
            setFixedTimer(breakTimer);
        else
            setFixedTimer(studyTimer);
    },[isBreak]);

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Settings</button>
            {isOpen && (
                <div className="modal-overlay">
                <div className="modal-content">
                    <h1>Timer Settings</h1>
                    <form onSubmit={StudyTimer}>
                        <label>Set Study Timer:</label>
                        <div className='input-row'>
                            <input 
                                type='number'
                                min={0}
                                max={60}
                                value={studyMinutes.toString().padStart(2,'0')}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (val.length <= 2 || Number(val) <= 60) {
                                        setStudyMinutes(Number(val));
                                    }
                                }} 
                                placeholder='Minutes'
                            />
                            <h2>:</h2>
                            <input 
                                type='number' 
                                min={0}
                                max={59}
                                value={studySeconds.toString().padStart(2,'0')}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (val.length <= 2 || Number(val) <= 59) {
                                        setStudySeconds(Number(val));
                                    }
                                }} 
                                placeholder='Seconds'
                            />
                        </div>
                        <button type='submit'>Change Timer</button>
                    </form>
                    <form onSubmit={BreakTimer}>
                        <label>Set Break Timer:</label>
                        <div className='input-row'>
                            <input 
                                type='number'
                                min={0}
                                max={60}
                                value={breakMinutes.toString().padStart(2,'0')}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (val.length <= 2 || Number(val) <= 60) {
                                        setBreakMinutes(Number(val));
                                    }
                                }} 
                                placeholder='Minutes'
                            />
                            <h2>:</h2>
                            <input 
                                type='number' 
                                min={0}
                                max={59}
                                value={breakSeconds.toString().padStart(2,'0')}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (val.length <= 2 || Number(val) <= 59) {
                                        setBreakSeconds(Number(val));
                                    }
                                }} 
                                placeholder='Seconds'
                            />
                        </div>
                        <button type='submit'>Change Timer</button>
                    </form>
                    <br/>
                    <button onClick={() => setIsOpen(false)}>Close</button>
                </div>
                </div>
            )}

            <style jsx>{`
                h2 {
                    color: white;
                    font-size: 2rem;
                }
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.75);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    backdrop-filter: blur(8px);
                }

                .modal-content {
                    background: #1a1a1a;
                    padding: 40px;
                    border-radius: 24px;
                    text-align: center;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    width: 100%;
                    max-width: 400px;
                }

                h1 {
                    color: #ffffff;
                    font-size: 2rem;
                    margin-bottom: 2rem;
                    padding: 20px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 15px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                form {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 30px;
                }

                /* This container holds the two inputs side-by-side */
                .input-group {
                    display: flex;
                    gap: 10px;
                    justify-content: center;
                }

                label {
                    color: #e0e0e0;
                    font-size: 1.1rem;
                    font-weight: 500;
                }

                input {
                    background: #2a2a2a;
                    border: 1px solid #444;
                    color: white;
                    padding: 12px;
                    border-radius: 10px;
                    width: 70px; /* Specific width for minutes/seconds */
                    font-size: 1.2rem;
                    text-align: center;
                    font-family: monospace;
                }

                input:focus {
                    outline: none;
                    border-color: #667eea;
                    background: #333;
                }

                /* Specific button styling for the modal */
                button {
                    cursor: pointer;
                    transition: all 0.2s;
                }

                button[type='submit'] {
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    color: white;
                    padding: 10px 25px;
                    border-radius: 20px;
                    text-transform: uppercase;
                    font-size: 0.8rem;
                    letter-spacing: 1px;
                }

                button[type='submit']:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: translateY(-2px);
                }

                .close-btn {
                    background: none;
                    border: 1px solid #444;
                    color: #888;
                    padding: 8px 30px;
                    border-radius: 20px;
                    margin-top: 10px;
                }

                .close-btn:hover {
                    color: white;
                    border-color: white;
                }
                .input-row {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px; /* Space between the two boxes */
                    margin: 10px 0;
                }

                .input-row span {
                    color: white;
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                form {
                    display: flex;
                    flex-direction: column; /* Keeps label on top and button on bottom */
                    align-items: center;
                    margin-bottom: 30px;
                }

                input {
                    width: 80px; /* Fixed width so they look like squares */
                    height: 60px;
                    background: #2a2a2a;
                    border: 1px solid #444;
                    border-radius: 12px;
                    color: white;
                    font-size: 1.5rem;
                    text-align: center;
                    font-family: 'Courier New', monospace;
                }
            `}</style>
        </div>
    );
}