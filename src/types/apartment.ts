export enum ApartmentStatus {
  AVAILABLE = 'available',
  SIGNED_WITH_DEPOSIT = 'signed_with_deposit',
  RESERVED_UNSIGNED = 'reserved_unsigned',
  RESERVED_WITH_DEPOSIT = 'reserved_with_deposit',
  TEMP_RESERVED = 'temp_reserved'
}

export interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface Apartment {
  id: string;
  code: string;
  status: ApartmentStatus;
  client?: Client;
  floorNumber: number;
  residenceId: string;
}

export interface Floor {
  floorNumber: number;
  floorName: string;
  apartments: Apartment[];
}

export interface Residence {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  totalFloors: number;
  totalApartments: number;
  description: string;
  image: string;
  availableCount: number;
  reservedCount: number;
  soldCount: number;
}

export interface StatusColorMap {
  color: string;
  label: string;
  description: string;
}

export const STATUS_COLORS: Record<ApartmentStatus, StatusColorMap> = {
  [ApartmentStatus.SIGNED_WITH_DEPOSIT]: {
    color: '#3B82F6',
    label: 'Signé + Avance',
    description: 'Contrat signé avec avance payée'
  },
  [ApartmentStatus.RESERVED_UNSIGNED]: {
    color: '#EF4444',
    label: 'Réservé, Non Signé',
    description: 'Réservé, contrat de réservation prêt mais non signé, en discussion'
  },
  [ApartmentStatus.RESERVED_WITH_DEPOSIT]: {
    color: '#10B981',
    label: 'Réservé + Avance',
    description: 'Réservé avec avance, en attente de contrat de réservation'
  },
  [ApartmentStatus.TEMP_RESERVED]: {
    color: '#F59E0B',
    label: 'Réservation Temporaire',
    description: 'Réservation temporaire en cours'
  },
  [ApartmentStatus.AVAILABLE]: {
    color: '#D1D5DB',
    label: 'Disponible',
    description: 'Disponible pour réservation'
  }
};
