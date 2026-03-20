import React from 'react';
import { SectionList, Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const CONTACTS_DATA = [
    {
        title: 'Адміністрація університету',
        data: [
            { name: 'Ректорат', phone: '+38 (0412) 12-34-56' },
            { name: 'Деканат ФІКТ', phone: '+38 (0412) 98-76-54' },
            { name: 'Навчальна частина', phone: '+38 (0412) 55-44-33' },
        ],
    },
    {
        title: 'Кафедра ПЗ (Викладачі)',
        data: [
            { name: 'Лупашина Анастасія (ВТ-22-1)', phone: '+38 (097) 111-22-33' },
            { name: 'Професор Прилипко П.П.', phone: '+38 (050) 222-33-44' },
            { name: 'Доцент Марченко С.Д.', phone: '+38 (063) 333-44-55' },
        ],
    },
    {
        title: 'Технічна підтримка',
        data: [
            { name: 'IT-відділ', phone: '+38 (0412) 11-11-11' },
            { name: 'Бібліотека', phone: '+38 (0412) 22-22-22' },
        ],
    },
];

export default function ContactsScreen() {

    // Функція для імітації дзвінка (просто для краси)
    const makeCall = (phone) => {
        console.log(`Виклик на номер: ${phone}`);
        // Linking.openURL(`tel:${phone}`); // Це б відкрило справжню дзвонилку
    };

    return (
        <View style={styles.container}>
            <SectionList
                sections={CONTACTS_DATA}
                keyExtractor={(item, index) => item.name + index}

                // 2.5 renderSectionHeader (Заголовки секцій)
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.sectionHeaderContainer}>
                        <Text style={styles.sectionHeaderText}>{title}</Text>
                    </View>
                )}

                // 2.5 renderItem (Елементи з іменами та телефонами)
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => makeCall(item.phone)}>
                        <View style={styles.iconPlaceholder}>
                            <Text style={styles.iconText}>{item.name[0]}</Text>
                        </View>
                        <View style={styles.contactInfo}>
                            <Text style={styles.nameText}>{item.name}</Text>
                            <Text style={styles.phoneText}>{item.phone}</Text>
                        </View>
                        <Text style={styles.callArrow}>📞</Text>
                    </TouchableOpacity>
                )}

                // 2.5 ItemSeparatorComponent
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                stickySectionHeadersEnabled={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    sectionHeaderContainer: {
        backgroundColor: '#ffe4ec',
        padding: 12,
        borderLeftWidth: 5,
        borderLeftColor: '#db7093'
    },
    sectionHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#db7093'
    },
    item: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    iconPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fce4ec',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    iconText: { color: '#db7093', fontWeight: 'bold' },
    contactInfo: { flex: 1 },
    nameText: { fontSize: 16, fontWeight: '600', color: '#333' },
    phoneText: { fontSize: 14, color: '#888', marginTop: 2 },
    callArrow: { fontSize: 18, opacity: 0.5 },
    separator: { height: 1, backgroundColor: '#f0f0f0', marginLeft: 70 },
});
