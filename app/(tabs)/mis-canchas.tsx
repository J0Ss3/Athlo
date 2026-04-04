import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Platform,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AdminHeader from "@/components/admin/AdminHeader";
import CanchasEmptyState from "@/components/admin/CanchasEmptyState";
import { AdminFieldsService } from "@/services/admin-fields.service";
import styles from "@/styles/mis-canchas.styles";

type Option = {
  id: number;
  label: string;
};

type CourtItem = {
  id: string;
  title: string;
  facility: string;
  sport: string;
  price: number;
  capacity: number;
};

type ScheduleDraft = {
  dayOfWeek: number;
  label: string;
  enabled: boolean;
  openingTime: string;
  closingTime: string;
};

type ImageDraft = {
  uri: string;
  fileName: string;
  mimeType: string;
  base64Image: string;
};

const defaultSchedules: ScheduleDraft[] = [
  { dayOfWeek: 0, label: "Domingo", enabled: false, openingTime: "", closingTime: "" },
  { dayOfWeek: 1, label: "Lunes", enabled: false, openingTime: "", closingTime: "" },
  { dayOfWeek: 2, label: "Martes", enabled: false, openingTime: "", closingTime: "" },
  { dayOfWeek: 3, label: "Miercoles", enabled: false, openingTime: "", closingTime: "" },
  { dayOfWeek: 4, label: "Jueves", enabled: false, openingTime: "", closingTime: "" },
  { dayOfWeek: 5, label: "Viernes", enabled: false, openingTime: "", closingTime: "" },
  { dayOfWeek: 6, label: "Sabado", enabled: false, openingTime: "", closingTime: "" },
];

const initialFormState = {
  idFacility: "",
  idSportType: "",
  idSurfaceType: "",
  fieldName: "",
  fieldNumber: "",
  lengthValue: "",
  widthValue: "",
  capacity: "",
  pricePerHour: "",
  pricePerDay: "",
  description: "",
  isPremium: false,
  unitType: "METERS",
};

