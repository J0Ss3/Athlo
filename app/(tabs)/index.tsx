import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Modal, ScrollView, Text, TextInput,
  TouchableOpacity, View, FlatList,
} from 'react-native';

import AthloLogo from '@/components/common/AthloLogo';
import CategoryChip from '@/components/home/categoryChip';
import FeaturedCourtCard from '@/components/home/featuredCard';
import PopularCourtCard from '@/components/home/popularCard';
import styles from '@/styles/home.styles';

// ─── DATOS — Ampliar canchas por categoría ────────────────────────────────────
const ALL_COURTS = [
  // Pádel
  { id: '1', title: 'Pádel Club Miramontes', location: 'Col. Miramontes, Tegucigalpa', subtitle: 'Pádel', surface: 'Cristal', lighting: 'LED', price: 2450, rating: '4.8', category: 'padel', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800', schedules: ['06:00','07:00','08:00','09:00','10:00','11:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'] },
  { id: '2', title: 'Pádel Premium Lomas', location: 'Lomas del Guijarro, Tegucigalpa', subtitle: 'Pádel', surface: 'Cristal', lighting: 'LED', price: 3200, rating: '4.9', category: 'padel', image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800', schedules: ['08:00','09:00','10:00','11:00','16:00','17:00','18:00','19:00','20:00'] },
  { id: '3', title: 'Pádel Club Palmira', location: 'Col. Palmira, Tegucigalpa', subtitle: 'Pádel', surface: 'Cristal', lighting: 'Reflectores', price: 2200, rating: '4.5', category: 'padel', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600', schedules: ['07:00','08:00','09:00','17:00','18:00','19:00','20:00','21:00'] },
  // Fútbol
  { id: '4', title: 'Canchas Agua Dulce', location: 'Res. Agua Dulce, Tegucigalpa', subtitle: 'Fútbol', surface: 'Sintética', lighting: 'Reflectores', price: 2450, rating: '4.8', category: 'futbol', image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800', schedules: ['06:00','07:00','08:00','16:00','17:00','18:00','19:00','20:00'] },
  { id: '5', title: 'Cancha Futeca', location: 'Col. El Trapiche, Tegucigalpa', subtitle: 'Fútbol', surface: 'Sintética', lighting: 'LED', price: 2200, rating: '4.7', category: 'futbol', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800', schedules: ['07:00','08:00','09:00','17:00','18:00','19:00','20:00'] },
  { id: '6', title: 'Cancha Los Pinos', location: 'Los Pinos, Tegucigalpa', subtitle: 'Fútbol', surface: 'Grama Natural', lighting: 'LED', price: 1800, rating: '4.5', category: 'futbol', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800', schedules: ['06:00','07:00','08:00','09:00','16:00','17:00','18:00','19:00'] },
  { id: '7', title: 'Estadio Morazán', location: 'Blvd. Morazán, Tegucigalpa', subtitle: 'Fútbol', surface: 'Grama Sintética', lighting: 'Estadio', price: 3500, rating: '4.9', category: 'futbol', image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600', schedules: ['08:00','09:00','10:00','15:00','16:00','17:00','18:00','19:00','20:00'] },
  // Tenis
  { id: '8', title: 'Tenis Club Palmira', location: 'Col. Palmira, Tegucigalpa', subtitle: 'Tenis', surface: 'Arcilla', lighting: 'LED', price: 2200, rating: '4.6', category: 'tenis', image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600', schedules: ['08:00','09:00','10:00','11:00','14:00','15:00','16:00','17:00','18:00'] },
  { id: '9', title: 'Tenis Real Country', location: 'Real Country Club, Tegucigalpa', subtitle: 'Tenis', surface: 'Dura', lighting: 'Reflectores', price: 2800, rating: '4.7', category: 'tenis', image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800', schedules: ['07:00','08:00','09:00','16:00','17:00','18:00','19:00'] },
  // Básquet
  { id: '10', title: 'Básquet Arena TGU', location: 'Centro, Tegucigalpa', subtitle: 'Básquet', surface: 'Parquet', lighting: 'LED', price: 1500, rating: '4.4', category: 'basquet', image: 'https://images.unsplash.com/photo-1546519638405-a2e16e3e6d8f?w=800', schedules: ['08:00','09:00','10:00','11:00','16:00','17:00','18:00','19:00','20:00'] },
  { id: '11', title: 'Polideportivo Comayagüela', location: 'Comayagüela, Tegucigalpa', subtitle: 'Básquet', surface: 'Cemento', lighting: 'Reflectores', price: 1200, rating: '4.2', category: 'basquet', image: 'https://images.unsplash.com/photo-1546519638405-a2e16e3e6d8f?w=600', schedules: ['07:00','08:00','09:00','15:00','16:00','17:00','18:00','19:00'] },
];

const CATEGORIES = [
  { id: 'todos', label: 'Todos', emoji: '⚽', color: '#2563EB' },
  { id: 'futbol', label: 'Fútbol', emoji: '⚽', color: '#1E3A5F' },
  { id: 'padel', label: 'Pádel', emoji: '🏓', color: '#E11D48' },
  { id: 'tenis', label: 'Tenis', emoji: '🎾', color: '#DC2626' },
  { id: 'basquet', label: 'Básquet', emoji: '🏀', color: '#EA580C' },
];

// Notificaciones mock (conectar al backend cuando esté disponible)
const MOCK_NOTIFS = [
  { id: '1', message: 'Tu reserva del 23 mar a las 6:00 PM fue confirmada', read: false, createdAt: '2026-03-23' },
  { id: '2', message: 'Nueva cancha disponible en tu zona: Pádel Premium Lomas', read: false, createdAt: '2026-03-22' },
  { id: '3', message: 'Recuerda tu reserva mañana a las 8:00 PM', read: true, createdAt: '2026-03-21' },
];

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchText, setSearchText] = useState('');
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifs, setNotifs] = useState(MOCK_NOTIFS);
  const router = useRouter();

  const unreadCount = notifs.filter(n => !n.read).length;

  // Filtrar canchas por categoría y búsqueda
  const filteredCourts = ALL_COURTS.filter(c => {
    const matchCat = activeCategory === 'todos' || c.category === activeCategory;
    const matchSearch = !searchText.trim() ||
      c.title.toLowerCase().includes(searchText.toLowerCase()) ||
      c.location.toLowerCase().includes(searchText.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(searchText.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filteredCourts.slice(0, 3);
  const popular = filteredCourts.slice(0, 5);

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));

  const goToAll = () => {
    // Navegar a página de todas las canchas pasando la categoría activa
    router.push({ pathname: '/(tabs)/mis-reservas' as any, params: { category: activeCategory } });
    // NOTA: cuando crees una pantalla /all-courts, cambia mis-reservas por esa ruta
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Header con Logo SVG + Notificaciones */}
        <View style={styles.headerRow}>
          {/* LOGO SVG — reemplaza el <Text>Athlo</Text> anterior */}
          <AthloLogo width={100} height={50} />

          <TouchableOpacity style={styles.notifButton} onPress={() => setShowNotifs(true)}>
            <Ionicons name="notifications-outline" size={22} color="#fff" />
            {unreadCount > 0 && (
              <View style={{
                position: 'absolute', top: 6, right: 6,
                width: 8, height: 8, borderRadius: 4, backgroundColor: '#F45100',
              }} />
            )}
          </TouchableOpacity>
        </View>

        {/* Buscador funcional */}
        <View style={{
          backgroundColor: '#fff', borderRadius: 14, height: 46,
          flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, marginBottom: 20,
        }}>
          <Ionicons name="search" size={20} color="#A0A7B4" />
          <TextInput
            placeholder="Buscar canchas..."
            placeholderTextColor="#A0A7B4"
            style={{ marginLeft: 8, flex: 1, color: '#1e3a5f', fontSize: 14 }}
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={18} color="#A0A7B4" />
            </TouchableOpacity>
          )}
        </View>

        {/* Categorías — filtran las canchas */}
        <Text style={styles.categoriesTitle}>Categorías</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesRow}>
          {CATEGORIES.map(cat => (
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
          <TouchableOpacity onPress={goToAll}>
            <Text style={styles.sectionAction}>Ver Todas</Text>
          </TouchableOpacity>
        </View>

        {featured.length === 0 ? (
          <View style={{ paddingVertical: 20, alignItems: 'center' }}>
            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
              No hay canchas en esta categoría
            </Text>
          </View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featured.map(court => (
              <FeaturedCourtCard
                key={court.id}
                title={court.title}
                subtitle={court.location}
                image={court.image}
                onPress={() => router.push(`/cancha/${court.id}` as any)}
              />
            ))}
          </ScrollView>
        )}

        <View style={styles.carouselDots}>
          <View style={styles.dotActive} />
          <View style={styles.dot} />
        </View>

        {/* Populares */}
        <View style={styles.sectionWhite}>
          <View style={styles.sectionHeaderLight}>
            <Text style={styles.sectionTitleLight}>Populares</Text>
            <TouchableOpacity onPress={goToAll}>
              <Text style={styles.sectionActionLight}>Ver Todas</Text>
            </TouchableOpacity>
          </View>

          {popular.length === 0 ? (
            <View style={{ paddingVertical: 20, alignItems: 'center' }}>
              <Text style={{ color: '#7A8394', fontSize: 14 }}>Sin resultados</Text>
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {popular.map(court => (
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
          )}
        </View>
      </ScrollView>

      {/* Modal de Notificaciones */}
      <Modal visible={showNotifs} transparent animationType="fade" onRequestClose={() => setShowNotifs(false)}>
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-start', alignItems: 'flex-end', paddingTop: 90, paddingRight: 16 }}
          activeOpacity={1}
          onPress={() => setShowNotifs(false)}
        >
          <View style={{ backgroundColor: '#fff', borderRadius: 16, width: 300, maxHeight: 360, overflow: 'hidden' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
              <Text style={{ fontWeight: '700', fontSize: 15, color: '#1e3a5f' }}>Notificaciones</Text>
              {unreadCount > 0 && (
                <TouchableOpacity onPress={markAllRead}>
                  <Text style={{ color: '#F45100', fontSize: 12 }}>Marcar todas leídas</Text>
                </TouchableOpacity>
              )}
            </View>
            <FlatList
              data={notifs}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderBottomColor: '#f3f4f6', backgroundColor: item.read ? '#fff' : '#fff8f5' }}
                  onPress={() => setNotifs(prev => prev.map(n => n.id === item.id ? { ...n, read: true } : n))}
                >
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: item.read ? 'transparent' : '#F45100', marginTop: 4, marginRight: 10 }} />
                  <Text style={{ flex: 1, fontSize: 13, color: '#374151' }}>{item.message}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text style={{ textAlign: 'center', padding: 20, color: '#9ca3af' }}>Sin notificaciones</Text>}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
