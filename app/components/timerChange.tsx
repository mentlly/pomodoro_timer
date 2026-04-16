"use client";
import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import ReactMarkdown from 'react-markdown';

interface TimerProps {
    isBreak: boolean,
    setIsBreak: Dispatch<SetStateAction<boolean>>
};

export default function TimerChange ({ isBreak , setIsBreak}: TimerProps) {
    return (
        <div>
            <div className='button-row'>
                <button type='button' onClick={() => setIsBreak(false)}>Study</button>
                <button type='button' onClick={() => setIsBreak(true)}>Break</button>
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
}