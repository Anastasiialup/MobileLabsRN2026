import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Footer() {
    return (
        <View style={styles.container}>
            {/* Заміни на свої реальні дані */}
            <Text style={styles.text}>Лупашина Анастасія ВТ-22-1</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#e9ecef',
    },
    text: {
        fontSize: 12,
        color: '#6c757d',
        fontStyle: 'italic',
    },
});
