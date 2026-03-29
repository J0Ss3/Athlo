export interface FieldImage {
  idFieldImage: number;
  idField: number;
  imgUrl: string;
  thumbnailUrl: string | null;
  isMainImg: boolean;
}

export interface Facility {
  idFacility: number;
  idProvider: number;
  facilityName: string;
  address: string;
  city: string;
  stateProvince: string | null;
  postalCode: string | null;
  country: string;
  latitude: number | null;
  longitude: number | null;
  phoneNumber: string | null;
  email: string | null;
  description: string | null;
  parkingAvailable: boolean;
  parkingFee: number | null;
  wifiAvailable: boolean;
  hasLighting: boolean;
  hasChangingRooms: boolean;
  hasShowerFacilities: boolean;
  maxCapacity: number | null;
  isActive: boolean;
}

export interface SportType {
  idSportType: number;
  sportName: string;
  icon: string | null;
  color: string | null;
  description: string | null;
}

export interface SurfaceType {
  idSurfaceType: number;
  surfaceName: string;
  description: string | null;
}

export interface Field {
  idField: number;
  idFacility: number;
  idSportType: number;
  fieldName: string;
  fieldNumber: number | null;
  idSurfaceType: number;
  lengthValue: number | null;
  widthValue: number | null;
  unitType: string;
  capacity: number | null;
  pricePerHour: number;
  pricePerDay: number | null;
  isAvailable: boolean;
  isPremium: boolean;
  description: string | null;
  rating: number;
  reviewCount: number;
  FieldImages: FieldImage[];
  Facility: Facility;
  SportType: SportType;
  SurfaceType: SurfaceType;
}