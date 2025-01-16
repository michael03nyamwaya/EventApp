"use client";
import React, { useEffect, useState } from 'react';

const Timer = ({ event }) => {
    // Parse the event date and time
    const evenDate = new Date(`${event.date}T${event.hour}`);

    const [timeRemaining, setTimeRemaining] = useState(evenDate - new Date());

    useEffect(() => {
        // Set up interval to update the countdown every second
        const timerId = setInterval(() => {
            const now = new Date();
            const timeLeft = evenDate - now;

            if (timeLeft <= 0) {
                clearInterval(timerId); // Clear interval when event time has passed
                setTimeRemaining(0); // Set time remaining to 0
            } else {
                setTimeRemaining(timeLeft); // Update remaining time
            }
        }, 1000);

        // Cleanup interval on component unmount or when event date changes
        return () => clearInterval(timerId);
    }, [evenDate]);

    if (timeRemaining <= 0) {
        return <div>Event has already passed</div>;
    }

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return (
        <div className="flex flex-wrap gap-4">
            <div className="text-center border-[3px] border-accent w-[100px] h-[100px] rounded-full flex items-center justify-center">
                <div>
                    <div className="text-3xl font-semibold">{days}</div>
                    <div className="text-sm uppercase font-medium">Days</div>
                </div>
            </div>

            <div className="text-center border-[3px] border-accent w-[100px] h-[100px] rounded-full flex items-center justify-center">
                <div>
                    <div className="text-3xl font-semibold">{hours}</div>
                    <div className="text-sm uppercase font-medium">Hours</div>
                </div>
            </div>

            <div className="text-center border-[3px] border-accent w-[100px] h-[100px] rounded-full flex items-center justify-center">
                <div>
                    <div className="text-3xl font-semibold">{minutes}</div>
                    <div className="text-sm uppercase font-medium">Minutes</div>
                </div>
            </div>

            <div className="text-center border-[3px] border-accent w-[100px] h-[100px] rounded-full flex items-center justify-center">
                <div>
                    <div className="text-3xl font-semibold">{seconds}</div>
                    <div className="text-sm uppercase font-medium">Seconds</div>
                </div>
            </div>
        </div>
    );
};

export default Timer;
