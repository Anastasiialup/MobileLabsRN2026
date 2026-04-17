import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { formatBytes } from '../utils/formatters';

const Item = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    padding: 15px;
    background: white;
    margin-bottom: 8px;
    border-radius: 12px;
    border: 1px solid #ffe4ec;
`;

export default function FileItem({ item, onPress, onLongPress }) {
    const isDir = item.isDirectory;
    const date = item.modificationTime ? new Date(item.modificationTime * 1000).toLocaleDateString() : '';

    return (
        <Item onPress={onPress} onLongPress={onLongPress}>
            <Text style={{fontSize: 24, marginRight: 12}}>{isDir ? '📁' : '📄'}</Text>
            <View style={{flex: 1}}>
                <Name style={{fontWeight: 'bold', color: '#333'}}>{item.name}</Name>
                <Text style={{fontSize: 10, color: '#999'}}>
                    {isDir ? 'Папка' : formatBytes(item.size)} {date && `• ${date}`}
                </Text>
            </View>
        </Item>
    );
}
const Name = styled.Text`font-size: 15px;`;
