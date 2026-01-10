// Types globaux pour l'application DOMAINS
export interface User {
  id: string;
  fullname: string;
  email: string;
  role: 'COMMERCIAL' | 'ADMIN' | 'SUPERADMIN';
  countryInstanceId?: string;
  lastLogin?: Date;
  createdAt: Date;
}

export interface AccessCode {
  id: string;
  code: string;
  role: 'COMMERCIAL' | 'ADMIN' | 'SUPERADMIN';
  active: boolean;
  description: string;
}

export interface Country {
  id: string;
  name: string;
  iso2: string;
  dialCode: string;
}

export interface Instance {
  id: string;
  name: string;
  countryId: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  title: string;
  type: string;
  countryId: string;
  city: string;
  locationAddress: string;
  description: string;
  company: string;
  photoUrl: string;
  published: boolean;
  createdBy: string;
  createdAt: Date;
}

export interface Domains {
  id: string;
  title: string;
  type: string;
  countryId: string;
  city: string;
  locationAddress: string;
  description: string;
  company: string;
  photoUrl: string;
  published: boolean;
  createdBy: string;
  createdAt: Date;
}

export interface Residence {
  id: string;
  projectId: string;
  title: string;
  residenceType: string;
  floorsCount: number;
  unitsCount: number;
  description: string;
  photoUrl: string;
  published: boolean;
  createdAt: Date;
}

export interface Palier {
  id: string;
  residenceId: string;
  title: string;
  unitCount: number;
  description: string;
}

export interface Property {
  id: string;
  residenceId?: string;
  projectId: string;
  title: string;
  propertyType: 'appartement' | 'villa' | 'magasin';
  rooms: number;
  kitchens: number;
  balcony: boolean;
  furnished: boolean;
  surfaceM2: number;
  palierId?: string;
  status: 'Disponible' | 'Sous discussion cliente' | 'Réservé(e)' | 'Soldé(e)' | 'Sous mandat de gestion locative' | 'Offre surclassée';
  published: boolean;
  price: number;
  createdAt: Date;
  photos: PropertyPhoto[];
}

export interface PropertyPhoto {
  id: string;
  propertyId: string;
  photoUrl: string;
}

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  gender: 'M' | 'F';
  phone: string;
  email: string;
  address: string;
  nationality: string;
  idDocumentUrl?: string;
  createdBy: string;
}

export interface Acquisition {
  id: string;
  propertyId: string;
  clientId: string;
  commercialUserId: string;
  amount: number;
  amountType: 'avance' | 'total' | 'autres';
  status: 'Sous discussion' | 'Réservée' | 'Soldée' | 'Offre surclassée';
  dateAcquisition: Date;
  paymentMethod: string;
  note?: string;
  createdAt: Date;
}

export interface Contract {
  id: string;
  acquisitionId: string;
  contractType: 'réservation' | 'gestion locative' | 'vente';
  issuedByUserId: string;
  issuedAt: Date;
  pdfUrl: string;
  status: string;
}

export interface BriefingSlide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface FilterOptions {
  countries: Country[];
  projects: Project[];
  domains: Domains[];
  residences: Residence[];
  paliers: Palier[];
  properties: Property[];
}

export interface DashboardStats {
  totalProjects: number;
  totalProperties: number;
  availableProperties: number;
  reservedProperties: number;
  soldProperties: number;
  totalClients: number;
  totalAcquisitions: number;
  totalContracts: number;
  monthlyRevenue: number;
  recentActivities: Activity[];
}

export interface Activity {
  id: string;
  type: 'project' | 'property' | 'client' | 'acquisition' | 'contract';
  action: string;
  description: string;
  userId: string;
  userName: string;
  createdAt: Date;
}

export type ApartmentStatus =
  | 'available'
  | 'temp_reserved'
  | 'reserved_unsigned'
  | 'reserved_signed'
  | 'signed';

export interface Apartment {
  id: string;
  code: string;
  floor: string;
  building: string;
  residence_id: string;
  status: ApartmentStatus;
  client_name?: string;
  client_info?: any;
  position: number;
  created_at: Date;
  updated_at: Date;
}

export interface Domain {
  id: string;
  title: string;
  domain_type: 'residential' | 'hospital' | 'commercial' | 'mixed' | 'industrial' | 'villa' | 'office';
  project_id: string;
  description: string;
  residences_count: number;
  image_url?: string;
  published: boolean;
  created_at: Date;
  updated_at: Date;
}