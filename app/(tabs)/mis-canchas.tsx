import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MisCanchasScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/(tabs)/admin')} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Mis Canchas</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.topRow}>
                    <Text style={styles.sectionTitle}>Mis Canchas</Text>

                    <TouchableOpacity style={styles.addButton}>
                        <Feather name="plus" size={18} color="#fff" />
                        <Text style={styles.addButtonText}>Agregar cancha</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.emptyContainer}>
                    <MaterialCommunityIcons name="storefront-outline" size={78} color="#C9CDD3" />
                    <Text style={styles.emptyTitle}>No tienes canchas registradas aún</Text>
                    <Text style={styles.emptySubtitle}>Agrega tu primera cancha para comenzar</Text>
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
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0E2240',
    },
    addButton: {
        backgroundColor: '#F45100',
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    addButtonText: { color: '#fff', fontWeight: '700', fontSize: 14 },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 80,
    },
    emptyTitle: {
        marginTop: 14,
        fontSize: 16,
        color: '#7A8394',
        textAlign: 'center',
        marginBottom: 6,
    },
    emptySubtitle: {
        fontSize: 15,
        color: '#7A8394',
        textAlign: 'center',
    },
});