export default function MisCanchasScreen() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPickingImage, setIsPickingImage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [courts, setCourts] = useState<CourtItem[]>([]);
  const [facilities, setFacilities] = useState<Option[]>([]);
  const [sportTypes, setSportTypes] = useState<Option[]>([]);
  const [surfaceTypes, setSurfaceTypes] = useState<Option[]>([]);
  const [form, setForm] = useState(initialFormState);
  const [schedules, setSchedules] = useState<ScheduleDraft[]>(defaultSchedules);
  const [selectedImage, setSelectedImage] = useState<ImageDraft | null>(null);

  useEffect(() => {
    loadScreenData();
  }, []);

  const selectedFacilityLabel = useMemo(
    () =>
      facilities.find((item) => String(item.id) === form.idFacility)?.label ??
      "Selecciona una localizacion",
    [facilities, form.idFacility],
  );

  const selectedSportLabel = useMemo(
    () =>
      sportTypes.find((item) => String(item.id) === form.idSportType)?.label ??
      "Selecciona un deporte",
    [sportTypes, form.idSportType],
  );

  const selectedSurfaceLabel = useMemo(
    () =>
      surfaceTypes.find((item) => String(item.id) === form.idSurfaceType)?.label ??
      "Selecciona una superficie",
    [surfaceTypes, form.idSurfaceType],
  );

  async function loadScreenData() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const [facilitiesResponse, sportsResponse, surfacesResponse, courtsResponse] =
        await Promise.all([
          AdminFieldsService.getProviderFacilities(),
          AdminFieldsService.getSportTypes(),
          AdminFieldsService.getSurfaceTypes(),
          AdminFieldsService.getProviderCourts(),
        ]);

      setFacilities(
        facilitiesResponse.map((item) => ({
          id: item.idFacility,
          label: item.facilityName,
        })),
      );

      setSportTypes(
        sportsResponse.map((item) => ({
          id: item.idSportType,
          label: item.sportName,
        })),
      );

      setSurfaceTypes(
        surfacesResponse.map((item) => ({
          id: item.idSurfaceType,
          label: item.surfaceName,
        })),
      );

      setCourts(courtsResponse);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "No se pudieron cargar las canchas",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function updateForm(field: keyof typeof initialFormState, value: string | boolean) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function updateSchedule(
    dayOfWeek: number,
    patch: Partial<Pick<ScheduleDraft, "enabled" | "openingTime" | "closingTime">>,
  ) {
    setSchedules((prev) =>
      prev.map((item) =>
        item.dayOfWeek === dayOfWeek
          ? {
              ...item,
              ...patch,
            }
          : item,
      ),
    );
  }

  async function handlePickImage() {
    try {
      setFormError("");
      setIsPickingImage(true);

      const permission =
        Platform.OS === "web"
          ? { granted: true }
          : await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        throw new Error("Necesitas permitir acceso a tus fotos para subir la imagen.");
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
        base64: false,
      });

      if (result.canceled || result.assets.length === 0) {
        return;
      }

      const asset = result.assets[0];
      const base64Image = await assetToBase64(asset.uri);
      const mimeType = asset.mimeType ?? guessMimeType(asset.uri);
      const extension = mimeType.split("/")[1] ?? "jpg";
      const fileName = asset.fileName ?? `cancha-${Date.now()}.${extension}`;

      setSelectedImage({
        uri: asset.uri,
        fileName,
        mimeType,
        base64Image,
      });
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "No se pudo seleccionar la imagen.",
      );
    } finally {
      setIsPickingImage(false);
    }
  }

  async function handleCreateCourt() {
    try {
      setFormError("");
      const payload = buildPayload(form, schedules, selectedImage);

      setIsSubmitting(true);
      await AdminFieldsService.createCourt(payload);

      Alert.alert("Cancha creada", "La cancha se registro correctamente.");
      resetForm();
      setIsFormVisible(false);
      await loadScreenData();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "No se pudo crear la cancha");
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetForm() {
    setForm(initialFormState);
    setSchedules(defaultSchedules);
    setSelectedImage(null);
    setFormError("");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AdminHeader title="Mis Canchas" />

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.sectionTitle}>Mis Canchas</Text>

          <TouchableOpacity style={styles.addButton} onPress={() => setIsFormVisible(true)}>
            <Feather name="plus" size={18} color="#fff" />
            <Text style={styles.addButtonText}>Agregar cancha</Text>
          </TouchableOpacity>
        </View>

        {!!errorMessage && <Text style={styles.errorBanner}>{errorMessage}</Text>}

        {isLoading ? (
          <View style={styles.centerState}>
            <ActivityIndicator size="large" color="#F45100" />
            <Text style={styles.loadingText}>Cargando canchas...</Text>
          </View>
        ) : courts.length === 0 ? (
          <CanchasEmptyState />
        ) : (
          <FlatList
            data={courts}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardMeta}>{item.facility}</Text>
                <Text style={styles.cardMeta}>Deporte: {item.sport}</Text>
                <Text style={styles.cardMeta}>Capacidad: {item.capacity}</Text>
                <Text style={styles.cardPrice}>L {item.price.toFixed(2)} / hora</Text>
              </View>
            )}
          />
        )}
      </View>

      <Modal
        visible={isFormVisible}
        animationType="slide"
        onRequestClose={() => {
          setIsFormVisible(false);
          resetForm();
        }}
      >
        <SafeAreaView style={styles.modalSafeArea}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Agregar cancha</Text>
            <TouchableOpacity
              onPress={() => {
                setIsFormVisible(false);
                resetForm();
              }}
            >
              <Feather name="x" size={24} color="#0E2240" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.formContent}>
            <Text style={styles.formHint}>
              Completa solo datos validos para la cancha. Los campos numericos aceptan numeros y
              los horarios usan formato HH:MM.
            </Text>

            <FieldLabel text="Imagen principal" />
            <TouchableOpacity
              style={[
                styles.imagePickerButton,
                selectedImage && styles.imagePickerButtonActive,
              ]}
              onPress={handlePickImage}
              disabled={isPickingImage}
            >
              <View style={styles.imagePickerIcon}>
                <Feather name="image" size={22} color="#F45100" />
              </View>
              <Text style={styles.imagePickerTitle}>
                {isPickingImage ? "Preparando galeria..." : "Seleccionar foto de la cancha"}
              </Text>
              <Text style={styles.imagePickerSubtitle}>
                Sube la foto que saldra en el home y en el detalle de la cancha.
              </Text>
            </TouchableOpacity>

            {selectedImage && (
              <View style={styles.imagePreviewCard}>
                <Image source={{ uri: selectedImage.uri }} style={styles.imagePreview} contentFit="cover" />
                <View style={styles.imagePreviewFooter}>
                  <Text style={styles.imagePreviewText} numberOfLines={1}>
                    {selectedImage.fileName}
                  </Text>
                  <TouchableOpacity onPress={() => setSelectedImage(null)}>
                    <Text style={styles.imagePreviewAction}>Quitar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <FieldLabel text="Localizacion" />
            <SelectorField
              label={selectedFacilityLabel}
              options={facilities}
              selectedId={form.idFacility}
              onSelect={(value) => updateForm("idFacility", String(value))}
            />

            <FieldLabel text="Deporte" />
            <SelectorField
              label={selectedSportLabel}
              options={sportTypes}
              selectedId={form.idSportType}
              onSelect={(value) => updateForm("idSportType", String(value))}
            />

            <FieldLabel text="Superficie" />
            <SelectorField
              label={selectedSurfaceLabel}
              options={surfaceTypes}
              selectedId={form.idSurfaceType}
              onSelect={(value) => updateForm("idSurfaceType", String(value))}
            />

            <FieldLabel text="Nombre de la cancha" />
            <TextInput
              style={styles.input}
              value={form.fieldName}
              onChangeText={(value) => updateForm("fieldName", value)}
              placeholder="Ej. Cancha Central 1"
            />

            <FieldLabel text="Numero de cancha" />
            <TextInput
              style={styles.input}
              value={form.fieldNumber}
              onChangeText={(value) => updateForm("fieldNumber", digitsOnly(value))}
              keyboardType="number-pad"
              placeholder="Ej. 1"
            />

            <FieldLabel text="Capacidad" />
            <TextInput
              style={styles.input}
              value={form.capacity}
              onChangeText={(value) => updateForm("capacity", digitsOnly(value))}
              keyboardType="number-pad"
              placeholder="Cantidad maxima de personas"
            />

            <FieldLabel text="Largo" />
            <TextInput
              style={styles.input}
              value={form.lengthValue}
              onChangeText={(value) => updateForm("lengthValue", decimalOnly(value))}
              keyboardType="numeric"
              placeholder="Ej. 40"
            />

            <FieldLabel text="Ancho" />
            <TextInput
              style={styles.input}
              value={form.widthValue}
              onChangeText={(value) => updateForm("widthValue", decimalOnly(value))}
              keyboardType="numeric"
              placeholder="Ej. 20"
            />

            <FieldLabel text="Unidad de medida" />
            <View style={styles.unitRow}>
              <TouchableOpacity
                style={[styles.unitButton, form.unitType === "METERS" && styles.unitButtonActive]}
                onPress={() => updateForm("unitType", "METERS")}
              >
                <Text
                  style={[
                    styles.unitButtonText,
                    form.unitType === "METERS" && styles.unitButtonTextActive,
                  ]}
                >
                  Metros
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.unitButton, form.unitType === "FEET" && styles.unitButtonActive]}
                onPress={() => updateForm("unitType", "FEET")}
              >
                <Text
                  style={[
                    styles.unitButtonText,
                    form.unitType === "FEET" && styles.unitButtonTextActive,
                  ]}
                >
                  Pies
                </Text>
              </TouchableOpacity>
            </View>

            <FieldLabel text="Precio por hora" />
            <TextInput
              style={styles.input}
              value={form.pricePerHour}
              onChangeText={(value) => updateForm("pricePerHour", decimalOnly(value))}
              keyboardType="numeric"
              placeholder="Ej. 350"
            />

            <FieldLabel text="Precio por dia" />
            <TextInput
              style={styles.input}
              value={form.pricePerDay}
              onChangeText={(value) => updateForm("pricePerDay", decimalOnly(value))}
              keyboardType="numeric"
              placeholder="Opcional"
            />

            <View style={styles.switchRow}>
              <Text style={styles.label}>Cancha premium</Text>
              <Switch
                value={form.isPremium}
                onValueChange={(value) => updateForm("isPremium", value)}
                trackColor={{ false: "#D1D5DB", true: "#FDBA74" }}
                thumbColor={form.isPremium ? "#F45100" : "#fff"}
              />
            </View>

            <FieldLabel text="Descripcion" />
            <TextInput
              style={[styles.input, styles.textArea]}
              value={form.description}
              onChangeText={(value) => updateForm("description", value)}
              placeholder="Describe la cancha"
              multiline
            />

            <Text style={styles.scheduleTitle}>Horarios disponibles</Text>
            <Text style={styles.scheduleHint}>
              Activa cada dia que aplique e ingresa hora de apertura y cierre en formato 24 horas.
            </Text>

            {schedules.map((item) => (
              <View key={item.dayOfWeek} style={styles.scheduleCard}>
                <View style={styles.scheduleHeader}>
                  <Text style={styles.scheduleDay}>{item.label}</Text>
                  <Switch
                    value={item.enabled}
                    onValueChange={(value) => updateSchedule(item.dayOfWeek, { enabled: value })}
                    trackColor={{ false: "#D1D5DB", true: "#BFDBFE" }}
                    thumbColor={item.enabled ? "#2563EB" : "#fff"}
                  />
                </View>

                {item.enabled && (
                  <View style={styles.scheduleInputsRow}>
                    <TextInput
                      style={[styles.input, styles.timeInput]}
                      value={item.openingTime}
                      onChangeText={(value) =>
                        updateSchedule(item.dayOfWeek, {
                          openingTime: formatTimeInput(value),
                        })
                      }
                      keyboardType="number-pad"
                      placeholder="08:00"
                      maxLength={5}
                    />
                    <TextInput
                      style={[styles.input, styles.timeInput]}
                      value={item.closingTime}
                      onChangeText={(value) =>
                        updateSchedule(item.dayOfWeek, {
                          closingTime: formatTimeInput(value),
                        })
                      }
                      keyboardType="number-pad"
                      placeholder="18:00"
                      maxLength={5}
                    />
                  </View>
                )}
              </View>
            ))}

            {!!formError && <Text style={styles.formError}>{formError}</Text>}

            <TouchableOpacity
              style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
              onPress={handleCreateCourt}
              disabled={isSubmitting}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? "Guardando..." : "Guardar cancha"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

