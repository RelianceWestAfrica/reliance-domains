<template>
  <div class="briefing-page min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    <!-- Enhanced Premium Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-navy-950/90 backdrop-blur-xl border-b border-white/10">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo Section -->
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 3a1 1 0 011-1h6a1 1 0 011 1v4h6a1 1 0 011 1v9a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm7 1H5v14h10V9h-5V4zM7 10h2v2H7v-2zm4 0h2v2h-2v-2zM7 13h2v2H7v-2zm4 0h2v2h-2v-2z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold text-white" style="font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">DOMAINS</h1>
              <p class="text-xs text-gray-300">Reliance West Africa</p>
            </div>
          </div>

          <!-- Right Section -->
          <div class="flex items-center space-x-6">
            <!-- Language Selector -->
            <div class="relative">
              <button
                @click="showLanguageDropdown = !showLanguageDropdown"
                class="flex items-center space-x-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <!-- <span class="text-2xl">{{ currentLanguageFlag }}</span> -->
                <span class="text-white font-medium">{{ currentLanguage.toUpperCase() }}</span>
                <svg class="w-4 h-4 text-white/70 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <div v-if="showLanguageDropdown" class="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-2 z-50">
                  <button
                    v-for="lang in languages"
                    :key="lang.code"
                    @click="changeLanguage(lang.code)"
                    class="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center space-x-3 group"
                    :class="{ 'bg-blue-100 text-blue-700 font-semibold': currentLanguage === lang.code }"
                  >
                    <span class="text-2xl">{{ lang.flag }}</span>
                    <div class="flex-1">
                      <div class="font-medium text-navy-900">{{ lang.name }}</div>
                      <div class="text-sm text-gray-500">{{ lang.native }}</div>
                    </div>
                    <svg v-if="currentLanguage === lang.code" class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                </div>
              </Transition>
            </div>

            <!-- User Profile Menu -->
            <div class="relative">
              <button
                @click="showUserDropdown = !showUserDropdown"
                class="flex items-center space-x-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <div class="relative">
                  <img
                    :src="userAvatar"
                    :alt="userName"
                    class="w-10 h-10 rounded-full object-cover border-2 border-gold-400/50"
                  />
                  <div class="absolute -bottom-0 -right-0 w-3 h-3 bg-green-500 border-1 border-white rounded-full"></div>
                </div>
                <div class="text-left hidden md:block">
                  <div class="font-semibold text-white">{{ userName }}</div>
                  <div class="text-xs text-gray-300 flex items-center space-x-1">
                    <!-- <span class="w-2 h-2 bg-gold-400 rounded-full"></span> -->
                    <span>{{ userRole }}</span>
                  </div>
                </div>
                <svg class="w-4 h-4 text-white/70 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <div v-if="showUserDropdown" class="absolute right-0 mt-3 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-3 z-50">
                  <div class="px-4 py-3 border-b border-gray-200/50">
                    <div class="flex items-center space-x-3">
                      <img :src="userAvatar" :alt="userName" class="w-12 h-12 rounded-full object-cover"/>
                      <div>
                        <div class="font-semibold text-black">{{ userName }}</div>
                        <div class="text-sm text-gray-600">{{ userEmail }}</div>
                        <!-- <div class="text-xs text-gold-600 font-normal border-1 border-navy-100 bg-navy-100 px-2 py-1 rounded-full inline-block mt-1" style="text-align:left;">
                        {{ userRole }}
                        </div> -->
                      </div>
                    </div>
                  </div>

                  <div class="py-2">
                    <router-link
                      to="/dashboard"
                      class="flex items-center px-4 py-3 text-navy-700 hover:bg-blue-50 transition-colors group"
                    >
                      <svg class="w-5 h-5 text-navy-800/80 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                      </svg>
                      <span class="font-medium">Tableau de Bord</span>
                    </router-link>

                    <button class="w-full flex items-center px-4 py-3 text-navy-700 hover:bg-blue-50 transition-colors group">
                      <svg class="w-5 h-5 text-navy-800/80 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                      <span class="font-medium">Mon Profil</span>
                    </button>

                    <div class="border-t border-gray-200/50 my-2"></div>

                    <button
                      @click="logout"
                      class="w-full flex items-center px-4 py-3 text-Black hover:bg-red-50 transition-colors group"
                    >
                      <svg class="w-5 h-5 text-red-500/90 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H3"/>
                      </svg>
                      <span class="font-medium">Déconnexion</span>
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section with Enhanced Filters -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <!-- Background Slider -->
      <div class="absolute inset-0">
        <div
          v-for="(slide, index) in heroSlides"
          :key="slide.id"
          class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          :class="{ 'opacity-100': currentSlide === index, 'opacity-0': currentSlide !== index }"
        >
          <img
            :src="slide.image"
            :alt="slide.title"
            class="w-full h-full object-cover transform scale-105"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950/80 to-navy-900/75"></div>
        </div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 text-center px-6 max-w-8xl mx-auto">
        <!-- Premium Badge -->
        <!-- <div class="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-gold-400/30 rounded-full px-6 py-2 mb-8" data-aos="fade-down">
          <svg class="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span class="text-gold-400 font-semibold">Premium</span>
        </div> -->

        <!-- Main Title with Gold Gradient -->
        <br><h1 class="text-5xl md:text-6xl font-bold mb-10 leading-tight" data-aos="fade-up" data-aos-delay="200">
          <span class="bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent outfit-title">
            Bienvenue sur l'espace
          </span>
          <br>
          <span class="bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent outfit-title">
            Reliance Domains
          </span>
        </h1>

        <!-- Subtitle -->
        <p class="text-md md:text-xl font-semibold text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="400" style="line-height:40px;">
          Gestion moderne, cenralisée et simplifiée du suivi des patrimoines immobiliers 
        </p>

        <!-- Enhanced Filter System - Single Row -->
        <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-12 shadow-2xl" data-aos="fade-up" data-aos-delay="600">
          <h3 class="text-white text-lg font-semibold mb-6 text-center">Trouvez votre propriété idéale</h3>
          
          <!-- Single Row Filter Layout -->
          <div class="flex flex-wrap justify-center items-center gap-4">
            <!-- Country Filter -->
            <div class="filter-item">
              <label class="block text-white/80 text-sm font-medium mb-2 outfit-lay">Pays</label>
              <select
                v-model="filters.country"
                @change="onCountryChange"
                class="filter-select"
              >
                <option value="">Tous les pays</option>
                <option v-for="country in availableCountries" :key="country.id" :value="country.id">
                  {{ country.name }}
                  <!-- {{ country.flag }} -->
                </option>
              </select>
            </div>

            <!-- Project Filter -->
            <div class="filter-item">
              <label class="block text-white/80 text-sm font-medium mb-2 outfit-lay">Projet</label>
              <select
                v-model="filters.project"
                @change="onProjectChange"
                :disabled="!filters.country"
                class="filter-select"
              >
                <option value="">Tous les projets</option>
                <option v-for="project in availableProjects" :key="project.id" :value="project.id">
                  {{ project.title }}
                </option>
              </select>
            </div>

            <!-- Domain Filter -->
            <div class="filter-item">
              <label class="block text-white/80 text-sm font-medium mb-2">Domaine</label>
              <select
                v-model="filters.domain"
                @change="onDomainChange"
                :disabled="!filters.project"
                class="filter-select"
              >
                <option value="">Tous les domaines</option>
                <option v-for="domain in availableDomains" :key="domain.id" :value="domain.id">
                  {{ domain.title }}
                </option>
              </select>
            </div>

             <!-- Residence Filter -->
            <div class="filter-item">
              <label class="block text-white/80 text-sm font-medium mb-2">Résidence</label>
              <select
                v-model="filters.residence"
                @change="onResidenceChange"
                :disabled="!filters.domain"
                class="filter-select"
              >
                <option value="">Toutes les résidences</option>
                <option v-for="residence in availableResidences" :key="residence.id" :value="residence.id">
                  {{ residence.title }}
                </option>
              </select>
            </div>

            <!-- Floor Filter -->
            <div class="filter-item">
              <label class="block text-white/80 text-sm font-medium mb-2 outfit-lay">Palier</label>
              <select
                v-model="filters.palier"
                @change="onPalierChange"
                :disabled="!filters.residence"
                class="filter-select"
              >
                <option value="">Tous les paliers</option>
                <option v-for="palier in availablePaliers" :key="palier.id" :value="palier.id">
                  {{ palier.title }}
                </option>
              </select>
            </div>

            <!-- Property Type Filter -->
            <div class="filter-item">
              <label class="block text-white/80 text-sm font-medium mb-2 outfit-lay">Type</label>
              <select
                v-model="filters.propertyType"
                class="filter-select"
              >
                <option value="">Tous les types</option>
                <option value="appartement">Appartement</option>
                <option value="villa">Villa</option>
                <option value="magasin">Magasin</option>
              </select>
            </div>
          </div>

          <!-- Active Filters -->
          <div v-if="activeFilters.length > 0" class="mt-6 pt-6 border-t border-white/20">
            <div class="flex flex-wrap items-center gap-2 justify-center">
              <span class="text-white/80 text-sm font-medium outfit-lay">Filtres actifs:</span>
              <div
                v-for="filter in activeFilters"
                :key="filter.key"
                class="inline-flex items-center space-x-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-3 py-1 text-sm text-blue-200"
              >
                <span>{{ filter.label }}</span>
                <button
                  @click="removeFilter(filter.key)"
                  class="text-blue-300 hover:text-white transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <button
                @click="clearAllFilters"
                class="text-red-300 hover:text-white text-sm font-medium transition-colors"
              >
                Tout effacer
              </button>
            </div>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <br/>
        <div class="animate-bounce" data-aos="fade-up" data-aos-delay="800">
          <svg class="w-6 h-6 text-white/60 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </div>
      </div>

      <!-- Slide Navigation -->
      <br><div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        <button
          v-for="(slide, index) in heroSlides"
          :key="index"
          @click="currentSlide = index"
          class="w-3 h-3 rounded-full transition-all duration-300"
          :class="currentSlide === index ? 'bg-gold-400 scale-125' : 'bg-white/40 hover:bg-white/60'"
        ></button>
      </div>
    </section>

    <!-- Breadcrumb Navigation -->
    <div v-if="breadcrumbs.length > 1" class="bg-white border-b border-gray-200 py-4">
      <div class="container mx-auto px-6">
        <nav class="flex items-center space-x-2 text-sm">
          <button
            v-for="(crumb, index) in breadcrumbs"
            :key="index"
            @click="navigateToBreadcrumb(index)"
            class="flex items-center space-x-2 text-gray-600 hover:text-blue-600/90 transition-colors"
            :class="{ 'text-blue-600/90 font-semibold': index === breadcrumbs.length - 1 }"
          >
            <span>{{ crumb.title }}</span>
            <svg v-if="index < breadcrumbs.length - 1" class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </nav>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="container mx-auto px-6 py-12 mt-8">
      <!-- Projects View -->
      <div v-if="currentView === 'projects'" class="space-y-12">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            <span class="text-navy-800 outfit-title">Projets immobiliers</span> 
            <!-- Projets <span class="bg-gradient-to-r from-gold-700 to-navy-800/70 bg-clip-text text-transparent">Premium</span> -->
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto outfit-lay">
            Découvrez tous les projets de développement immobiliers
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="200">
          <div
            v-for="project in displayedProjects"
            :key="project.id"
            class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 cursor-pointer"
            @click="selectProject(project)"
          >
            <div class="relative h-64 overflow-hidden">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 outfit-mid">
                  Publié
                </span>
              </div>
              <div class="absolute top-4 right-4">
                <span class="text-2xl">{{ project.countryFlag }}</span>
              </div>
            </div>

            <div class="p-6">
              <h3 class="text-lg font-semibold text-navy-900 group-hover:text-navy-600 transition-colors mb-2 outfit-mid">
                {{ project.title }}
              </h3>
              <p class="text-gray-600 text-md mb-4 line-clamp-2 outfit-tin">{{ project.description }}</p>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span class="outfit-lay">{{ project.city }}</span>
                <span class="outfit-lay">{{ project.domainsCount }} domaines</span>
                <!-- <span class="outfit-lay">{{ project.residencesCount }} résidences</span> -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Project Detail View -->
      <div v-else-if="currentView === 'project-detail'" class="space-y-12">
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden" data-aos="fade-up">
          <div class="relative h-64 md:h-80">
            <img
              :src="selectedProject.image"
              :alt="selectedProject.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div class="absolute bottom-6 left-6 text-white">
              <h1 class="text-3xl md:text-4xl font-bold mb-2">{{ selectedProject.title }}</h1>
              <p class="text-lg opacity-90">{{ selectedProject.city }}, {{ selectedProject.country }}</p>
            </div>
          </div>

          <div class="p-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 class="text-xl font-semibold text-navy-900 mb-4">Description</h3>
                <p class="text-gray-600 leading-relaxed">{{ selectedProject.description }}</p>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-navy-900 mb-4">Informations</h3>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Type:</span>
                    <span class="font-medium">{{ selectedProject.type }}</span>
                  </div>
                  <!-- <div class="flex justify-between">
                    <span class="text-gray-600">Résidences:</span>
                    <span class="font-medium">{{ selectedProject.residencesCount }}</span>
                  </div> -->
                  <div class="flex justify-between">
                    <span class="text-gray-600">Domaines:</span>
                    <span class="font-medium">{{ selectedProject.domainsCount }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Propriétés:</span>
                    <span class="font-medium">{{ selectedProject.propertiesCount }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>




        <!-- Domains List -->
        <div class="space-y-8">
          <h2 class="text-2xl font-bold text-navy-900">Domaines du projet</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="domain in projectDomains"
              :key="domain.id"
              class="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
              @click="selectDomain(domain)"
            >
              <div class="relative h-40">
                <img
                  :src="domain.imageUrl"
                  :alt="domain.title"
                  class="w-full h-full object-cover"
                />
                <div class="absolute top-3 right-3">
                  <span class="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {{ domain.domainType }}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3 class="font-semibold text-navy-900 mb-2">{{ domain.title }}</h3>
                <p class="text-sm text-gray-600 mb-3">{{ domain.description }}</p>
                <div class="flex justify-between text-sm text-gray-500">
                  <span>{{ domain.residencesCount }} résidences</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Domain Detail View -->
      <div v-else-if="currentView === 'domain-detail'" class="space-y-12">
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden" data-aos="fade-up">
          <div class="relative h-64">
            <img
              :src="selectedDomain.imageUrl"
              :alt="selectedDomain.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div class="absolute bottom-6 left-6 text-white">
              <h1 class="text-3xl font-bold mb-2">{{ selectedDomain.title }}</h1>
              <p class="text-lg opacity-90">{{ selectedDomain.domainType }}</p>
            </div>
          </div>

          <div class="p-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 class="text-xl font-semibold text-navy-900 mb-4">Description</h3>
                <p class="text-gray-600 leading-relaxed">{{ selectedDomain.description }}</p>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-navy-900 mb-4">Caractéristiques</h3>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Type:</span>
                    <span class="font-medium">{{ selectedDomain.domainType }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Résidences:</span>
                    <span class="font-medium">{{ selectedDomain.residencesCount }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>





        <!-- Residences List -->
        <div class="space-y-8">
          <h2 class="text-2xl font-bold text-navy-900">Résidences du domaine</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="residence in domainResidences"
              :key="residence.id"
              class="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
              @click="selectResidence(residence)"
            >
              <div class="relative h-40">
                <img
                  :src="residence.imageUrl"
                  :alt="residence.title"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-4">
                <h3 class="font-semibold text-navy-900 mb-2">{{ residence.title }}</h3>
                <p class="text-sm text-gray-600 mb-3">{{ residence.description }}</p>
                <div class="flex justify-between text-sm text-gray-500">
                  <span>{{ residence.floorsCount }} étages</span>
                  <span>{{ residence.unitsCount }} unités</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Residence Detail View -->
      <div v-else-if="currentView === 'residence-detail'" class="space-y-12">
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden" data-aos="fade-up">
          <div class="relative h-64">
            <img
              :src="selectedResidence.image"
              :alt="selectedResidence.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div class="absolute bottom-6 left-6 text-white">
              <h1 class="text-3xl font-bold mb-2">{{ selectedResidence.title }}</h1>
              <p class="text-lg opacity-90">{{ selectedResidence.residenceType }}</p>
            </div>
          </div>

          <div class="p-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 class="text-xl font-semibold text-navy-900 mb-4">Description</h3>
                <p class="text-gray-600 leading-relaxed">{{ selectedResidence.description }}</p>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-navy-900 mb-4">Caractéristiques</h3>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Étages:</span>
                    <span class="font-medium">{{ selectedResidence.floorsCount }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Unités totales:</span>
                    <span class="font-medium">{{ selectedResidence.unitsCount }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Type:</span>
                    <span class="font-medium">{{ selectedResidence.residenceType }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Properties List -->
        <div class="space-y-8">
          <h2 class="text-2xl font-bold text-navy-900">Appartements et Villas</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div
              v-for="property in residenceProperties"
              :key="property.id"
              class="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
              @click="selectProperty(property)"
            >
              <div class="relative h-40">
                <img
                  :src="property.image"
                  :alt="property.title"
                  class="w-full h-full object-cover"
                />
                <div class="absolute top-3 left-3">
                  <span
                    class="px-2 py-1 text-xs font-semibold rounded-full"
                    :class="getStatusClasses(property.status)"
                  >
                    {{ property.status }}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3 class="font-semibold text-navy-900 mb-2">{{ property.title }}</h3>
                <div class="flex items-center space-x-3 text-sm text-gray-600 mb-3">
                  <span>{{ property.rooms }} pièces</span>
                  <span>{{ property.surfaceM2 }}m²</span>
                </div>
                <div class="text-lg font-bold text-navy-600">
                  {{ formatPrice(property.price) }} FCFA
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Property Detail View -->
      <div v-else-if="currentView === 'property-detail'" class="space-y-12">
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden" data-aos="fade-up">
          <div class="relative h-64 md:h-80">
            <img
              :src="selectedProperty.image"
              :alt="selectedProperty.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-navy-950/95"></div>
            <div class="absolute top-4 left-4">
              <span
                class="px-3 py-1 text-sm font-semibold rounded-full"
                :class="getStatusClasses(selectedProperty.status)"
              >
                {{ selectedProperty.status }}
              </span>
            </div>
            <div class="absolute bottom-6 left-6 text-white">
              <h1 class="text-3xl md:text-4xl font-bold mb-2">{{ selectedProperty.title }}</h1>
              <p class="text-lg opacity-90">{{ selectedProperty.propertyType }}</p>
            </div>
          </div>
          

          <div class="p-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div class="space-y-6">
                <div>
                  <h3 class="text-xl font-semibold text-navy-900 mb-4">Caractéristiques</h3>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="bg-gray-50 p-4 rounded-lg">
                      <div class="text-2xl font-bold text-navy-600">{{ selectedProperty.rooms }}</div>
                      <div class="text-sm text-gray-600">Chambres</div>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                      <div class="text-2xl font-bold text-navy-600">{{ selectedProperty.kitchens }}</div>
                      <div class="text-sm text-gray-600">Cuisines</div>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                      <div class="text-2xl font-bold text-navy-600">{{ selectedProperty.surfaceM2 }}m²</div>
                      <div class="text-sm text-gray-600">Surface</div>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                      <div class="text-2xl font-bold text-navy-600">{{ selectedProperty.balcony ? 'Oui' : 'Non' }}</div>
                      <div class="text-sm text-gray-600">Balcon</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="text-xl font-semibold text-navy-900 mb-4">Équipements</h3>
                  <div class="flex flex-wrap gap-2">
                    <span v-if="selectedProperty.furnished" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      Meublé
                    </span>
                    <span v-if="selectedProperty.balcony" class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Balcon
                    </span>
                  </div>
                </div>
              </div>

              <div class="space-y-6">
                <div>
                  <h3 class="text-xl font-semibold text-navy-900 mb-4">Prix</h3>
                  <div class="text-3xl font-bold text-navy-600 mb-2">
                    {{ formatPrice(selectedProperty.price) }} <span class="text-xl">FCFA</span>
                  </div>
                  <p class="text-gray-600">Prix de vente</p>
                </div>

                <div>
                  <h3 class="text-xl font-semibold text-navy-900 mb-4">Informations</h3>
                  <div class="space-y-3">
                    <div class="flex justify-between">
                      <span class="text-gray-600">Type:</span>
                      <span class="font-medium capitalize">{{ selectedProperty.propertyType }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Statut:</span>
                      <span class="font-medium">{{ selectedProperty.status }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Publié:</span>
                      <span class="font-medium">{{ selectedProperty.published ? 'Oui' : 'Non' }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="displayedProjects.length === 0 && currentView === 'projects'" class="text-center py-16" data-aos="fade-up">
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
          </svg>
        </div>
        <h3 class="text-2xl font-semibold text-navy-900 mb-4">Aucun projet trouvé</h3>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">
          Aucun projet ne correspond à vos critères de recherche actuels.
        </p>
        <button
          @click="clearAllFilters"
          class="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
        >
          Réinitialiser les filtres
        </button>
      </div>
    </div>

    <!-- Footer -->
    <footer class="briefing-footer bg-gradient-to-r from-navy-950 to-gray-900 text-white py-12 px-6 mt-20">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div class="footer-section space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center">
                <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 3a1 1 0 011-1h6a1 1 0 011 1v4h6a1 1 0 011 1v9a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm7 1H5v14h10V9h-5V4zM7 10h2v2H7v-2zm4 0h2v2h-2v-2zM7 13h2v2H7v-2zm4 0h2v2h-2v-2z"/>
                </svg>
              </div>
              <span class="text-xl font-black tracking-wider" style="font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif">DOMAINS</span>
            </div>
            <p class="text-gray-400 text-sm outfit-tin">
              La plateforme de gestion moderne, cenralisée et simplifiée du suivi des patrimoines immobiliers <br>Reliance West Africa
            </p>
          </div>

          <div class="footer-section space-y-4">
            <h4 class="text-lg outfit-title">Contact</h4>
            <p class="text-gray-400 text-sm">Email: contact@reliancewestafrica.com</p>
            <p class="text-gray-400 text-sm">Tél: +228 98 74 26 26</p>
          </div>

          <div class="footer-section space-y-4">
            <h4 class="text-lg outfit-title">Liens Rapides</h4>
            <button @click="router.push('/dashboard')" class="block text-gray-400 text-sm hover:text-white transition-colors">
              Tableau de bord
            </button>
            <button @click="router.push('/residences')" class="block text-gray-400 text-sm hover:text-white transition-colors">
              Résidences
            </button>
            <button @click="router.push('/properties')" class="block text-gray-400 text-sm hover:text-white transition-colors">
              Propriétés
            </button>
          </div>

          <div class="footer-section space-y-4">
            <h4 class="text-lg outfit-title">Suivez-nous</h4>
            <div class="flex flex-col gap-2">
              <a href="#" class="text-gray-400 text-sm hover:text-white transition-colors">Instagram</a>
              <a href="#" class="text-gray-400 text-sm hover:text-white transition-colors">Facebook</a>
              <a href="www.reliancewestafrica.com" class="text-gray-400 text-sm hover:text-white transition-colors">Site web officiel</a>
            </div>
          </div>
        </div>

        <div class="pt-8 border-t border-gray-700 text-center text-gray-400 text-sm outfit-lay">
          <p>&copy; 2025 Domains Reliance West Africa. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { ProjectsService } from '@/services/projects.service'
import {DomainsService} from "@/services/domains.service.ts";
import {ResidencesService} from "@/services/residences.service.ts";

const router = useRouter()
const appStore = useAppStore()
const authStore = useAuthStore()
const { t, locale } = useI18n()

// Reactive data
const currentSlide = ref(0)
const showLanguageDropdown = ref(false)
const showUserDropdown = ref(false)
const currentLanguage = ref('fr')

const currentView = ref('projects')
const selectedProject = ref<any>(null)
const selectedDomain = ref<any>(null)
const selectedResidence = ref<any>(null)
const selectedProperty = ref<any>(null)

const allProjects = ref<any[]>([])
const projectDomains = ref<any[]>([])
const domainResidences = ref<any[]>([])
const residenceProperties = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// Filters
const filters = ref({
  country: '',
  project: '',
  domain: '',
  residence: '',
  palier: '',
  propertyType: ''
})

// Hero slides data
const heroSlides = ref([
  {
    id: 1,
    title: 'Espaces de Vie Sophistiqués',
    image: '/public/photo 21 copie.png'
  },
  {
    id: 2,
    title: 'Architecture Moderne',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    id: 3,
    title: 'Luxe et Confort',
    image: '/public/bgfd copie.png'
  }
])

// Languages data
const languages = ref([
  { code: 'fr', name: 'Français', native: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'cn', name: '中文', native: '中文', flag: '🇨🇳' }
])

// Mock data with role-based filtering
const allCountries = ref([
  { id: '1', name: 'Côte d\'Ivoire', flag: '🇨🇮' },
  { id: '2', name: 'Ghana', flag: '🇬🇭' },
  { id: '3', name: 'Sénégal', flag: '🇸🇳' },
  { id: '4', name: 'Nigeria', flag: '🇳🇬' },
  { id: '5', name: 'Togo', flag: '🇹🇬' }
])

const loadingProjects = ref(false)
const errorProjects = ref<string | null>(null)

const allDomains = ref([
  {
    id: '1',
    projectId: '1',
    title: 'Domaine Résidentiel Étoile Nord',
    domainType: 'Résidentiel',
    residencesCount: 2,
    description: 'Domaine résidentiel haut de gamme avec tours modernes et espaces verts.',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    published: true
  },
  {
    id: '2',
    projectId: '1',
    title: 'Domaine Commercial Étoile Sud',
    domainType: 'Commercial',
    residencesCount: 1,
    description: 'Espace commercial avec boutiques et restaurants de prestige.',
    image: 'https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=800',
    published: true
  },
  {
    id: '3',
    projectId: '2',
    title: 'Domaine Villa Paradise',
    domainType: 'Villa',
    residencesCount: 1,
    description: 'Domaine exclusif de villas de luxe avec jardins privés et piscines.',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
    published: true
  },
  {
    id: '4',
    projectId: '3',
    title: 'Domaine Mixte Marina',
    domainType: 'Mixte',
    residencesCount: 2,
    description: 'Domaine combinant espaces résidentiels et commerciaux face à la mer.',
    image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800',
    published: true
  }
])

const allResidences = ref([
  {
    id: '1',
    domainId: '1',
    projectId: '1',
    title: 'Tour A - Résidence Étoile',
    residenceType: 'Immeuble',
    floorsCount: 15,
    unitsCount: 24,
    description: 'Tour résidentielle moderne de 15 étages avec appartements premium.',
    image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
    published: true
  },
  {
    id: '2',
    domainId: '1',
    projectId: '1',
    title: 'Tour B - Résidence Étoile',
    residenceType: 'Immeuble',
    floorsCount: 12,
    unitsCount: 18,
    description: 'Seconde tour avec vue panoramique sur la lagune.',
    image: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800',
    published: true
  },
  {
    id: '3',
    domainId: '2',
    projectId: '1',
    title: 'Centre Commercial Étoile',
    residenceType: 'Commercial',
    floorsCount: 3,
    unitsCount: 12,
    description: 'Centre commercial moderne avec boutiques et espaces de restauration.',
    image: 'https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=800',
    published: true
  },
  {
    id: '4',
    domainId: '3',
    projectId: '2',
    title: 'Villas Premium Golden',
    residenceType: 'Villas',
    floorsCount: 2,
    unitsCount: 8,
    description: 'Ensemble de villas individuelles avec jardins privés et vue océan.',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
    published: true
  },
  {
    id: '5',
    domainId: '4',
    projectId: '3',
    title: 'Résidence Marina Bay A',
    residenceType: 'Immeuble',
    floorsCount: 10,
    unitsCount: 20,
    description: 'Immeuble résidentiel avec vue sur la baie.',
    image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800',
    published: true
  },
  {
    id: '6',
    domainId: '4',
    projectId: '3',
    title: 'Espace Commercial Marina',
    residenceType: 'Commercial',
    floorsCount: 2,
    unitsCount: 15,
    description: 'Espace commercial en bord de mer avec boutiques et restaurants.',
    image: 'https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=800',
    published: true
  }
])

const allPaliers = ref([
  { id: '1', residenceId: '1', title: 'Rez-de-chaussée', unitCount: 4 },
  { id: '2', residenceId: '1', title: '1er étage', unitCount: 4 },
  { id: '3', residenceId: '1', title: '2ème étage', unitCount: 4 },
  { id: '4', residenceId: '2', title: 'Rez-de-chaussée', unitCount: 3 },
  { id: '5', residenceId: '2', title: '1er étage', unitCount: 3 }
])

const allProperties = ref([
  {
    id: '1',
    residenceId: '1',
    projectId: '1',
    palierId: '1',
    title: 'Appartement 3P - A101',
    propertyType: 'appartement',
    rooms: 3,
    kitchens: 1,
    balcony: true,
    furnished: false,
    surfaceM2: 85,
    status: 'Disponible',
    published: true,
    price: 45000000,
    image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    residenceId: '1',
    projectId: '1',
    palierId: '1',
    title: 'Appartement 2P - A102',
    propertyType: 'appartement',
    rooms: 2,
    kitchens: 1,
    balcony: true,
    furnished: true,
    surfaceM2: 65,
    status: 'Sous discussion cliente',
    published: true,
    price: 35000000,
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '3',
    residenceId: '2',
    projectId: '1',
    palierId: '4',
    title: 'Appartement 4P - B101',
    propertyType: 'appartement',
    rooms: 4,
    kitchens: 1,
    balcony: true,
    furnished: false,
    surfaceM2: 120,
    status: 'Réservé',
    published: true,
    price: 65000000,
    image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '4',
    residenceId: '3',
    projectId: '2',
    title: 'Villa Premium - V001',
    propertyType: 'villa',
    rooms: 5,
    kitchens: 2,
    balcony: true,
    furnished: false,
    surfaceM2: 250,
    status: 'Disponible',
    published: true,
    price: 125000000,
    image: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
])

// Computed properties
const currentLanguageFlag = computed(() => {
  const lang = languages.value.find(l => l.code === currentLanguage.value)
  return lang?.flag || '🇫🇷'
})

const userName = computed(() => authStore.user?.fullname || 'Utilisateur')
const userEmail = computed(() => authStore.user?.email || 'user@example.com')
const userRole = computed(() => {
  const roles = {
    'COMMERCIAL': 'Commercial',
    'ADMIN': 'Administrateur',
    'SUPERADMIN': 'Super Administrateur'
  }
  return roles[authStore.userRole || 'COMMERCIAL']
})

const userAvatar = computed(() => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(userName.value)}&background=3b82f6&color=fff`
})

// Role-based data filtering
const availableCountries = computed(() => {
  if (authStore.userRole === 'COMMERCIAL') {
    // Commercial users see countries based on their projects
    const userProjects = allProjects.value.filter(p => p.createdBy === authStore.user?.id && p.published)
    const countryIds = [...new Set(userProjects.map(p => p.countryId))]
    return allCountries.value.filter(c => countryIds.includes(c.id))
  }
  return allCountries.value // ADMIN and SUPERADMIN see all countries
})

const availableProjects = computed(() => {
  let projects = allProjects.value.filter(p => p.published)
  
  if (authStore.userRole === 'COMMERCIAL') {
    projects = projects.filter(p => p.createdBy === authStore.user?.id)
  }
  
  if (filters.value.country) {
    projects = projects.filter(p => p.countryId === filters.value.country)
  }
  
  return projects
})

const availableDomains = computed(() => {
  if (!filters.value.project) return []
  return allDomains.value.filter(d => d.projectId === filters.value.project && d.published)
})

const availableResidences = computed(() => {
  if (!filters.value.domain) return []
  return allResidences.value.filter(r => r.domainId === filters.value.domain && r.published)
})

const availablePaliers = computed(() => {
  if (!filters.value.residence) return []
  return allPaliers.value.filter(p => p.residenceId === filters.value.residence)
})

const displayedProjects = computed(() => {
  let projects = allProjects.value.map((p) => ({
    id: p.id,
    title: p.name,
    description: p.description,
    type: p.type,
    city: p.city,

    image: p.heroImageUrl,
    published: p.status === 'PUBLISHED',

    residencesCount: p.residencesCount,
    propertiesCount: p.propertiesCount,

    domainsCount: p.domainsCount ?? 0, // sécurité

    country: p.country?.name,
    countryFlag: p.country?.flagEmoji ?? '🏳️',
  }))
  
  if (filters.value.propertyType) {
    // Filter projects that have properties of the selected type
    const projectIds = allProperties.value
      .filter(p => p.propertyType === filters.value.propertyType && p.published && 
                   (p.status === 'Disponible' || p.status === 'Sous discussion cliente'))
      .map(p => p.projectId)
    projects = projects.filter(p => projectIds.includes(p.id))
  }
  
  return projects
})

// const projectDomains = computed(() => {
//   if (!selectedProject.value) return []
//   return allDomains.value.filter(d => d.projectId === selectedProject.value.id && d.published)
// })
//
// const domainResidences = computed(() => {
//   if (!selectedDomain.value) return []
//   return allResidences.value.filter(r => r.domainId === selectedDomain.value.id && r.published)
// })
//
// const residenceProperties = computed(() => {
//   if (!selectedResidence.value) return []
//   return allProperties.value.filter(p =>
//     p.residenceId === selectedResidence.value.id &&
//     p.published &&
//     (p.status === 'Disponible' || p.status === 'Sous discussion cliente')
//   )
// })

const activeFilters = computed(() => {
  const active = []
  
  if (filters.value.country) {
    const country = allCountries.value.find(c => c.id === filters.value.country)
    if (country) active.push({ key: 'country', label: country.name })
  }
  
  if (filters.value.project) {
    const project = allProjects.value.find(p => p.id === filters.value.project)
    if (project) active.push({ key: 'project', label: project.title })
  }

  if (filters.value.domain) {
    const domain = allDomains.value.find(d => d.id === filters.value.domain)
    if (domain) active.push({ key: 'domain', label: domain.title })
  }

  if (filters.value.residence) {
    const residence = allResidences.value.find(r => r.id === filters.value.residence)
    if (residence) active.push({ key: 'residence', label: residence.title })
  }
  
  if (filters.value.palier) {
    const palier = allPaliers.value.find(p => p.id === filters.value.palier)
    if (palier) active.push({ key: 'palier', label: palier.title })
  }
  
  if (filters.value.propertyType) {
    const types = {
      'appartement': 'Appartement',
      'villa': 'Villa',
      'magasin': 'Magasin'
    }
    active.push({ key: 'propertyType', label: types[filters.value.propertyType] })
  }
  
  return active
})

const breadcrumbs = computed(() => {
  const crumbs = [{ title: 'Projets', view: 'projects' }]

  if (selectedProject.value) {
    crumbs.push({ title: selectedProject.value.title, view: 'project-detail' })
  }

  if (selectedDomain.value) {
    crumbs.push({ title: selectedDomain.value.title, view: 'domain-detail' })
  }

  if (selectedResidence.value) {
    crumbs.push({ title: selectedResidence.value.title, view: 'residence-detail' })
  }

  if (selectedProperty.value) {
    crumbs.push({ title: selectedProperty.value.title, view: 'property-detail' })
  }

  return crumbs
})

// Methods
const fetchProjects = async () => {
  loadingProjects.value = true
  errorProjects.value = null

  try {
    const response = await ProjectsService.all()
    allProjects.value = response.data
  } catch (error: any) {
    errorProjects.value =
        error.response?.data?.message || 'Erreur lors du chargement des projets'
  } finally {
    loadingProjects.value = false
  }
}


const changeLanguage = (langCode: string) => {
  currentLanguage.value = langCode
  locale.value = langCode
  showLanguageDropdown.value = false
}

const logout = () => {
  authStore.logout()
  router.push('/access-code')
}

const onCountryChange = () => {
  filters.value.project = ''
  filters.value.domain = ''
  filters.value.residence = ''
  filters.value.palier = ''
}

const onProjectChange = () => {
  filters.value.domain = ''
  filters.value.residence = ''
  filters.value.palier = ''
}

const onDomainChange = () => {
  filters.value.residence = ''
  filters.value.palier = ''
}

const onResidenceChange = () => {
  filters.value.palier = ''
}

const onPalierChange = () => {
  // No cascading needed for palier
}

const removeFilter = (key: string) => {
  filters.value[key] = ''

  // Handle cascading
  if (key === 'country') {
    filters.value.project = ''
    filters.value.domain = ''
    filters.value.residence = ''
    filters.value.palier = ''
  } else if (key === 'project') {
    filters.value.domain = ''
    filters.value.residence = ''
    filters.value.palier = ''
  } else if (key === 'domain') {
    filters.value.residence = ''
    filters.value.palier = ''
  } else if (key === 'residence') {
    filters.value.palier = ''
  }
}

const clearAllFilters = () => {
  filters.value = {
    country: '',
    project: '',
    domain: '',
    residence: '',
    palier: '',
    propertyType: ''
  }
}

const selectProject = async (project: any) => {
  selectedProject.value = project
  selectedDomain.value = null
  selectedResidence.value = null
  selectedProperty.value = null
  currentView.value = 'project-detail'

  try {
    loading.value = true
    const res = await DomainsService.all()
    projectDomains.value = res.data.filter(it => it.projectId == project.id)
  } catch (err) {
    projectDomains.value = []
  } finally {
    loading.value = false
  }
}


const selectDomain = async (domain: any) => {
  selectedDomain.value = domain
  selectedResidence.value = null
  selectedProperty.value = null
  currentView.value = 'domain-detail'

  try {
    loading.value = true
    const res = await ResidencesService.all()
    domainResidences.value = res.data.filter(it => it.domainId == domain.id)
    console.log(domainResidences.value)
  } catch (err) {
    domainResidences.value = []
  } finally {
    loading.value = false
  }
}


const selectResidence = (residence: any) => {
  selectedResidence.value = residence
  selectedProperty.value = null
  currentView.value = 'residence-detail'
}

const selectProperty = (property: any) => {
  selectedProperty.value = property
  currentView.value = 'property-detail'
}

const navigateToBreadcrumb = (index: number) => {
  const crumb = breadcrumbs.value[index]
  currentView.value = crumb.view

  if (index === 0) {
    selectedProject.value = null
    selectedDomain.value = null
    selectedResidence.value = null
    selectedProperty.value = null
  } else if (index === 1) {
    selectedDomain.value = null
    selectedResidence.value = null
    selectedProperty.value = null
  } else if (index === 2) {
    selectedResidence.value = null
    selectedProperty.value = null
  } else if (index === 3) {
    selectedProperty.value = null
  }
}

const getStatusClasses = (status: string) => {
  const classes = {
    'Disponible': 'bg-green-100 text-green-800',
    'Sous discussion cliente': 'bg-yellow-100 text-yellow-800',
    'Réservé': 'bg-blue-100 text-blue-800',
    'Vendu': 'bg-purple-100 text-purple-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR').format(price)
}

// Lifecycle
onMounted(() => {

  fetchProjects()
  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100
  })

  // Hero slider auto-advance
  const heroInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % heroSlides.value.length
  }, 8000)

  // Cleanup intervals
  onUnmounted(() => {
    clearInterval(heroInterval)
  })

  // Close dropdowns on outside click
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Element
    if (!target.closest('.relative')) {
      showLanguageDropdown.value = false
      showUserDropdown.value = false
    }
  }

  document.addEventListener('click', handleClickOutside)
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Filter styles */
.filter-item {
  @apply min-w-[180px] flex-shrink-0;
}

.filter-select {
  @apply w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300;
}

.filter-select:disabled {
  @apply opacity-50 cursor-not-allowed;
}

.filter-select option {
  @apply bg-navy-900 text-white;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Glass morphism effect */
.glass {
  @apply bg-white/10 backdrop-blur-xl border border-white/20;
}

/* Premium gradients */
.gradient-gold {
  background: linear-gradient(135deg, #d4af37 0%, #f4e4a6 100%);
}

.gradient-blue {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}

/* Hover effects */
.hover-lift {
  @apply transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl;
}

/* Focus states for accessibility */
button:focus-visible,
select:focus-visible,
input:focus-visible {
  @apply outline-none ring-2 ring-blue-500 ring-offset-2;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>