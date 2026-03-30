import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    Image,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const courts = [
    {
        id: "1",
        title: "Pádel Club Central",
        subtitle: "Pádel",
        surface: "Pádel",
        lighting: "Lámpara",
        price: 2450,
        image:
            "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop",
        schedules: [
            "06:00", "07:00", "08:00", "09:00",
            "10:00", "11:00", "12:00", "13:00",
            "14:00", "15:00", "16:00", "17:00",
            "18:00", "19:00", "20:00", "21:00",
            "22:00", "23:00",
        ],
    },
    {
        id: "2",
        title: "Tenis del Valle",
        subtitle: "Tenis",
        surface: "Sintética",
        lighting: "LED",
        price: 1800,
        image:
            "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1200&auto=format&fit=crop",
        schedules: [
            "08:00", "09:00", "10:00", "11:00",
            "12:00", "13:00", "14:00", "15:00",
            "18:00", "19:00", "20:00",
        ],
    },
    {
        id: "3",
        title: "Locación Satélite",
        subtitle: "Tenis",
        surface: "Cemento",
        lighting: "Reflectores",
        price: 100,
        rating: "4.5",
        image:
            "https://images.unsplash.com/photo-1542144582-1ba00456b5e3?q=80&w=1200&auto=format&fit=crop",
        schedules: [
            "06:00", "07:00", "08:00", "16:00",
            "17:00", "18:00", "19:00", "20:00",
        ],
    },
    {
        id: "4",
        title: "Locación Sinaloa",
        subtitle: "Pádel",
        surface: "Pádel",
        lighting: "LED",
        price: 200,
        rating: "4.8",
        image:
            "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
        schedules: [
            "07:00", "08:00", "09:00", "10:00",
            "11:00", "12:00", "17:00", "18:00",
            "19:00", "20:00",
        ],
    },
];