function FieldLabel({ text }: { text: string }) {
  return <Text style={styles.label}>{text}</Text>;
}

function SelectorField({
  label,
  options,
  selectedId,
  onSelect,
}: {
  label: string;
  options: Option[];
  selectedId: string;
  onSelect: (value: number) => void;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity style={styles.selector} onPress={() => setVisible(true)}>
        <Text style={[styles.selectorText, !selectedId && styles.selectorPlaceholder]}>{label}</Text>
        <Feather name="chevron-down" size={18} color="#6B7280" />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <View style={styles.selectorOverlay}>
          <View style={styles.selectorModal}>
            <Text style={styles.selectorTitle}>Selecciona una opcion</Text>
            <ScrollView>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.selectorOption}
                  onPress={() => {
                    onSelect(option.id);
                    setVisible(false);
                  }}
                >
                  <Text style={styles.selectorOptionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.selectorClose} onPress={() => setVisible(false)}>
              <Text style={styles.selectorCloseText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

function buildPayload(
  form: typeof initialFormState,
  schedules: ScheduleDraft[],
  selectedImage: ImageDraft | null,
) {
  if (!form.idFacility || !form.idSportType || !form.idSurfaceType || !form.fieldName.trim()) {
    throw new Error("Completa localizacion, deporte, superficie y nombre de la cancha.");
  }

  if (!form.capacity || !form.pricePerHour) {
    throw new Error("Capacidad y precio por hora son obligatorios.");
  }

  const enabledSchedules = schedules
    .filter((item) => item.enabled)
    .map((item) => {
      if (!isValidTime(item.openingTime) || !isValidTime(item.closingTime)) {
        throw new Error(`Revisa los horarios de ${item.label}. Usa formato HH:MM.`);
      }

      return {
        dayOfWeek: item.dayOfWeek,
        openingTime: `${item.openingTime}:00`,
        closingTime: `${item.closingTime}:00`,
      };
    });

  if (enabledSchedules.length === 0) {
    throw new Error("Debes agregar al menos un horario disponible.");
  }

  return {
    idFacility: Number(form.idFacility),
    idSportType: Number(form.idSportType),
    fieldName: form.fieldName.trim(),
    fieldNumber: form.fieldNumber ? Number(form.fieldNumber) : undefined,
    idSurfaceType: Number(form.idSurfaceType),
    lengthValue: form.lengthValue ? Number(form.lengthValue) : undefined,
    widthValue: form.widthValue ? Number(form.widthValue) : undefined,
    unitType: form.unitType,
    capacity: Number(form.capacity),
    pricePerHour: Number(form.pricePerHour),
    pricePerDay: form.pricePerDay ? Number(form.pricePerDay) : undefined,
    isPremium: form.isPremium,
    description: form.description.trim() || undefined,
    operatingHours: enabledSchedules,
    images: selectedImage
      ? [
          {
            base64Image: selectedImage.base64Image,
            isMain: true,
          },
        ]
      : undefined,
  };
}

function digitsOnly(value: string) {
  return value.replace(/[^\d]/g, "");
}

function decimalOnly(value: string) {
  const clean = value.replace(/[^\d.]/g, "");
  const parts = clean.split(".");
  if (parts.length <= 2) {
    return clean;
  }
  return `${parts[0]}.${parts.slice(1).join("")}`;
}

function formatTimeInput(value: string) {
  const clean = value.replace(/[^\d]/g, "").slice(0, 4);
  if (clean.length <= 2) {
    return clean;
  }
  return `${clean.slice(0, 2)}:${clean.slice(2)}`;
}

function isValidTime(value: string) {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
}

function guessMimeType(uri: string) {
  const lowerUri = uri.toLowerCase();

  if (lowerUri.endsWith(".png")) {
    return "image/png";
  }

  if (lowerUri.endsWith(".webp")) {
    return "image/webp";
  }

  return "image/jpeg";
}

async function assetToBase64(uri: string) {
  const response = await fetch(uri);
  const blob = await response.blob();

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("No se pudo preparar la imagen seleccionada."));
    };

    reader.onerror = () => {
      reject(new Error("No se pudo leer la imagen seleccionada."));
    };

    reader.readAsDataURL(blob);
  });
}
