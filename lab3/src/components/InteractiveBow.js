import React, { useContext, useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
import { GestureDetector, Gesture, Directions } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
    runOnJS
} from 'react-native-reanimated';
import { Accelerometer } from 'expo-sensors';
import { GameContext } from '../context/GameContext';
import styled from 'styled-components/native';

const RoundWrapper = styled(Animated.View)`
    width: 200px;
    height: 200px;
    border-radius: 100px;
    background-color: #ffffff;
    justify-content: center;
    align-items: center;
    border-width: 4px;
    border-color: #db7093;
    overflow: hidden;
    elevation: 15;
`;

const StyledImage = styled(Animated.Image)`
    width: 100%;
    height: 100%;
    border-radius: 100px;
`;

export default function InteractiveBow() {
    const { setScore, updateChallenge } = useContext(GameContext);

    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const timerRef = useRef(null);

    // Функція для очок (викликаємо ТІЛЬКИ через runOnJS)
    const handlePoints = (points, challengeKey) => {
        setScore(prev => prev + points);
        if (challengeKey) updateChallenge(challengeKey);

        // Скидання таймера спокою
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            updateChallenge('stayStill');
        }, 5000);
    };

    useEffect(() => {
        // Початковий запуск таймера
        timerRef.current = setTimeout(() => {
            updateChallenge('stayStill');
        }, 5000);
        return () => clearTimeout(timerRef.current);
    }, []);

    // Акселерометр
    useEffect(() => {
        const subscription = Accelerometer.addListener(({ x, y, z }) => {
            const acceleration = Math.sqrt(x*x + y*y + z*z);
            if (acceleration > 3) {
                runOnJS(handlePoints)(0, 'shake');
                scale.value = withSpring(1.2, {}, () => { scale.value = withSpring(1); });
            }
        });
        Accelerometer.setUpdateInterval(100);
        return () => subscription.remove();
    }, []);

    // 1. Свайп ВПРАВО (фіксований рух)
    const swipeRight = Gesture.Fling()
        .direction(Directions.RIGHT)
        .onStart(() => {
            translateX.value = withTiming(80, { duration: 150 }, () => {
                translateX.value = withSpring(0);
            });
            runOnJS(handlePoints)(10, 'swipeRight');
        });

    // 2. Свайп ВЛІВО (Танцюючий бантик - БЕЗПЕЧНИЙ)
    const swipeLeft = Gesture.Fling()
        .direction(Directions.LEFT)
        .onStart(() => {
            // Замість рандому - чіткий "стрибок" вліво-вгору і назад
            translateX.value = withTiming(-100, { duration: 200 }, () => {
                translateY.value = withTiming(-50, { duration: 200 }, () => {
                    // Повернення в 0,0 гарантує, що бантик не зникне
                    translateX.value = withSpring(0);
                    translateY.value = withSpring(0);
                });
            });
            runOnJS(handlePoints)(10, 'swipeLeft');
            runOnJS(updateChallenge)('custom');
        });

    // 3. Pinch
    const pinch = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = savedScale.value * e.scale;
            if (scale.value < 0.5) runOnJS(updateChallenge)('pinchSmall');
            if (scale.value > 2.5) runOnJS(updateChallenge)('pinchBig');
        })
        .onEnd(() => {
            savedScale.value = scale.value;
            runOnJS(updateChallenge)('pinch');
        });

    // 4. Тапи
    const tripleTap = Gesture.Tap().numberOfTaps(3).onStart(() => {
        runOnJS(handlePoints)(15, 'tripleTap');
        scale.value = withSpring(1.5, {}, () => scale.value = withSpring(1));
    });

    const doubleTap = Gesture.Tap().numberOfTaps(2).onStart(() => {
        runOnJS(handlePoints)(5, 'doubleTaps');
        scale.value = withSpring(1.3, {}, () => scale.value = withSpring(1));
    });

    const singleTap = Gesture.Tap().onStart(() => {
        runOnJS(handlePoints)(1, 'taps');
        scale.value = withSpring(1.1, {}, () => scale.value = withSpring(1));
    });

    const longPress = Gesture.LongPress().minDuration(3000).onStart(() => {
        runOnJS(handlePoints)(20, 'longPress');
    });

    // 5. Pan (Перетягування)
    const pan = Gesture.Pan()
        .onUpdate((e) => {
            translateX.value += e.changeX;
            translateY.value += e.changeY;
        })
        .onEnd(() => {
            runOnJS(updateChallenge)('drag');
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: scale.value }
        ],
    }));

    const tapGestures = Gesture.Exclusive(tripleTap, doubleTap, singleTap, longPress);

    // Використовуємо Simultaneous, щоб жести не блокували один одного
    const composed = Gesture.Simultaneous(
        pinch,
        Gesture.Race(swipeRight, swipeLeft, pan, tapGestures)
    );

    return (
        <GestureDetector gesture={composed}>
            <RoundWrapper style={animatedStyle}>
                <StyledImage source={require('../../assets/bow.png')} resizeMode="cover" />
            </RoundWrapper>
        </GestureDetector>
    );
} 
