import { defineStore } from 'pinia';
import axios from 'axios';
import type { Apartment, Floor, Residence } from '../types/apartment';
import { ApartmentStatus } from '../types/apartment';

interface ApartmentState {
  residences: Residence[];
  floors: Floor[];
  loading: boolean;
  error: string | null;
}

const MOCK_RESIDENCES: Residence[] = [
  {
    id: 'residence-sra',
    name: 'Bâtiment A - Sika Resort',
    address: 'Bord de la lagune de Bè, Lomé-Togo',
    city: 'Lomé',
    postalCode: '20250',
    totalFloors: 6,
    totalApartments: 54,
    description: 'Résidence moderne au cœur de Lomé avec vue panoramique sur la ville',
    image: '/photo 21 copie.png',
    availableCount: 18,
    reservedCount: 22,
    soldCount: 14
  },
  {
    id: 'residence-srb',
    name: 'Bâtiment B - Sika Resort',
    address: 'Bord de la lagune de Bè, Lomé-Togo',
    city: 'Lomé',
    postalCode: '20251',
    totalFloors: 8,
    totalApartments: 72,
    description: 'Luxueuse résidence dans le quartier prisé d\'Anfa avec toutes les commodités',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    availableCount: 12,
    reservedCount: 35,
    soldCount: 25
  },
  {
    id: 'residence-marina',
    name: 'Résidence Marina Bay',
    address: '78 Corniche Ain Diab',
    city: 'Casablanca',
    postalCode: '20180',
    totalFloors: 10,
    totalApartments: 90,
    description: 'Résidence de standing face à l\'océan avec accès direct à la plage',
    image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
    availableCount: 25,
    reservedCount: 40,
    soldCount: 25
  },
  {
    id: 'residence-palmier',
    name: 'Résidence Le Palmier',
    address: '23 Rue des Palmiers',
    city: 'Marrakech',
    postalCode: '40000',
    totalFloors: 5,
    totalApartments: 45,
    description: 'Résidence élégante dans un quartier calme avec jardins paysagers',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
    availableCount: 15,
    reservedCount: 18,
    soldCount: 12
  },
  {
    id: 'residence-medina',
    name: 'Résidence Medina View',
    address: '56 Avenue Hassan II',
    city: 'Rabat',
    postalCode: '10000',
    totalFloors: 7,
    totalApartments: 63,
    description: 'Architecture contemporaine avec vue sur la médina historique',
    image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800',
    availableCount: 20,
    reservedCount: 28,
    soldCount: 15
  },
  {
    id: 'residence-oasis',
    name: 'Résidence Oasis',
    address: '89 Boulevard Zerktouni',
    city: 'Casablanca',
    postalCode: '20300',
    totalFloors: 6,
    totalApartments: 54,
    description: 'Résidence familiale avec espaces verts et aire de jeux pour enfants',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    availableCount: 22,
    reservedCount: 20,
    soldCount: 12
  },
  {
    id: 'residence-horizon',
    name: 'Résidence Horizon',
    address: '34 Rue de la Liberté',
    city: 'Tanger',
    postalCode: '90000',
    totalFloors: 9,
    totalApartments: 81,
    description: 'Résidence haut de gamme avec vue sur le détroit de Gibraltar',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
    availableCount: 30,
    reservedCount: 35,
    soldCount: 16
  },
  {
    id: 'residence-jardin',
    name: 'Résidence Le Jardin',
    address: '67 Avenue des FAR',
    city: 'Agadir',
    postalCode: '80000',
    totalFloors: 4,
    totalApartments: 36,
    description: 'Résidence intime avec jardins méditerranéens et piscine commune',
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
    availableCount: 14,
    reservedCount: 12,
    soldCount: 10
  }
];

const MOCK_CLIENTS = [
  { prefix: 'Ahmed', email: 'ahmed', phone: '661234567' },
  { prefix: 'Fatima', email: 'fatima', phone: '662345678' },
  { prefix: 'Mohamed', email: 'mohamed', phone: '663456789' },
  { prefix: 'Amina', email: 'amina', phone: '664567890' },
  { prefix: 'Youssef', email: 'youssef', phone: '665678901' },
  { prefix: 'Sanaa', email: 'sanaa', phone: '666789012' },
  { prefix: 'Karim', email: 'karim', phone: '667890123' },
  { prefix: 'Houda', email: 'houda', phone: '668901234' },
  { prefix: 'Rachid', email: 'rachid', phone: '669012345' },
  { prefix: 'Zineb', email: 'zineb', phone: '660123456' }
];

