import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity, Text, View, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Container = styled.View`
    flex: 1;
    background-color: #fff5f8;
    padding: 20px;
    /* Додаємо відступ зверху */
    padding-top: ${props => Math.max(props.top, 20)}px;
    padding-bottom: ${props => props.bottom + 10}px;
`;

export default function FileEditor({ route, navigation }) {
    const insets = useSafeAreaInsets();
    const { fileUri, name } = route.params;
    const [content, setContent] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const info = await FileSystem.getInfoAsync(fileUri);
                if (info.exists) setContent(await FileSystem.readAsStringAsync(fileUri));
            } catch (e) { console.log("New file"); }
        })();
    }, [fileUri]);

    const handleSave = async () => {
        try {
            await FileSystem.writeAsStringAsync(fileUri, content);
            Alert.alert("Успіх 🎀", "Файл збережено!");
            navigation.goBack();
        } catch (e) { Alert.alert("Помилка збереження"); }
    };

    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <Container top={insets.top} bottom={insets.bottom}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
                    <Text style={{color: '#db7093', fontWeight: 'bold', fontSize: 18}}>📝 {name}</Text>
                </View>

                <TextInput
                    multiline
                    style={{
                        flex: 1,
                        backgroundColor: 'white',
                        borderRadius: 25,
                        padding: 20,
                        textAlignVertical: 'top',
                        borderWidth: 1,
                        borderColor: '#ffc0cb',
                        fontSize: 16,
                        elevation: 2
                    }}
                    value={content}
                    onChangeText={setContent}
                    placeholder="Ваш текст тут..."
                    placeholderTextColor="#ccc"
                />

                <View style={{flexDirection: 'row', marginTop: 20, gap: 12}}>
                    <Btn onPress={() => navigation.goBack()} style={{backgroundColor: '#f0f0f0', flex: 1}}>
                        <Text style={{color: '#888', fontWeight: 'bold'}}>Назад</Text>
                    </Btn>
                    <Btn onPress={handleSave} style={{flex: 2}}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Зберегти ✨</Text>
                    </Btn>
                </View>
            </Container>
        </KeyboardAvoidingView>
    );
}

const Btn = styled.TouchableOpacity`
    background-color: #db7093;
    padding: 18px;
    border-radius: 20px;
    align-items: center;
    elevation: 3;
`;
