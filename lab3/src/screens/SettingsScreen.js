import React, { useContext } from 'react';
import { Switch, View, Text } from 'react-native';
import { GameContext } from '../context/GameContext';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${props => props.theme.bg};
`;

const Section = styled.View`
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  elevation: 3;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  fontWeight: bold;
  color: #db7093;
  margin-bottom: 15px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.Text`
  font-size: 16px;
  color: #333;
`;

const DevInfo = styled.Text`
  font-size: 14px;
  color: #666;
  line-height: 22px;
`;

export default function SettingsScreen() {
    const { isDarkTheme, setIsDarkTheme, score } = useContext(GameContext);

    return (
        <Container>
            {/* Налаштування теми (п. 5 методички) */}
            <Section>
                <SectionTitle>Зовнішній вигляд 🎨</SectionTitle>
                <Row>
                    <Label>Темна тема</Label>
                    <Switch
                        value={isDarkTheme}
                        onValueChange={setIsDarkTheme}
                        trackColor={{ false: '#ffe4ec', true: '#db7093' }}
                        thumbColor={isDarkTheme ? '#fff' : '#fff'}
                    />
                </Row>
            </Section>

            {/* Статистика */}
            <Section>
                <SectionTitle>Статистика 📈</SectionTitle>
                <Row>
                    <Label>Загальний рахунок:</Label>
                    <Text style={{ fontWeight: 'bold', color: '#db7093', fontSize: 18 }}>{score}</Text>
                </Row>
            </Section>

            {/* Інформація про розробника */}
            <Section>
                <SectionTitle>Про додаток 🎀</SectionTitle>
                <DevInfo>
                    <Text style={{ fontWeight: 'bold' }}>Розробник:</Text> Лупашина Анастасія{"\n"}
                    <Text style={{ fontWeight: 'bold' }}>Група:</Text> ВТ-22-1{"\n"}
                    <Text style={{ fontWeight: 'bold' }}>Лабораторна робота:</Text> №3{"\n"}
                    <Text style={{ fontWeight: 'bold' }}>Тема:</Text> Кастомні жести у React Native
                </DevInfo>
            </Section>
        </Container>
    );
}
