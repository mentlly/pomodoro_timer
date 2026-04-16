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
        setFixedTimer(breakTimer);
        if(isBreak) {
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
                        <button type='submit'>Change Timer</button>
                    </form>
                    <form onSubmit={BreakTimer}>
                        <label>Set Break Timer:</label>
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