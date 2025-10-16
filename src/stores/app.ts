import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type {
  Country,
  Project,
  Residence,
  Palier,
  Property,
  Client,
  Acquisition,
  Contract,
  BriefingSlide,
  DashboardStats
} from '@/types';

export type Language = 'en' | 'fr' | 'zh';

export const useAppStore = defineStore('app', () => {
  const loading = ref(false);
  const sidebarOpen = ref(true);
  const currentLanguage = ref('fr');

  // Mock data
  const briefingSlides = ref<BriefingSlide[]>([
    {
      id: '1',
      title: 'Découvrez nos projets immobiliers d\'exception',
      description: 'Des résidences de standing dans les plus beaux quartiers',
      imageUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    {
      id: '2',
      title: 'Investissez dans l\'immobilier de luxe',
      description: 'Des opportunités uniques pour votre patrimoine',
      imageUrl: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    {
      id: '3',
      title: 'Excellence et innovation immobilière',
      description: 'RELIANCE WEST AFRICA, votre partenaire de confiance',
      imageUrl: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1200'
    }
  ]);

  const countries = ref<Country[]>([
    { id: '1', name: 'Côte d\'Ivoire', iso2: 'CI', dialCode: '+225' },
    { id: '2', name: 'Sénégal', iso2: 'SN', dialCode: '+221' },
    { id: '3', name: 'Ghana', iso2: 'GH', dialCode: '+233' },
    { id: '4', name: 'Nigeria', iso2: 'NG', dialCode: '+234' },
    { id: '5', name: 'Togo', iso2: 'TG', dialCode: '+228' }
  ]);

  const projects = ref<Project[]>([
    {
      id: '1',
      title: 'Résidence Les Palmiers',
      type: 'Résidentiel',
      countryId: '1',
      city: 'Abidjan',
      locationAddress: 'Cocody, Riviera Golf',
      description: 'Résidence haut de gamme avec vue sur le golf',
      company: 'RELIANCE WEST AFRICA',
      photoUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      published: true,
      createdBy: '1',
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Villa Paradise',
      type: 'Villa',
      countryId: '1',
      city: 'Abidjan',
      locationAddress: 'Cocody, Angré',
      description: 'Villas de luxe avec piscine privée',
      company: 'RELIANCE WEST AFRICA',
      photoUrl: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
      published: true,
      createdBy: '1',
      createdAt: new Date()
    }
  ]);

  const residences = ref<Residence[]>([
    {
      id: '1',
      projectId: '1',
      title: 'Bâtiment A - Les Palmiers',
      residenceType: 'Immeuble',
      floorsCount: 8,
      unitsCount: 32,
      description: 'Immeuble principal avec ascenseur',
      photoUrl: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800',
      published: true,
      createdAt: new Date()
    }
  ]);

  const paliers = ref<Palier[]>([
    { id: '1', residenceId: '1', title: 'Rez-de-chaussée', unitCount: 4, description: 'Niveau 0' },
    { id: '2', residenceId: '1', title: '1er étage', unitCount: 4, description: 'Niveau 1' },
    { id: '3', residenceId: '1', title: '2ème étage', unitCount: 4, description: 'Niveau 2' }
  ]);

  const properties = ref<Property[]>([
    {
      id: '1',
      residenceId: '1',
      projectId: '1',
      title: 'Appartement A101',
      propertyType: 'appartement',
      rooms: 3,
      kitchens: 1,
      balcony: true,
      furnished: false,
      surfaceM2: 85,
      palierId: '1',
      status: 'Disponible',
      published: true,
      price: 45000000,
      createdAt: new Date(),
      photos: [
        { id: '1', propertyId: '1', photoUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800' }
      ]
    },
    {
      id: '2',
      residenceId: '1',
      projectId: '1',
      title: 'Appartement A102',
      propertyType: 'appartement',
      rooms: 2,
      kitchens: 1,
      balcony: true,
      furnished: true,
      surfaceM2: 65,
      palierId: '1',
      status: 'Sous discussion cliente',
      published: true,
      price: 35000000,
      createdAt: new Date(),
      photos: [
        { id: '2', propertyId: '2', photoUrl: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800' }
      ]
    }
  ]);

  const clients = ref<Client[]>([
    {
      id: '1',
      firstName: 'Amadou',
      lastName: 'Diallo',
      gender: 'M',
      phone: '+225 07 12 34 56 78',
      email: 'amadou.diallo@email.com',
      address: 'Abidjan, Cocody',
      nationality: 'Ivoirienne',
      createdBy: '1'
    }
  ]);

  const acquisitions = ref<Acquisition[]>([
    {
      id: '1',
      propertyId: '2',
      clientId: '1',
      commercialUserId: '1',
      amount: 10000000,
      amountType: 'avance',
      status: 'Sous discussion',
      dateAcquisition: new Date(),
      paymentMethod: 'Virement bancaire',
      createdAt: new Date()
    }
  ]);

  const contracts = ref<Contract[]>([]);

  const dashboardStats = ref<DashboardStats>({
    totalProjects: 2,
    totalProperties: 2,
    availableProperties: 1,
    reservedProperties: 0,
    soldProperties: 0,
    totalClients: 1,
    totalAcquisitions: 1,
    totalContracts: 0,
    monthlyRevenue: 10000000,
    recentActivities: [
      {
        id: '1',
        type: 'acquisition',
        action: 'Nouvelle acquisition',
        description: 'Amadou Diallo - Appartement A102',
        userId: '1',
        userName: 'Jean Dupont',
        createdAt: new Date()
      }
    ]
  });

  // Computed
  const publishedProjects = computed(() => 
    projects.value.filter(p => p.published)
  );

  const availableProperties = computed(() => 
    properties.value.filter(p => 
      p.published && 
      (p.status === 'Disponible' || p.status === 'Sous discussion cliente')
    )
  );

  // Actions
  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value;
  }

  function setLanguage(lang: string) {
    currentLanguage.value = lang;
    localStorage.setItem('domains_language', lang);
  }

  function initializeApp() {
    const savedLanguage = localStorage.getItem('domains_language');
    if (savedLanguage) {
      currentLanguage.value = savedLanguage;
    }
  }

  // CRUD Operations (mock implementations)
  function addProject(project: Omit<Project, 'id' | 'createdAt'>) {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    projects.value.push(newProject);
    return newProject;
  }

  function updateProject(id: string, updates: Partial<Project>) {
    const index = projects.value.findIndex(p => p.id === id);
    if (index !== -1) {
      projects.value[index] = { ...projects.value[index], ...updates };
    }
  }

  function deleteProject(id: string) {
    const index = projects.value.findIndex(p => p.id === id);
    if (index !== -1) {
      projects.value.splice(index, 1);
    }
  }

  function addProperty(property: Omit<Property, 'id' | 'createdAt' | 'photos'>) {
    const newProperty: Property = {
      ...property,
      id: Date.now().toString(),
      createdAt: new Date(),
      photos: []
    };
    properties.value.push(newProperty);
    return newProperty;
  }

  function updateProperty(id: string, updates: Partial<Property>) {
    const index = properties.value.findIndex(p => p.id === id);
    if (index !== -1) {
      properties.value[index] = { ...properties.value[index], ...updates };
    }
  }

  function addClient(client: Omit<Client, 'id'>) {
    const newClient: Client = {
      ...client,
      id: Date.now().toString()
    };
    clients.value.push(newClient);
    return newClient;
  }

  function addAcquisition(acquisition: Omit<Acquisition, 'id' | 'createdAt'>) {
    const newAcquisition: Acquisition = {
      ...acquisition,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    acquisitions.value.push(newAcquisition);

    // Update property status based on acquisition
    if (acquisition.status === 'Réservée' || acquisition.status === 'Soldée') {
      const propertyStatus = acquisition.status === 'Réservée' ? 'Réservé(e)' : 'Soldé(e)';
      updateProperty(acquisition.propertyId, { status: propertyStatus });
      
      // Mark other acquisitions for same property as "Offre surclassée"
      acquisitions.value.forEach(acq => {
        if (acq.propertyId === acquisition.propertyId && 
            acq.id !== newAcquisition.id && 
            acq.status === 'Sous discussion') {
          acq.status = 'Offre surclassée';
        }
      });
    }

    return newAcquisition;
  }

  return {
    loading,
    sidebarOpen,
    currentLanguage,
    briefingSlides,
    countries,
    projects,
    residences,
    paliers,
    properties,
    clients,
    acquisitions,
    contracts,
    dashboardStats,
    publishedProjects,
    availableProperties,
    toggleSidebar,
    setLanguage,
    initializeApp,
    addProject,
    updateProject,
    deleteProject,
    addProperty,
    updateProperty,
    addClient,
    addAcquisition
  };
});