'use client';

import React, { useEffect, useState } from 'react';

export default function OtpResendTimer() {
    const [timer, setTimer] = useState(30);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setIsButtonDisabled(false);
        }

        return () => clearInterval(interval);
    }, [timer]);

    const handleResendOtp = () => {
        setTimer(30);
        setIsButtonDisabled(true);
        console.log('OTP Resent');
    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleResendOtp}
                disabled={isButtonDisabled}
                className={`px-4 py-2 mt-7 text-base font-plus-jakarta-sans font-semibold md:mt-8 text-primary dark:text-white bg-transparent ${isButtonDisabled ? 'cursor-not-allowed' : ''
                    }`}
            >
                Resend OTP {isButtonDisabled && (<>
                    <span> in &nbsp;</span>
                    <span className='text-warning'>0:{timer < 10 ? `0${timer}` : timer} sec</span>
                </>)}
            </button>
        </div>
    );
}
