import React from "react";
import { ScrollView, Text, View } from "react-native";

import ReservationItem from "@/components/perfil/reservationItem";
import styles from "@/styles/perfil.styles";
import { router } from "expo-router";

/*const times = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

*/

export default function ReservasScreen() {
  //function handleReserve() {
  //Alert.alert("Reserva simulada", "La reserva se creó de forma local");
  //}

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardSection}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Mis Reservas</Text>
            <Text
              style={styles.linkText}
              onPress={() => router.push("/(tabs)/bookings")}
            >
              Ver más
            </Text>
          </View>

          <ReservationItem
            title="Reserva Activa"
            date1="23 mar 2026"
            date2="06:00 PM"
            status="Activa"
            statusColor="#DFF5E5"
          />

          <ReservationItem
            title="Próxima Reserva"
            date1="27 mar 2026"
            date2="08:00 PM"
            status="Pendiente"
            statusColor="#FFE6D9"
          />
        </View>
      </ScrollView>
    </View>
  );
}

/*
<View style={styles.hero}>
          <Text style={styles.headerTitle}>Reserva</Text>

          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1200&auto=format&fit=crop",
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.name}>Tenis del Cancha</Text>
          <Text style={styles.detail}>Superficie: Tenis</Text>
          <Text style={styles.detail}>Iluminación: Sí</Text>

          <Text style={styles.sectionTitle}>Tiempos disponibles</Text>

          <View style={styles.timeGrid}>
            {times.map((time, index) => (
              <TimeSlot
                key={`${time}-${index}`}
                label={time}
                active={index === 0}
                disabled={index >= 8}
              />
            ))}
          </View>

          <TouchableOpacity
            style={styles.reserveButton}
            onPress={handleReserve}
          >
            <Text style={styles.reserveButtonText}>Reservar Ahora</Text>
          </TouchableOpacity>
        </View>

        */
