import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Alert, TouchableOpacity, Text, View, Modal, TextInput } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import styled from 'styled-components/native';
import FileItem from '../components/FileItem';
import { formatBytes } from '../utils/formatters';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Screen = styled.View`
    flex: 1;
    background-color: #fff5f8;
    padding-top: ${props => props.top}px;
    padding-bottom: ${props => props.bottom}px;
`;

const Header = styled.View`
    background-color: white;
    padding: 20px;
    margin-horizontal: 15px;
    margin-top: 10px;
    border-radius: 25px;
    elevation: 4;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 4px;
`;

export default function FileManager({ navigation }) {
    const insets = useSafeAreaInsets();
    const [currentDir, setCurrentDir] = useState(FileSystem.documentDirectory);
    const [items, setItems] = useState([]);
    const [stats, setStats] = useState({ total: 0, free: 0 });

    // Модалки
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

    const [inputValue, setInputValue] = useState('');
    const [activeItem, setActiveItem] = useState(null);
    const [isFolder, setIsFolder] = useState(false);

    const loadData = useCallback(async () => {
        if (!currentDir) return;
        try {
            const files = await FileSystem.readDirectoryAsync(currentDir);
            const details = await Promise.all(files.map(async (name) => {
                const info = await FileSystem.getInfoAsync(currentDir + name);
                return { ...info, name };
            }));
            setItems(details.sort((a, b) => b.isDirectory - a.isDirectory));

            let free = 0; let total = 0;
            if (typeof FileSystem.getFreeDiskStorageAsync === 'function') free = await FileSystem.getFreeDiskStorageAsync();
            if (typeof FileSystem.getTotalDiskStorageAsync === 'function') total = await FileSystem.getTotalDiskStorageAsync();
            setStats({ total: total || (free + 5000000000), free });
        } catch (e) { console.log(e.message); }
    }, [currentDir]);

    useEffect(() => {
        loadData();
        const unsub = navigation.addListener('focus', loadData);
        return unsub;
    }, [navigation, loadData]);

    const handleConfirm = async () => {
        if (!inputValue.trim()) return;
        try {
            if (activeItem) {
                await FileSystem.moveAsync({ from: activeItem.uri, to: currentDir + inputValue });
            } else {
                if (isFolder) {
                    await FileSystem.makeDirectoryAsync(currentDir + inputValue, { intermediates: true });
                } else {
                    const fileName = inputValue.endsWith('.txt') ? inputValue : inputValue + '.txt';
                    navigation.navigate('Editor', { fileUri: currentDir + fileName, name: fileName });
                }
            }
            setModalVisible(false);
            setInputValue('');
            setActiveItem(null);
            loadData();
        } catch (e) { Alert.alert("Помилка", "Не вдалося виконати дію"); }
    };

    const handleDelete = async () => {
        if (!activeItem) return;
        try {
            await FileSystem.deleteAsync(activeItem.uri);
            setConfirmDeleteVisible(false);
            setActiveItem(null);
            loadData();
        } catch (e) { Alert.alert("Помилка", "Не вдалося видалити"); }
    };

    const goBackPath = () => {
        const parts = currentDir.split('/').filter(Boolean);
        if (parts.length <= 3) {
            setCurrentDir(FileSystem.documentDirectory);
            return;
        }
        parts.pop();
        const newPath = 'file:///' + parts.slice(1).join('/') + '/';
        setCurrentDir(newPath);
    };

    return (
        <Screen top={insets.top} bottom={insets.bottom}>

            {/* 1. Модалка Створення / Перейменування */}
            <Modal transparent visible={modalVisible} animationType="fade">
                <ModalOverlay>
                    <ModalContent>
                        <Text style={{fontWeight: 'bold', color: '#db7093', marginBottom: 15, fontSize: 18}}>
                            {activeItem ? "Перейменувати ✏️" : (isFolder ? "Нова папка 📂" : "Новий файл 📝")}
                        </Text>
                        <StyledInput
                            value={inputValue}
                            onChangeText={setInputValue}
                            autoFocus
                            placeholder="Назва..."
                        />
                        <View style={{flexDirection: 'row', marginTop: 25, gap: 10}}>
                            <ModalBtn onPress={() => {setModalVisible(false); setActiveItem(null);}} style={{backgroundColor: '#eee'}}>
                                <Text style={{color: '#666'}}>Скасувати</Text>
                            </ModalBtn>
                            <ModalBtn onPress={handleConfirm}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>Ок</Text>
                            </ModalBtn>
                        </View>
                    </ModalContent>
                </ModalOverlay>
            </Modal>

            {/* 2. Модалка Підтвердження Видалення */}
            <Modal transparent visible={confirmDeleteVisible} animationType="fade">
                <ModalOverlay>
                    <ModalContent>
                        <Text style={{fontWeight: 'bold', color: '#db7093', marginBottom: 10, fontSize: 18}}>⚠️ Видалити?</Text>
                        <Text style={{color: '#666', marginBottom: 20}}>
                            Ви впевнені, що хочете видалити "{activeItem?.name}"?
                        </Text>
                        <View style={{flexDirection: 'row', gap: 10}}>
                            <ModalBtn onPress={() => setConfirmDeleteVisible(false)} style={{backgroundColor: '#eee'}}>
                                <Text style={{color: '#666'}}>Ні</Text>
                            </ModalBtn>
                            <ModalBtn onPress={handleDelete} style={{backgroundColor: '#ff4d4d'}}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>Так, видалити</Text>
                            </ModalBtn>
                        </View>
                    </ModalContent>
                </ModalOverlay>
            </Modal>

            <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: '#db7093'}}>🎀 Мій Провідник</Text>
            </View>

            <Header>
                <Text style={{fontSize: 10, color: '#db7093', fontWeight: 'bold'}}>📍 ШЛЯХ:</Text>
                <Text numberOfLines={1} style={{fontSize: 12, color: '#888', marginBottom: 10}}>
                    {currentDir?.replace(FileSystem.documentDirectory, 'root/') || 'root/'}
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 10}}>
                    <Stat label="Всього" val={formatBytes(stats.total)} color="#999" />
                    <Stat label="Вільно" val={formatBytes(stats.free)} color="#4caf50" />
                    <Stat label="Зайнято" val={formatBytes(stats.total - stats.free)} color="#db7093" />
                </View>
            </Header>

            <FlatList
                data={items}
                contentContainerStyle={{ padding: 20, paddingBottom: 150 }}
                keyExtractor={(item) => item.uri}
                ListHeaderComponent={currentDir !== FileSystem.documentDirectory && (
                    <TouchableOpacity onPress={goBackPath} style={{padding: 12, backgroundColor: '#ffe4ec', borderRadius: 15, marginBottom: 15, alignItems: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: '#db7093'}}>
                        <Text style={{color: '#db7093', fontWeight: 'bold'}}>⬅️ Повернутися назад</Text>
                    </TouchableOpacity>
                )}
                renderItem={({ item }) => (
                    <FileItem
                        item={item}
                        onPress={() => item.isDirectory ? setCurrentDir(item.uri + '/') : navigation.navigate('Editor', { fileUri: item.uri, name: item.name })}
                        onLongPress={() => {
                            Alert.alert(item.name, "Дія:", [
                                { text: "Скасувати", style: "cancel" },
                                { text: "Перейменувати ✏️", onPress: () => { setActiveItem(item); setInputValue(item.name); setModalVisible(true); }},
                                { text: "Видалити 🗑️", style: 'destructive', onPress: () => { setActiveItem(item); setConfirmDeleteVisible(true); }}
                            ]);
                        }}
                    />
                )}
            />

            <View style={{position: 'absolute', bottom: insets.bottom + 20, right: 20, alignItems: 'center', gap: 12}}>
                <FAB small style={{backgroundColor: '#ffb6c1'}} onPress={() => { setActiveItem(null); setIsFolder(true); setInputValue(''); setModalVisible(true); }}>
                    <Text style={{fontSize: 20}}>📂</Text>
                </FAB>
                <FAB onPress={() => { setActiveItem(null); setIsFolder(false); setInputValue(''); setModalVisible(true); }}>
                    <Text style={{color: 'white', fontSize: 35}}>+</Text>
                </FAB>
            </View>
        </Screen>
    );
}

const ModalOverlay = styled.View`flex: 1; background-color: rgba(0,0,0,0.5); justify-content: center; align-items: center;`;
const ModalContent = styled.View`width: 85%; background-color: white; padding: 25px; border-radius: 25px; elevation: 10;`;
const StyledInput = styled.TextInput`background-color: #f9f9f9; border-radius: 12px; padding: 15px; font-size: 16px; color: #333; margin-top: 10px;`;
const ModalBtn = styled.TouchableOpacity`flex: 1; background-color: #db7093; padding: 15px; border-radius: 15px; align-items: center;`;
const Stat = ({ label, val, color }) => (<View><Text style={{fontSize: 9, color: '#aaa'}}>{label}</Text><Text style={{fontSize: 12, fontWeight: 'bold', color}}>{val}</Text></View>);
const FAB = styled.TouchableOpacity`
    background-color: #db7093;
    width: ${props => props.small ? '55px' : '75px'};
    height: ${props => props.small ? '55px' : '75px'};
    border-radius: 40px;
    justify-content: center;
    align-items: center;
    elevation: 8;
`;
