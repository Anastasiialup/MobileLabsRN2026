import React, { createContext, useState, useEffect } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [score, setScore] = useState(0);
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    // Стан завдань (п. 2.2 методички)
    const [challenges, setChallenges] = useState({
        taps: { count: 0, target: 10, done: false, text: 'Натиснути 10 разів' },
        doubleTaps: { count: 0, target: 5, done: false, text: 'Подвійний клік 5 разів' },
        longPress: { done: false, text: 'Утримувати 3 секунди' },
        drag: { done: false, text: 'Перетягнути об’єкт' },
        swipeRight: { done: false, text: 'Свайп вправо' },
        swipeLeft: { done: false, text: 'Свайп вліво' },
        pinch: { done: false, text: 'Змінити розмір (Pinch)' },
        score100: { done: false, text: 'Отримати 100 очок' },
        custom: { done: false, text: 'Танцюючий бантик (Власне завдання)' }, // Власне завдання (п. 2.2)
        shake: { done: false, text: 'Потрусити телефон (Акселерометр)' },
        pinchSmall: { done: false, text: 'Зробити бантик крихітним' },
        pinchBig: { done: false, text: 'Зробити бантик величезним' },
        tripleTap: { count: 0, target: 3, done: false, text: 'Потрійний клік 3 рази' },
        stayStill: { done: false, text: 'Не рухати бантик 5 секунд' }
    });

    const updateChallenge = (key, value = true) => {
        setChallenges(prev => ({
            ...prev,
            [key]: typeof prev[key] === 'object' && 'count' in prev[key]
                ? { ...prev[key], count: prev[key].count + 1, done: prev[key].count + 1 >= prev[key].target }
                : { ...prev[key], done: value }
        }));
    };

    useEffect(() => {
        if (score >= 100 && !challenges.score100.done) updateChallenge('score100');
    }, [score]);

    return (
        <GameContext.Provider value={{ score, setScore, challenges, updateChallenge, isDarkTheme, setIsDarkTheme }}>
            {children}
        </GameContext.Provider>
    );
};
