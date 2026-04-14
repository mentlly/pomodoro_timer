"use client";
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Timer() {
    const [timer, setTimer] = useState(10);
    const [isActive, setIsActive] = useState(false);

    const toggleTimer = async () => {
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
            <h1>{timer}</h1>
            <button type='button' onClick={toggleTimer}>Start</button>
        </div>
    );
};