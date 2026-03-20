import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { GameContext } from '../context/GameContext';
import styled from 'styled-components/native';

const ListContainer = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${props => props.theme.bg};
`;

const Item = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 15px;
  opacity: ${props => props.done ? 0.6 : 1};
  border: 1px solid ${props => props.done ? '#c2f0c2' : '#ffe4ec'};
`;

const StatusCircle = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${props => props.done ? '#4CAF50' : '#eee'};
  margin-right: 15px;
`;

const TaskText = styled.Text`
  font-size: 16px;
  color: ${props => props.done ? '#888' : '#333'};
  text-decoration: ${props => props.done ? 'line-through' : 'none'};
`;

export default function ChallengesScreen() {
    const { challenges } = useContext(GameContext);

    return (
        <ListContainer>
            <ScrollView showsVerticalScrollIndicator={false}>
                {Object.keys(challenges).map((key) => (
                    <Item key={key} done={challenges[key].done}>
                        <StatusCircle done={challenges[key].done} />
                        <TaskText done={challenges[key].done}>
                            {challenges[key].text}
                            {challenges[key].target ? ` (${challenges[key].count}/${challenges[key].target})` : ''}
                        </TaskText>
                    </Item>
                ))}
            </ScrollView>
        </ListContainer>
    );
}
