import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import CategoryChip from "@/components/home/categoryChip";
import FeaturedCourtCard from "@/components/home/featuredCard";
import PopularCourtCard from "@/components/home/popularCard";
import SearchBar from "@/components/home/searchBar";
import { CourtsService } from "@/services/courts.service";
import styles from "@/styles/home.styles";

type CourtCard = {
  id: string;
  title: string;
  location: string;
  subtitle: string;
  surface: string;
  price: number;
  rating?: string;
  image: string;
};

const featuredCourtsFallback: CourtCard[] = [
  {
    id: "1",
    title: "Pádel Club Miramontes",
    location: "Col. Miramontes, Tegucigalpa",
    subtitle: "Pádel",
    surface: "Pádel",
    price: 2450,
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Tenis Club Palmira",
    location: "Col. Palmira, Tegucigalpa",
    subtitle: "Tenis",
    surface: "Sintética",
    price: 2200,
    image:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1200&auto=format&fit=crop",
  },
];

const popularCourtsFallback: CourtCard[] = [
  {
    id: "3",
    title: "Residencial Agua Dulce",
    location: "Tegucigalpa",
    subtitle: "Fútbol",
    surface: "Cemento",
    price: 2450,
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1542144582-1ba00456b5e3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Col. El Trapiche",
    location: "Tegucigalpa",
    subtitle: "Fútbol",
    surface: "Pádel",
    price: 2200,
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Cancha Los Pinos",
    location: "Tegucigalpa",
    subtitle: "Fútbol",
    surface: "Grama",
    price: 1800,
    rating: "4.5",
    image:
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=1200&auto=format&fit=crop",
  },
];

const categories = [
  { id: "todos", label: "Todos", emoji: "⚽", color: "#2563EB" },
  { id: "futbol", label: "Fútbol", emoji: "⚽", color: "#1E3A5F" },
  { id: "padel", label: "Pádel", emoji: "🎾", color: "#E11D48" },
  { id: "tenis", label: "Tenis", emoji: "🎾", color: "#DC2626" },
  { id: "basquet", label: "Básquet", emoji: "🏀", color: "#EA580C" },
];

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [featuredCourts, setFeaturedCourts] = useState<CourtCard[]>(featuredCourtsFallback);
  const [popularCourts, setPopularCourts] = useState<CourtCard[]>(popularCourtsFallback);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function loadCourts() {
      try {
        const [featuredResponse, popularResponse] = await Promise.all([
          CourtsService.getFeaturedCourts(),
          CourtsService.getPopularCourts(),
        ]);

        const featured = mapBackendCourts(featuredResponse.data.data);
        const popular = mapBackendCourts(popularResponse.data.data);

        if (featured.length > 0) {
          setFeaturedCourts(featured.slice(0, 6));
        }

        if (popular.length > 0) {
          setPopularCourts(popular.slice(0, 10));
        }

        setErrorMessage("");
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "No se pudieron cargar las canchas",
        );
      }
    }

    loadCourts();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.headerRow}>
          <Text style={styles.title}>Athlo</Text>
          <TouchableOpacity style={styles.notifButton}>
            <Ionicons name="notifications-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <SearchBar />

        {!!errorMessage && <Text style={styles.errorBanner}>{errorMessage}</Text>}

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

        <View style={styles.sectionHeaderDark}>
          <Text style={styles.sectionTitleDark}>Canchas destacadas</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>Ver todas</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featuredCourts.map((court) => (
            <FeaturedCourtCard
              key={court.id}
              title={court.title}
              subtitle={court.location}
              image={court.image}
              onPress={() => router.push(`/cancha/${court.id}` as never)}
            />
          ))}
        </ScrollView>

        <View style={styles.carouselDots}>
          <View style={styles.dotActive} />
          <View style={styles.dot} />
        </View>

        <View style={styles.sectionWhite}>
          <View style={styles.sectionHeaderLight}>
            <Text style={styles.sectionTitleLight}>Populares</Text>
            <TouchableOpacity>
              <Text style={styles.sectionActionLight}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {popularCourts.map((court) => (
              <PopularCourtCard
                key={court.id}
                price={`L ${court.price}`}
                location={court.title}
                type={court.subtitle}
                rating={court.rating ?? "0.0"}
                image={court.image}
                onPress={() => router.push(`/cancha/${court.id}` as never)}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

function mapBackendCourts(rawCourts: unknown[]): CourtCard[] {
  return rawCourts.map((item, index) => {
    const court = item as {
      idField?: number;
      fieldName?: string;
      pricePerHour?: number | string;
      rating?: number | string;
      Facility?: {
        facilityName?: string;
        address?: string;
        city?: string;
      };
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
    };

    const image = court.FieldImages?.[0]?.imgUrl
      || court.FieldImages?.[0]?.thumbnailUrl
      || popularCourtsFallback[index % popularCourtsFallback.length]?.image
      || featuredCourtsFallback[0].image;

    const locationParts = [
      court.Facility?.facilityName,
      court.Facility?.city ?? court.Facility?.address,
    ].filter(Boolean);

    return {
      id: String(court.idField ?? index + 1),
      title: court.fieldName ?? "Cancha disponible",
      location: locationParts.join(", ") || "Ubicación disponible",
      subtitle: court.SportType?.sportName ?? "Deporte",
      surface: court.SurfaceType?.surfaceName ?? "Superficie",
      price: Number(court.pricePerHour ?? 0),
      rating: String(court.rating ?? "0.0"),
      image,
    };
  });
}
