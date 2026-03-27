import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ResumenScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/(tabs)/admin')} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Resumen</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>Resumen General</Text>

                <View style={styles.grid}>
                    <View style={styles.card}>
                        <View style={[styles.iconWrap, { backgroundColor: '#DDF5E4' }]}>
                            <Feather name="dollar-sign" size={22} color="#17A34A" />
                        </View>
                        <Text style={styles.cardLabel}>Ingresos Totales</Text>
                        <Text style={styles.cardValue}>L 0.00</Text>
                    </View>

                    <View style={styles.card}>
                        <View style={[styles.iconWrap, { backgroundColor: '#FFE4CC' }]}>
                            <AntDesign name="calendar" size={20} color="#F57C00" />
                        </View>
                        <Text style={styles.cardLabel}>Reservas Totales</Text>
                        <Text style={styles.cardValue}>0</Text>
                    </View>

                    <View style={styles.card}>
                        <View style={[styles.iconWrap, { backgroundColor: '#DCE8FF' }]}>
                            <MaterialCommunityIcons name="storefront-outline" size={22} color="#2563EB" />
                        </View>
                        <Text style={styles.cardLabel}>Canchas Activas</Text>
                        <Text style={styles.cardValue}>0</Text>
                    </View>

                    <View style={styles.card}>
                        <View style={[styles.iconWrap, { backgroundColor: '#F8EDB8' }]}>
                            <Feather name="dollar-sign" size={22} color="#C58A00" />
                        </View>
                        <Text style={styles.cardLabel}>Pendiente de Pago</Text>
                        <Text style={styles.cardValue}>L 0.00</Text>
                    </View>
                </View>
            </ScrollView>
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
        flexGrow: 1,
        backgroundColor: '#F3F4F6',
        padding: 18,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0E2240',
        marginBottom: 18,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
    },
    iconWrap: {
        width: 42,
        height: 42,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    cardLabel: { fontSize: 13, color: '#667085', marginBottom: 6 },
    cardValue: { fontSize: 18, fontWeight: '800', color: '#0E2240' },
});