import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import CategoryChip from "@/components/home/categoryChip";
import FeaturedCourtCard from "@/components/home/featuredCard";
import PopularCourtCard from "@/components/home/popularCard";
import SearchBar from "@/components/home/searchBar";
import styles from "@/styles/home.styles";

const featuredCourts = [
  {
    id: "1",
    title: "Pádel Club Miramontes",
    location: "Col. Miramontes, Tegucigalpa",
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
    title: "Tenis Club Palmira",
    location: "Col. Palmira, Tegucigalpa",
    subtitle: "Tenis",
    surface: "Sintética",
    lighting: "LED",
    price: 2200,
    image:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1200&auto=format&fit=crop",
    schedules: [
      "08:00", "09:00", "10:00", "11:00",
      "12:00", "13:00", "14:00", "15:00",
      "18:00", "19:00", "20:00",
    ],
  },
];

const popularCourts = [
  {
    id: "3",
    title: "Residencial Agua Dulc...",
    subtitle: "Fútbol",
    surface: "Cemento",
    lighting: "Reflectores",
    price: 2450,
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1542144582-1ba00456b5e3?q=80&w=1200&auto=format&fit=crop",
    schedules: [
      "06:00", "07:00", "08:00", "16:00",
      "17:00", "18:00", "19:00", "20:00",
    ],
  },
  {
    id: "4",
    title: "Col. El Trapiche, frente...",
    subtitle: "Fútbol",
    surface: "Pádel",
    lighting: "LED",
    price: 2200,
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    schedules: [
      "07:00", "08:00", "09:00", "10:00",
      "11:00", "12:00", "17:00", "18:00",
      "19:00", "20:00",
    ],
  },
  {
    id: "5",
    title: "Cancha Los Pinos",
    subtitle: "Fútbol",
    surface: "Grama",
    lighting: "LED",
    price: 1800,
    rating: "4.5",
    image:
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=1200&auto=format&fit=crop",
    schedules: [
      "06:00", "07:00", "08:00", "09:00",
      "16:00", "17:00", "18:00", "19:00",
    ],
  },
];

const categories = [
  { id: "todos", label: "Todos", emoji: "⚽", color: "#2563EB" },
  { id: "futbol", label: "Fútbol", emoji: "⚽", color: "#1E3A5F" },
  { id: "padel", label: "Pádel", emoji: "🏓", color: "#E11D48" },
  { id: "tenis", label: "Tenis", emoji: "🎾", color: "#DC2626" },
  { id: "basquet", label: "Básquet", emoji: "🏀", color: "#EA580C" },
];

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("todos");
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Athlo</Text>
          <TouchableOpacity style={styles.notifButton}>
            <Ionicons name="notifications-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <SearchBar />

        {/* Categorías */}
        <Text style={styles.categoriesTitle}>Categorías</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesRow}
        >
          {categories.map((cat) => (
            <CategoryChip
              key={cat.id}
              label={cat.label}
              emoji={cat.emoji}
              color={cat.color}
              isActive={activeCategory === cat.id}
              onPress={() => setActiveCategory(cat.id)}
            />
          ))}
        </ScrollView>

        {/* Canchas Destacadas */}
        <View style={styles.sectionHeaderDark}>
          <Text style={styles.sectionTitleDark}>Canchas Destacadas</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>Ver Todas</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featuredCourts.map((court) => (
            <FeaturedCourtCard
              key={court.id}
              title={court.title}
              subtitle={court.location}
              image={court.image}
              onPress={() => router.push(`/cancha/${court.id}` as any)}
            />
          ))}
        </ScrollView>

        <View style={styles.carouselDots}>
          <View style={styles.dotActive} />
          <View style={styles.dot} />
        </View>

        {/* Populares */}
        <View style={styles.sectionWhite}>
          <View style={styles.sectionHeaderLight}>
            <Text style={styles.sectionTitleLight}>Populares</Text>
            <TouchableOpacity>
              <Text style={styles.sectionActionLight}>Ver Todas</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {popularCourts.map((court) => (
              <PopularCourtCard
                key={court.id}
                price={`L ${court.price}`}
                location={court.title}
                type={court.subtitle}
                rating={court.rating}
                image={court.image}
                onPress={() => router.push(`/cancha/${court.id}` as any)}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}