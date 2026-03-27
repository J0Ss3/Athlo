import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FinanzasScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/(tabs)/admin')} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Finanzas</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>Finanzas</Text>

                <View style={styles.heroCard}>
                    <View>
                        <Text style={styles.heroTitle}>Ingresos Totales</Text>
                        <Text style={styles.heroAmount}>L 0.00</Text>
                        <Text style={styles.heroSubtitle}>Pagos confirmados</Text>
                    </View>
                    <Feather name="dollar-sign" size={30} color="#fff" />
                </View>

                <View style={styles.detailCard}>
                    <Text style={styles.detailTitle}>Desglose de Ingresos</Text>

                    <View style={styles.row}>
                        <Text style={styles.label}>Pagos en Efectivo</Text>
                        <Text style={styles.value}>L 0.00</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Pagos con Tarjeta</Text>
                        <Text style={styles.value}>L 0.00</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>L 0.00</Text>
                    </View>
                </View>

                <View style={styles.pendingCard}>
                    <Text style={styles.pendingTitle}>Pagos Pendientes</Text>
                    <Text style={styles.pendingAmount}>L 0.00</Text>
                    <Text style={styles.pendingSubtitle}>0 reservas pendientes</Text>
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
    heroCard: {
        backgroundColor: '#0AC243',
        borderRadius: 16,
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
    heroTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 10,
    },
    heroAmount: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 4,
    },
    heroSubtitle: { color: '#fff', fontSize: 14 },
    detailCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 18,
        marginBottom: 14,
    },
    detailTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#1D1D1F',
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
    label: { fontSize: 15, color: '#5B6472' },
    value: { fontSize: 15, color: '#111827', fontWeight: '700' },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginBottom: 14,
    },
    totalLabel: { fontSize: 18, fontWeight: '800', color: '#111827' },
    totalValue: { fontSize: 20, fontWeight: '800', color: '#0AC243' },
    pendingCard: {
        backgroundColor: '#F5F0DC',
        borderRadius: 16,
        padding: 18,
        borderWidth: 1,
        borderColor: '#E5D36A',
    },
    pendingTitle: {
        fontSize: 16,
        color: '#B56C00',
        fontWeight: '700',
        marginBottom: 10,
    },
    pendingAmount: {
        fontSize: 22,
        color: '#B56C00',
        fontWeight: '800',
        marginBottom: 4,
    },
    pendingSubtitle: {
        fontSize: 14,
        color: '#B56C00',
    },
});