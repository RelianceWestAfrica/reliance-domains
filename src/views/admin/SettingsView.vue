<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">{{ $t('nav.settings') }}</h1>
        <p class="text-gray-600">Configuration et paramètres système</p>
      </div>
    </div>

    <!-- Settings Sections -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- General Settings -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Company Information -->
        <div class="card-premium p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Informations de l'entreprise</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AppInput
                v-model="settings.companyName"
                label="Nom de l'entreprise"
                placeholder="RELIANCE WEST AFRICA"
              />
              <AppInput
                v-model="settings.companyEmail"
                label="Email de contact"
                type="email"
                placeholder="contact@reliancewestafrica.com"
              />
            </div>
            <AppInput
              v-model="settings.companyAddress"
              label="Adresse"
              placeholder="Adresse de l'entreprise"
            />
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AppInput
                v-model="settings.companyPhone"
                label="Téléphone"
                placeholder="+225 XX XX XX XX XX"
              />
              <AppInput
                v-model="settings.companyWebsite"
                label="Site web"
                placeholder="https://reliancewestafrica.com"
              />
            </div>
          </div>
        </div>

        <!-- System Settings -->
        <div class="card-premium p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Paramètres système</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AppSelect
                v-model="settings.defaultLanguage"
                label="Langue par défaut"
                :options="languageOptions"
              />
              <AppSelect
                v-model="settings.defaultCurrency"
                label="Devise par défaut"
                :options="currencyOptions"
              />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AppSelect
                v-model="settings.timezone"
                label="Fuseau horaire"
                :options="timezoneOptions"
              />
              <AppSelect
                v-model="settings.dateFormat"
                label="Format de date"
                :options="dateFormatOptions"
              />
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div class="card-premium p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <label class="text-sm font-medium text-gray-900">Notifications par email</label>
                <p class="text-sm text-gray-500">Recevoir les notifications importantes par email</p>
              </div>
              <button
                @click="settings.emailNotifications = !settings.emailNotifications"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
                :class="settings.emailNotifications ? 'bg-accent-600' : 'bg-gray-200'"
              >
                <span
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  :class="settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'"
                />
              </button>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <label class="text-sm font-medium text-gray-900">Notifications push</label>
                <p class="text-sm text-gray-500">Recevoir les notifications dans le navigateur</p>
              </div>
              <button
                @click="settings.pushNotifications = !settings.pushNotifications"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
                :class="settings.pushNotifications ? 'bg-accent-600' : 'bg-gray-200'"
              >
                <span
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  :class="settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="space-y-6">
        <!-- System Status -->
        <div class="card-premium p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">État du système</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Base de données</span>
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <div class="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                En ligne
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Serveur</span>
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <div class="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                Opérationnel
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Stockage</span>
              <span class="text-sm text-gray-900">2.4 GB / 10 GB</span>
            </div>
          </div>
        </div>

        <!-- Backup & Maintenance -->
        <div class="card-premium p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Maintenance</h3>
          <div class="space-y-3">
            <AppButton
              @click="createBackup"
              variant="outline"
              full-width
              class="justify-start"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
              </svg>
              Créer une sauvegarde
            </AppButton>
            
            <AppButton
              @click="clearCache"
              variant="outline"
              full-width
              class="justify-start"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
              Vider le cache
            </AppButton>
            
            <AppButton
              @click="exportData"
              variant="outline"
              full-width
              class="justify-start"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Exporter les données
            </AppButton>
          </div>
        </div>

        <!-- Save Button -->
        <AppButton
          @click="saveSettings"
          variant="primary"
          full-width
          :loading="isSaving"
        >
          {{ $t('common.save') }}
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppSelect from '@/components/ui/AppSelect.vue'
import AppButton from '@/components/ui/AppButton.vue'

const isSaving = ref(false)

const settings = ref({
  companyName: 'RELIANCE WEST AFRICA',
  companyEmail: 'contact@reliancewestafrica.com',
  companyAddress: 'Abidjan, Côte d\'Ivoire',
  companyPhone: '+225 XX XX XX XX XX',
  companyWebsite: 'https://reliancewestafrica.com',
  defaultLanguage: 'fr',
  defaultCurrency: 'XOF',
  timezone: 'Africa/Abidjan',
  dateFormat: 'DD/MM/YYYY',
  emailNotifications: true,
  pushNotifications: false
})

const languageOptions = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'English' },
  { value: 'cn', label: '中文' }
]

const currencyOptions = [
  { value: 'XOF', label: 'Franc CFA (XOF)' },
  { value: 'USD', label: 'Dollar US (USD)' },
  { value: 'EUR', label: 'Euro (EUR)' }
]

const timezoneOptions = [
  { value: 'Africa/Abidjan', label: 'Africa/Abidjan (GMT+0)' },
  { value: 'Africa/Accra', label: 'Africa/Accra (GMT+0)' },
  { value: 'Africa/Dakar', label: 'Africa/Dakar (GMT+0)' }
]

const dateFormatOptions = [
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
]

const saveSettings = async () => {
  isSaving.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Settings saved:', settings.value)
  } finally {
    isSaving.value = false
  }
}

const createBackup = () => {
  console.log('Creating backup...')
  // Implement backup functionality
}

const clearCache = () => {
  console.log('Clearing cache...')
  // Implement cache clearing
}

const exportData = () => {
  console.log('Exporting data...')
  // Implement data export
}
</script>