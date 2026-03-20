import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import InteractiveBow from '../components/InteractiveBow';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.bg};
  align-items: center;
  justify-content: center;
`;

const ScoreCard = styled.View`
  background-color: #fff;
  padding: 20px 40px;
  border-radius: 20px;
  shadow-color: #ffb6c1;
  shadow-offset: 0px 5px;
  shadow-opacity: 0.5;
  elevation: 10;
  margin-bottom: 50px;
`;

const ScoreLabel = styled.Text`
  font-size: 14px;
  color: #ff69b4;
  text-align: center;
  font-weight: bold;
`;

const ScoreValue = styled.Text`
  font-size: 48px;
  color: #db7093;
  font-weight: 900;
`;

export default function GameScreen() {
    const { score } = useContext(GameContext);
    return (
        <Container>
            <ScoreCard>
                <ScoreLabel>SCORE</ScoreLabel>
                <ScoreValue>{score}</ScoreValue>
            </ScoreCard>
            <InteractiveBow />
        </Container>
    );
}
