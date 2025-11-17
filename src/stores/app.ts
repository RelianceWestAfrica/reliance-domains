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
  DashboardStats,
  Apartment,
  Domain
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

  const domains = ref<Domain[]>([
    {
      id: '1',
      title: 'Diamond Residences',
      domain_type: 'residential',
      project_id: '1',
      description: 'Complexe résidentiel haut de gamme avec 3 bâtiments modernes',
      residences_count: 3,
      image_url: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800',
      published: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: '2',
      title: 'Emerald Towers',
      domain_type: 'mixed',
      project_id: '1',
      description: 'Tours mixtes avec résidences et commerces',
      residences_count: 2,
      image_url: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      published: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);

  const residences = ref<Residence[]>([
    {
      id: '1',
      projectId: '1',
      title: 'Bâtiment A - Diamond Residences',
      residenceType: 'Immeuble Résidentiel',
      floorsCount: 6,
      unitsCount: 27,
      description: 'Bâtiment A avec 3 étages résidentiels (4ème, 5ème et 6ème), 9 appartements par étage. Immeuble moderne avec ascenseur, parking souterrain et espaces verts.',
      photoUrl: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800',
      published: true,
      createdAt: new Date()
    },
    {
      id: '2',
      projectId: '1',
      title: 'Bâtiment B - Diamond Residences',
      residenceType: 'Immeuble Résidentiel',
      floorsCount: 6,
      unitsCount: 27,
      description: 'Bâtiment B avec 3 étages résidentiels, même configuration que le Bâtiment A. Vue panoramique sur la ville.',
      photoUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      published: true,
      createdAt: new Date()
    },
    {
      id: '3',
      projectId: '1',
      title: 'Tour Emerald Nord',
      residenceType: 'Tour Résidentielle',
      floorsCount: 12,
      unitsCount: 48,
      description: 'Tour résidentielle de standing avec 12 étages. Appartements de luxe avec vue imprenable.',
      photoUrl: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
      published: true,
      createdAt: new Date()
    }
  ]);

  const paliers = ref<Palier[]>([
    { id: '1', residenceId: '1', title: 'QUATRIEME ETAGE', unitCount: 9, description: '4ème étage - 9 appartements' },
    { id: '2', residenceId: '1', title: 'CINQUIEME ETAGE', unitCount: 9, description: '5ème étage - 9 appartements' },
    { id: '3', residenceId: '1', title: 'SIXIEME ETAGE', unitCount: 9, description: '6ème étage - 9 appartements' },
    { id: '4', residenceId: '2', title: 'QUATRIEME ETAGE', unitCount: 9, description: '4ème étage - 9 appartements' },
    { id: '5', residenceId: '2', title: 'CINQUIEME ETAGE', unitCount: 9, description: '5ème étage - 9 appartements' },
    { id: '6', residenceId: '2', title: 'SIXIEME ETAGE', unitCount: 9, description: '6ème étage - 9 appartements' }
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

  const apartments = ref<Apartment[]>([
    // SIXIEME ETAGE - Bâtiment A
    { id: 'a601', code: 'A601', floor: 'SIXIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'temp_reserved', client_name: 'Mohamed Keita', position: 1, created_at: new Date(), updated_at: new Date() },
    { id: 'a602', code: 'A602', floor: 'SIXIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'temp_reserved', client_name: 'Aisha Diop', position: 2, created_at: new Date(), updated_at: new Date() },
    { id: 'a603', code: 'A603', floor: 'SIXIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'signed', client_name: 'Kofi Mensah', position: 3, created_at: new Date(), updated_at: new Date() },
    { id: 'a604', code: 'A604', floor: 'SIXIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'signed', client_name: 'Fatou Sow', position: 4, created_at: new Date(), updated_at: new Date() },
    { id: 'a605', code: 'A605', floor: 'SIXIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'signed', client_name: 'Jean-Paul Kouassi', position: 5, created_at: new Date(), updated_at: new Date() },
    { id: 'a606', code: 'A606', floor: 'SIXIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'signed', client_name: 'Marie Touré', position: 6, created_at: new Date(), updated_at: new Date() },
    { id: 'a607', code: 'A607', floor: 'SIXIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'reserved_unsigned', client_name: 'Ibrahim Ba', position: 7, created_at: new Date(), updated_at: new Date() },
    { id: 'a608', code: 'A608', floor: 'SIXIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'reserved_unsigned', client_name: 'Aminata Traoré', position: 8, created_at: new Date(), updated_at: new Date() },
    { id: 'a609', code: 'A609', floor: 'SIXIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'temp_reserved', client_name: 'Kwame Asante', position: 9, created_at: new Date(), updated_at: new Date() },

    // CINQUIEME ETAGE - Bâtiment A
    { id: 'a501', code: 'A501', floor: 'CINQUIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'reserved_unsigned', client_name: 'Yao N\'Guessan', position: 1, created_at: new Date(), updated_at: new Date() },
    { id: 'a502', code: 'A502', floor: 'CINQUIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'signed', client_name: 'Mariam Sanogo', position: 2, created_at: new Date(), updated_at: new Date() },
    { id: 'a503', code: 'A503', floor: 'CINQUIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'signed', client_name: 'Eric Bamba', position: 3, created_at: new Date(), updated_at: new Date() },
    { id: 'a504', code: 'A504', floor: 'CINQUIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'signed', client_name: 'Khadija Camara', position: 4, created_at: new Date(), updated_at: new Date() },
    { id: 'a505', code: 'A505', floor: 'CINQUIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'signed', client_name: 'Ousmane Diallo', position: 5, created_at: new Date(), updated_at: new Date() },
    { id: 'a506', code: 'A506', floor: 'CINQUIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'reserved_signed', client_name: 'Sophie Koné', position: 6, created_at: new Date(), updated_at: new Date() },
    { id: 'a507', code: 'A507', floor: 'CINQUIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'signed', client_name: 'Mamadou Sylla', position: 7, created_at: new Date(), updated_at: new Date() },
    { id: 'a508', code: 'A508', floor: 'CINQUIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'reserved_unsigned', client_name: 'Grace Obi', position: 8, created_at: new Date(), updated_at: new Date() },
    { id: 'a509', code: 'A509', floor: 'CINQUIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'temp_reserved', client_name: 'Daniel Kouadio', position: 9, created_at: new Date(), updated_at: new Date() },

    // QUATRIEME ETAGE - Bâtiment A
    { id: 'a401', code: 'A401', floor: 'QUATRIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'temp_reserved', client_name: 'Alice Mensah', position: 1, created_at: new Date(), updated_at: new Date() },
    { id: 'a402', code: 'A402', floor: 'QUATRIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'temp_reserved', client_name: 'Pierre Diabaté', position: 2, created_at: new Date(), updated_at: new Date() },
    { id: 'a403', code: 'A403', floor: 'QUATRIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'signed', client_name: 'Nadia Cissé', position: 3, created_at: new Date(), updated_at: new Date() },
    { id: 'a404', code: 'A404', floor: 'QUATRIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'signed', client_name: 'Samuel Konaté', position: 4, created_at: new Date(), updated_at: new Date() },
    { id: 'a405', code: 'A405', floor: 'QUATRIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'signed', client_name: 'Hawa Doumbia', position: 5, created_at: new Date(), updated_at: new Date() },
    { id: 'a406', code: 'A406', floor: 'QUATRIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'signed', client_name: 'Christian Yao', position: 6, created_at: new Date(), updated_at: new Date() },
    { id: 'a407', code: 'A407', floor: 'QUATRIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'reserved_unsigned', client_name: 'Awa Traoré', position: 7, created_at: new Date(), updated_at: new Date() },
    { id: 'a408', code: 'A408', floor: 'QUATRIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'available', position: 8, created_at: new Date(), updated_at: new Date() },
    { id: 'a409', code: 'A409', floor: 'QUATRIEME ETAGE', building: 'BATIMENT A', residence_id: '1', status: 'temp_reserved', client_name: 'Lamine Coulibaly', position: 9, created_at: new Date(), updated_at: new Date() }
  ]);

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

  function updateApartmentStatus(apartmentId: string, status: string, clientName?: string) {
    const apartment = apartments.value.find(a => a.id === apartmentId);
    if (apartment) {
      apartment.status = status as any;
      apartment.client_name = clientName;
      apartment.updated_at = new Date();
    }
  }

  return {
    loading,
    sidebarOpen,
    currentLanguage,
    briefingSlides,
    countries,
    projects,
    domains,
    residences,
    paliers,
    properties,
    clients,
    acquisitions,
    contracts,
    apartments,
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
    addAcquisition,
    updateApartmentStatus
  };
});