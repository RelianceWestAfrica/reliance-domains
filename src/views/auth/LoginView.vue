<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-4">
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 bg-primary-950/90 backdrop-blur-sm text-white z-50">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
              <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 3a1 1 0 011-1h6a1 1 0 011 1v4h6a1 1 0 011 1v9a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm7 1H5v14h10V9h-5V4zM7 10h2v2H7v-2zm4 0h2v2h-2v-2zM7 13h2v2H7v-2zm4 0h2v2h-2v-2z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold">DOMAINS</h1>
              <p class="text-sm text-gray-300">Reliance West Africa</p>
            </div>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="w-full max-w-md animate-fade-in mt-20">
      <div class="card-glass p-8">
        <!-- Logo -->
        <div class="text-center mb-8">
          <div class="mx-auto w-16 h-16 bg-gradient-to-br from-accent-400 via-accent-500 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            {{ $t('auth.login') }}
          </h2>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <AppInput
              v-model="credentials.email"
              type="email"
              :label="$t('auth.email')"
              placeholder="admin@example.com"
              :error="errors.email"
              required
              autocomplete="email"
          >
            <template #icon>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
              </svg>
            </template>
          </AppInput>

          <AppInput
              v-model="credentials.password"
              type="password"
              :label="$t('auth.password')"
              placeholder="••••••••"
              :error="errors.password"
              required
              autocomplete="current-password"
          >
            <template #icon>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </template>
          </AppInput>

          <!-- Erreur générale (du store ou validation locale) -->
          <div v-if="generalError" class="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 animate-slide-up">
            {{ generalError }}
          </div>

          <AppButton
              type="submit"
              variant="primary"
              :loading="authStore.loading"
              full-width
              class="group"
          >
            {{ $t('auth.signin') }}
            <svg class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
            </svg>
          </AppButton>
        </form>

        <div class="mt-6 text-center">
          <a href="#" class="text-sm text-accent-600 hover:text-accent-800 transition-colors">
            {{ $t('auth.forgotPassword') }}
          </a>
        </div>

        <!-- Demo credentials -->
<!--        <div class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">-->
<!--          <p class="text-xs text-gray-600 mb-2 font-semibold">Identifiants de démonstration :</p>-->
<!--          <p class="text-xs text-gray-600">Email: admin@example.com</p>-->
<!--          <p class="text-xs text-gray-600">Mot de passe: password123</p>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'

const router = useRouter()
const authStore = useAuthStore()
const { t } = useI18n()

const credentials = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: ''
})

const generalError = ref('')

const validateForm = () => {
  errors.email = ''
  errors.password = ''
  generalError.value = ''

  let valid = true

  if (!credentials.email) {
    errors.email = t('validation.required', { field: t('auth.email') })
    valid = false
  } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
    errors.email = t('validation.email')
    valid = false
  }

  if (!credentials.password) {
    errors.password = t('validation.required', { field: t('auth.password') })
    valid = false
  } else if (credentials.password.length < 6) {
    errors.password = t('validation.min', { field: t('auth.password'), min: 6 })
    valid = false
  }

  return valid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  const success = await authStore.login(credentials.email, credentials.password)

  if (success) {
    // Optionnel : re-fetch user pour être sûr d'avoir les données fraîches
    // await authStore.fetchUser()
    router.push('/dashboard')
  } else {
    generalError.value = authStore.error || t('auth.invalidCredentials')
  }
}

// Si l'utilisateur est déjà connecté, rediriger directement
onMounted(() => {
  authStore.initializeAuth()
  if (authStore.isAuthenticated) {
    router.push('/briefing')
  }
})
</script>