export default function CourtDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const formatDate = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatDateInput = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const generateDays = () => {
        const days: Date[] = [];
        const today = new Date();
        for (let i = 0; i < 30; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            days.push(d);
        }
        return days;
    };

    const court = useMemo(() => {
        return courts.find((item) => item.id === id);
    }, [id]);

    if (!court) {
        return (
            <SafeAreaView style={styles.notFoundContainer}>
                <Text style={styles.notFoundText}>Cancha no encontrada</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backButtonText}>Volver</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={22} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Reserva</Text>
                </View>

                <Image source={{ uri: court.image }} style={styles.image} />

                <View style={styles.card}>
                    <Text style={styles.name}>{court.title}</Text>
                    <Text style={styles.meta}>Superficie: {court.surface}</Text>
                    <Text style={styles.meta}>Iluminación: {court.lighting}</Text>

                    <Text style={styles.sectionTitle}>Selecciona la fecha</Text>

                    {Platform.OS === 'web' ? (
                        <TouchableOpacity style={styles.dateBox}>
                            <Ionicons name="calendar-outline" size={18} color="#9ca3af" />
                            <input
                                type="date"
                                value={formatDateInput(selectedDate)}
                                min={formatDateInput(new Date())}
                                onChange={(e: any) => {
                                    const val = e.target.value;
                                    if (val) setSelectedDate(new Date(val + 'T12:00:00'));
                                }}
                                style={{
                                    flex: 1,
                                    border: 'none',
                                    background: 'transparent',
                                    color: '#374151',
                                    fontSize: 14,
                                    fontWeight: '600',
                                    outline: 'none',
                                    cursor: 'pointer',
                                }}
                            />
                        </TouchableOpacity>
                    ) : (
                        <>
                            <TouchableOpacity
                                style={styles.dateBox}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <Ionicons name="calendar-outline" size={18} color="#9ca3af" />
                                <Text style={styles.dateTextActive}>{formatDate(selectedDate)}</Text>
                                <View style={{ flex: 1 }} />
                                <Ionicons name="chevron-down" size={16} color="#9ca3af" />
                            </TouchableOpacity>

                            <Modal
                                visible={showDatePicker}
                                transparent
                                animationType="slide"
                                onRequestClose={() => setShowDatePicker(false)}
                            >
                                <View style={styles.modalOverlay}>
                                    <View style={styles.modalContent}>
                                        <View style={styles.modalHeader}>
                                            <Text style={styles.modalTitle}>Selecciona una fecha</Text>
                                            <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                                                <Ionicons name="close" size={24} color="#374151" />
                                            </TouchableOpacity>
                                        </View>
                                        <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
                                            <View style={styles.daysGrid}>
                                                {generateDays().map((day) => {
                                                    const isSelected = day.toDateString() === selectedDate.toDateString();
                                                    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
                                                    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                                                    return (
                                                        <TouchableOpacity
                                                            key={day.toISOString()}
                                                            style={[styles.dayButton, isSelected && styles.dayButtonSelected]}
                                                            onPress={() => {
                                                                setSelectedDate(day);
                                                                setShowDatePicker(false);
                                                            }}
                                                        >
                                                            <Text style={[styles.dayName, isSelected && styles.dayTextSelected]}>
                                                                {dayNames[day.getDay()]}
                                                            </Text>
                                                            <Text style={[styles.dayNumber, isSelected && styles.dayTextSelected]}>
                                                                {day.getDate()}
                                                            </Text>
                                                            <Text style={[styles.dayMonth, isSelected && styles.dayTextSelected]}>
                                                                {monthNames[day.getMonth()]}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    );
                                                })}
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                            </Modal>
                        </>
                    )}

                    <Text style={styles.sectionTitle}>Horarios disponibles</Text>

                    <View style={styles.hoursGrid}>
                        {court.schedules.map((hour) => {
                            const isSelected = selectedTime === hour;

                            return (
                                <TouchableOpacity
                                    key={hour}
                                    style={[styles.hourButton, isSelected && styles.hourButtonSelected]}
                                    onPress={() => setSelectedTime(hour)}
                                >
                                    <Text style={[styles.hourText, isSelected && styles.hourTextSelected]}>
                                        {hour}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Precio por hora:</Text>
                        <Text style={styles.priceValue}>L {court.price.toFixed(2)}</Text>
                    </View>

                    <TouchableOpacity style={styles.reserveButton}>
                        <Text style={styles.reserveButtonText}>Reservar Ahora</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#1F3B63",
    },
    container: {
        flex: 1,
        backgroundColor: "#F3F4F6",
    },
    content: {
        paddingBottom: 24,
    },
    header: {
        height: 70,
        backgroundColor: "#1F3B63",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        gap: 12,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "800",
    },
    image: {
        width: "100%",
        height: 230,
    },
    card: {
        backgroundColor: "#F4F4F5",
        marginTop: -12,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
    },
    name: {
        fontSize: 28,
        fontWeight: "800",
        color: "#0F172A",
        marginBottom: 8,
    },
    meta: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: 2,
    },
    sectionTitle: {
        marginTop: 18,
        marginBottom: 10,
        fontSize: 16,
        fontWeight: "800",
        color: "#111827",
    },
    dateBox: {
        height: 46,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 10,
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    dateText: {
        color: "#6B7280",
        fontSize: 14,
    },
    dateTextActive: {
        color: "#374151",
        fontSize: 14,
        fontWeight: "600",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        maxHeight: '60%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#111827',
    },
    modalScroll: {
        maxHeight: 300,
    },
    daysGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    dayButton: {
        width: '18%',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 4,
    },
    dayButtonSelected: {
        backgroundColor: '#EA580C',
    },
    dayName: {
        fontSize: 11,
        color: '#9CA3AF',
        fontWeight: '600',
    },
    dayNumber: {
        fontSize: 18,
        fontWeight: '800',
        color: '#374151',
        marginVertical: 2,
    },
    dayMonth: {
        fontSize: 11,
        color: '#9CA3AF',
    },
    dayTextSelected: {
        color: '#fff',
    },
    hoursGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    hourButton: {
        width: "23%",
        backgroundColor: "#E5E7EB",
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: "center",
        marginBottom: 10,
    },
    hourButtonSelected: {
        backgroundColor: "#EA580C",
    },
    hourText: {
        color: "#9CA3AF",
        fontWeight: "700",
        fontSize: 12,
    },
    hourTextSelected: {
        color: "#fff",
    },
    priceRow: {
        marginTop: 14,
        paddingTop: 14,
        borderTopWidth: 1,
        borderTopColor: "#D1D5DB",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    priceLabel: {
        fontSize: 15,
        color: "#6B7280",
    },
    priceValue: {
        fontSize: 28,
        fontWeight: "800",
        color: "#111827",
    },
    reserveButton: {
        marginTop: 18,
        backgroundColor: "#F4A261",
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: "center",
    },
    reserveButtonText: {
        color: "#fff",
        fontWeight: "800",
        fontSize: 15,
    },
    notFoundContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 24,
    },
    notFoundText: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 16,
    },
    backButton: {
        backgroundColor: "#EA580C",
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 10,
    },
    backButtonText: {
        color: "#fff",
        fontWeight: "700",
    },
});