"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti"

export function Confetti() {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
        startVelocity: 30,
        speed: 360,
        zIndex: 0
    };

    function randomImage(min: number, max: number) {
        return Math.random() * (max - min) + min
    };

    const handleConfetti = () => {
        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval)
            };

            const particleCount = 50 * (timeLeft / duration);

            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: {
                        x: randomImage(0.1, 0.3),
                        y: Math.random() - 0.2
                    }
                })
            );
            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: {
                        x: randomImage(0.7, 0.9),
                        y: Math.random() - 0.2
                    }
                })
            );
        }, 250);
    };

    useEffect(() => {
        handleConfetti()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return null;
}