import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
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

import { CourtsService } from "@/services/courts.service";

type SlotItem = {
    label: string;
    available: boolean;
};

type CourtDetail = {
    id: string;
    title: string;
    subtitle: string;
    surface: string;
    lighting: string;
    price: number;
    image: string;
    timeSlots: {
        slotDate?: string;
        startTime?: string;
        endTime?: string;
        isAvailable?: boolean;
    }[];
    operatingHours: {
        dayOfWeek?: number;
        openingTime?: string;
        closingTime?: string;
    }[];
};

const fallbackImage =
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop";

export default function CourtDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [court, setCourt] = useState<CourtDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function loadCourt() {
            if (!id) {
                setCourt(null);
                setIsLoading(false);
                setErrorMessage("Cancha no encontrada");
                return;
            }

            try {
                setIsLoading(true);
                setErrorMessage("");
                const response = await CourtsService.getCourtById(String(id));
                setCourt(mapCourtDetail(response.data));
            } catch (error) {
                setCourt(null);
                setErrorMessage(
                    error instanceof Error ? error.message : "No se pudo cargar la cancha",
                );
            } finally {
                setIsLoading(false);
            }
        }

        loadCourt();
    }, [id]);

    useEffect(() => {
        setSelectedTime(null);
    }, [selectedDate, court?.id]);

    const availableSchedules = useMemo(() => {
        if (!court) {
            return [];
        }

        return buildSlotsForDate(court, selectedDate);
    }, [court, selectedDate]);

    const formatDate = (date: Date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatDateInput = (date: Date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
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

    if (isLoading) {
        return (
            <SafeAreaView style={styles.notFoundContainer}>
                <ActivityIndicator size="large" color="#EA580C" />
                <Text style={styles.loadingText}>Cargando cancha...</Text>
            </SafeAreaView>
        );
    }

    if (!court) {
        return (
            <SafeAreaView style={styles.notFoundContainer}>
                <Text style={styles.notFoundText}>{errorMessage || "Cancha no encontrada"}</Text>
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
                    <Text style={styles.meta}>Deporte: {court.subtitle}</Text>
                    <Text style={styles.meta}>Superficie: {court.surface}</Text>
                    <Text style={styles.meta}>Iluminación: {court.lighting}</Text>

                    <Text style={styles.sectionTitle}>Selecciona la fecha</Text>

                    {Platform.OS === "web" ? (
                        <TouchableOpacity style={styles.dateBox}>
                            <Ionicons name="calendar-outline" size={18} color="#9ca3af" />
                            <input
                                type="date"
                                value={formatDateInput(selectedDate)}
                                min={formatDateInput(new Date())}
                                onChange={(e: any) => {
                                    const val = e.target.value;
                                    if (val) setSelectedDate(new Date(`${val}T12:00:00`));
                                }}
                                style={{
                                    flex: 1,
                                    border: "none",
                                    background: "transparent",
                                    color: "#374151",
                                    fontSize: 14,
                                    fontWeight: "600",
                                    outline: "none",
                                    cursor: "pointer",
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
                                                    const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
                                                    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
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

                    {availableSchedules.length > 0 ? (
                        <View style={styles.hoursGrid}>
                            {availableSchedules.map((slot) => {
                                const isSelected = selectedTime === slot.label;

                                return (
                                    <TouchableOpacity
                                        key={slot.label}
                                        style={[
                                            styles.hourButton,
                                            slot.available && isSelected && styles.hourButtonSelected,
                                            !slot.available && styles.hourButtonDisabled,
                                        ]}
                                        onPress={() => slot.available && setSelectedTime(slot.label)}
                                        disabled={!slot.available}
                                    >
                                        <Text
                                            style={[
                                                styles.hourText,
                                                slot.available && isSelected && styles.hourTextSelected,
                                                !slot.available && styles.hourTextDisabled,
                                            ]}
                                        >
                                            {slot.label}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    ) : (
                        <Text style={styles.emptySchedules}>
                            No hay horas disponibles para la fecha seleccionada.
                        </Text>
                    )}

                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Precio por hora:</Text>
                        <Text style={styles.priceValue}>L {court.price.toFixed(2)}</Text>
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.reserveButton,
                            !selectedTime && styles.reserveButtonDisabled,
                        ]}
                        disabled={!selectedTime}
                    >
                        <Text style={styles.reserveButtonText}>
                            {selectedTime ? `Reservar ${selectedTime}` : "Selecciona una hora"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function mapCourtDetail(raw: unknown): CourtDetail {
    const court = raw as {
        idField?: number;
        fieldName?: string;
        pricePerHour?: number | string;
        SportType?: {
            sportName?: string;
        };
        SurfaceType?: {
            surfaceName?: string;
        };
        FieldImages?: {
            imgUrl?: string;
            thumbnailUrl?: string;
        }[];
        TimeSlots?: {
            startTime?: string;
            endTime?: string;
            slotDate?: string;
            isAvailable?: boolean;
        }[];
        FieldOperatingHours?: {
            openingTime?: string;
            closingTime?: string;
            dayOfWeek?: number;
        }[];
    };

    return {
        id: String(court.idField ?? ""),
        title: court.fieldName ?? "Cancha disponible",
        subtitle: court.SportType?.sportName ?? "Deporte",
        surface: court.SurfaceType?.surfaceName ?? "Superficie",
        lighting: "Disponible",
        price: Number(court.pricePerHour ?? 0),
        image: court.FieldImages?.[0]?.thumbnailUrl || court.FieldImages?.[0]?.imgUrl || fallbackImage,
        timeSlots: court.TimeSlots ?? [],
        operatingHours: court.FieldOperatingHours ?? [],
    };
}

function buildSlotsForDate(court: CourtDetail, selectedDate: Date): SlotItem[] {
    const selectedDateKey = toDateKey(selectedDate);
    const exactSlots = court.timeSlots
        .filter((slot) => normalizeDate(slot.slotDate) === selectedDateKey)
        .map((slot) => ({
            label: formatHour(slot.startTime) ?? "",
            available: slot.isAvailable !== false,
        }))
        .filter((slot) => Boolean(slot.label));

    if (exactSlots.length > 0) {
        return dedupeSlots(exactSlots);
    }

    const dayOfWeek = selectedDate.getDay();
    const ranges = court.operatingHours.filter((item) => item.dayOfWeek === dayOfWeek);

    const generated = ranges.flatMap((range) =>
        generateHourlySlots(range.openingTime, range.closingTime),
    );

    return dedupeSlots(generated.map((label) => ({ label, available: true })));
}

function generateHourlySlots(openingTime?: string, closingTime?: string) {
    const start = timeToMinutes(openingTime);
    const end = timeToMinutes(closingTime);

    if (start === null || end === null || end <= start) {
        return [];
    }

    const slots: string[] = [];
    for (let current = start; current < end; current += 60) {
        slots.push(minutesToHour(current));
    }

    return slots;
}

function dedupeSlots(slots: SlotItem[]) {
    const seen = new Map<string, SlotItem>();

    slots.forEach((slot) => {
        const existing = seen.get(slot.label);
        if (!existing) {
            seen.set(slot.label, slot);
            return;
        }

        seen.set(slot.label, {
            label: slot.label,
            available: existing.available || slot.available,
        });
    });

    return Array.from(seen.values()).sort((a, b) => compareHours(a.label, b.label));
}

function timeToMinutes(value?: string) {
    if (!value) {
        return null;
    }

    const match = String(value).match(/(\d{2}):(\d{2})/);
    if (!match) {
        return null;
    }

    return Number(match[1]) * 60 + Number(match[2]);
}

function minutesToHour(value: number) {
    const hours = String(Math.floor(value / 60)).padStart(2, "0");
    const minutes = String(value % 60).padStart(2, "0");
    return `${hours}:${minutes}`;
}

function compareHours(a: string, b: string) {
    return (timeToMinutes(a) ?? 0) - (timeToMinutes(b) ?? 0);
}

function formatHour(value?: string) {
    if (!value) {
        return null;
    }

    const match = String(value).match(/(\d{2}:\d{2})/);
    return match ? match[1] : String(value).slice(0, 5);
}

function normalizeDate(value?: string) {
    if (!value) {
        return null;
    }

    const date = new Date(`${value}T12:00:00`);
    if (Number.isNaN(date.getTime())) {
        return null;
    }

    return toDateKey(date);
}

function toDateKey(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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
    dateTextActive: {
        color: "#374151",
        fontSize: 14,
        fontWeight: "600",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },
    modalContent: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        maxHeight: "60%",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#111827",
    },
    modalScroll: {
        maxHeight: 300,
    },
    daysGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    dayButton: {
        width: "18%",
        backgroundColor: "#F3F4F6",
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: "center",
        marginBottom: 4,
    },
    dayButtonSelected: {
        backgroundColor: "#EA580C",
    },
    dayName: {
        fontSize: 11,
        color: "#9CA3AF",
        fontWeight: "600",
    },
    dayNumber: {
        fontSize: 18,
        fontWeight: "800",
        color: "#374151",
        marginVertical: 2,
    },
    dayMonth: {
        fontSize: 11,
        color: "#9CA3AF",
    },
    dayTextSelected: {
        color: "#fff",
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
    hourButtonDisabled: {
        backgroundColor: "#E5E7EB",
        opacity: 0.55,
    },
    hourText: {
        color: "#9CA3AF",
        fontWeight: "700",
        fontSize: 12,
    },
    hourTextSelected: {
        color: "#fff",
    },
    hourTextDisabled: {
        color: "#6B7280",
    },
    emptySchedules: {
        color: "#6B7280",
        fontSize: 14,
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
    reserveButtonDisabled: {
        opacity: 0.55,
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
        textAlign: "center",
    },
    loadingText: {
        fontSize: 16,
        color: "#6B7280",
        marginTop: 12,
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
