import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ReservasScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/(tabs)/admin')} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Reservas</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Reservas</Text>

                <View style={styles.emptyContainer}>
                    <AntDesign name="calendar" size={74} color="#C9CDD3" />
                    <Text style={styles.emptyTitle}>No hay reservas aún</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F45100' },
    header: {
        height: 95,
        backgroundColor: '#F45100',
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 18,
        gap: 12,
    },
    backButton: {
        marginBottom: 2,
    },
    headerTitle: { color: '#fff', fontSize: 24, fontWeight: '800' },
    content: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        padding: 18,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0E2240',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 120,
    },
    emptyTitle: {
        marginTop: 14,
        fontSize: 16,
        color: '#7A8394',
        textAlign: 'center',
    },
});