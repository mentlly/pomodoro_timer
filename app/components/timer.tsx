"use client";
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Timer() {
    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const countDownTimerStart = async () => {
        setIsActive(true);
    };

    useEffect(() => {
        if(isActive) {
            setTimer(timer+1);
        }
    },[isActive, timer]);

    return (
        <div>
            <h1>{timer}</h1>
            <button type='button' onClick={countDownTimerStart}>Start</button>
        </div>
    );
};