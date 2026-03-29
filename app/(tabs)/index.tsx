import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import CategoryChip from "@/components/home/categoryChip";
import FeaturedCourtCard from "@/components/home/featuredCard";
import PopularCourtCard from "@/components/home/popularCard";
import SearchBar from "@/components/home/searchBar";
import fieldService from "@/services/other_services/field.service";
import sportTypeService from "@/services/other_services/sportType.service";
import styles from "@/styles/home.styles";
import { Field, SportType } from "@/types/other_types/facility";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState(0);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [sort, setSort] = useState(0);
  const [param, setParam] = useState("reviewCount");

  const [categories, setCategories] = useState<SportType[]>();
  const [featuredCourts, setFeaturedCourts] = useState<Field[]>();
  const [popularCourts, setPopularCourts] = useState<Field[]>();

  const router = useRouter();

  useEffect( ()=> {
    console.log("initializer");

    sportTypeService.getAllTypes().then((response)=>{
      setCategories(response.data);
    });

    // fieldService.getAllFields(page,size,sort,"reviews").then((response) => {
    //   setPopularCourts(response.data.data);
      
    // });

  },[])

  useEffect(()=>{
    console.log("useEffect page,size,sort,param");

    fieldService.getFieldsBySportType(activeCategory,page,size,sort,param).then((response) => {
      if(!response.hasError){
        setFeaturedCourts(response.data.data);
        setPopularCourts(response.data.data);
      }else{
        setFeaturedCourts(undefined);
        setPopularCourts(undefined);
      }
    });
    
  },[page,size,sort,param,activeCategory]);

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
          <CategoryChip
              key={0}
              label={"Todos"}
              emoji={"&#9917;"}
              color={"#2563EB"}
              isActive={activeCategory == 0}
              onPress={() => setActiveCategory(0)}
            />
          {categories && (
            categories.map((cat) => (
              <CategoryChip
                key={cat.idSportType}
                label={cat.sportName}
                emoji={cat.icon ?? "&#9917;"}
                color={cat.color ?? "#2563EB"}
                isActive={activeCategory == cat.idSportType}
                onPress={() => setActiveCategory(cat.idSportType)}
              />
            ))
          )}
        </ScrollView>

        {/* Canchas Destacadas */}
        <View style={styles.sectionHeaderDark}>
          <Text style={styles.sectionTitleDark}>Canchas Destacadas</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>Ver Todas</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featuredCourts ? (
            featuredCourts.map((court) => (
              <FeaturedCourtCard
                key={court.idField}
                title={court.fieldName}
                subtitle={court.Facility.address}
                image={court.FieldImages[0]?.thumbnailUrl ?? court.FieldImages[0].imgUrl}
                onPress={() => router.push(`/cancha/${court.idField}` as any)}
              />
            ))
          ): (
              <Text>No hay canchas disponibles</Text>
            )}
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
            {popularCourts ? (
              popularCourts.map((court) => (
                <PopularCourtCard
                  key={court.idField}
                  price={`L ${court.pricePerDay ?? court.pricePerHour}`}
                  location={court.Facility.city}
                  type={court.SurfaceType.surfaceName}
                  rating={court.rating.toString()}
                  image={court.FieldImages[0]?.thumbnailUrl ?? court.FieldImages[0].imgUrl}
                  onPress={() => router.push(`/cancha/${court.idField}` as any)}
                />
              ))
            ): (
              <Text>No hay canchas disponibles</Text>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}