export const useApartmentStore = defineStore('apartment', {
  state: (): ApartmentState => ({
    residences: MOCK_RESIDENCES,
    floors: [],
    loading: false,
    error: null
  }),

  getters: {
    getAllResidences: (state) => state.residences,

    getResidenceById: (state) => (residenceId: string) => {
      return state.residences.find(r => r.id === residenceId);
    },

    getFloorsByResidence: (state) => (residenceId: string) => {
      return state.floors.filter(floor =>
        floor.apartments.some(apt => apt.residenceId === residenceId)
      );
    },

    getApartmentById: (state) => (apartmentId: string) => {
      for (const floor of state.floors) {
        const apartment = floor.apartments.find(apt => apt.id === apartmentId);
        if (apartment) return apartment;
      }
      return null;
    }
  },

  actions: {
    async fetchResidenceFloors(residenceId: string) {
      this.loading = true;
      this.error = null;

      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        this.loadMockData(residenceId);
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to load floors';
      } finally {
        this.loading = false;
      }
    },

    async updateApartmentStatus(apartmentId: string, newStatus: ApartmentStatus) {
      try {
        await axios.patch(`/api/apartments/${apartmentId}/status`, {
          status: newStatus
        });

        for (const floor of this.floors) {
          const apartment = floor.apartments.find(apt => apt.id === apartmentId);
          if (apartment) {
            apartment.status = newStatus;
            break;
          }
        }
      } catch (error) {
        for (const floor of this.floors) {
          const apartment = floor.apartments.find(apt => apt.id === apartmentId);
          if (apartment) {
            apartment.status = newStatus;
            break;
          }
        }
      }
    },

    loadMockData(residenceId: string) {
      const residence = this.residences.find(r => r.id === residenceId);
      if (!residence) return;

      const mockFloors: Floor[] = [];
      const floorNames = [
        'PREMIER ETAGE',
        'DEUXIEME ETAGE',
        'TROISIEME ETAGE',
        'QUATRIEME ETAGE',
        'CINQUIEME ETAGE',
        'SIXIEME ETAGE',
        'SEPTIEME ETAGE',
        'HUITIEME ETAGE',
        'NEUVIEME ETAGE',
        'DIXIEME ETAGE'
      ];

      for (let i = residence.totalFloors; i >= 1; i--) {
        mockFloors.push({
          floorNumber: i,
          floorName: floorNames[i - 1] || `ETAGE ${i}`,
          apartments: this.generateMockApartments(i, residenceId)
        });
      }

      this.floors = mockFloors;
    },

    generateMockApartments(floorNumber: number, residenceId: string): Apartment[] {
      const apartments: Apartment[] = [];
      const statuses = [
        ApartmentStatus.AVAILABLE,
        ApartmentStatus.SIGNED_WITH_DEPOSIT,
        ApartmentStatus.RESERVED_UNSIGNED,
        ApartmentStatus.RESERVED_WITH_DEPOSIT,
        ApartmentStatus.TEMP_RESERVED
      ];

      const statusWeights = [0.35, 0.25, 0.15, 0.15, 0.10];

      const getWeightedRandomStatus = () => {
        const random = Math.random();
        let cumulative = 0;
        for (let i = 0; i < statuses.length; i++) {
          cumulative += statusWeights[i];
          if (random < cumulative) {
            return statuses[i];
          }
        }
        return statuses[0];
      };

      for (let i = 1; i <= 9; i++) {
        const apartmentCode = `A${floorNumber}0${i}`;
        const status = getWeightedRandomStatus();

        let client = undefined;
        if (status !== ApartmentStatus.AVAILABLE) {
          const clientData = MOCK_CLIENTS[Math.floor(Math.random() * MOCK_CLIENTS.length)];
          const suffix = Math.floor(Math.random() * 100);
          client = {
            id: `client-${residenceId}-${floorNumber}-${i}`,
            name: `${clientData.prefix} ${['Alami', 'Benjelloun', 'El Fassi', 'Tahiri', 'Chraibi'][Math.floor(Math.random() * 5)]}`,
            email: `${clientData.email}.${suffix}@example.com`,
            phone: `+212 ${clientData.phone}`
          };
        }

        apartments.push({
          id: `${residenceId}-${floorNumber}-${i}`,
          code: apartmentCode,
          status,
          floorNumber,
          residenceId,
          client
        });
      }

      return apartments;
    }
  }
});
