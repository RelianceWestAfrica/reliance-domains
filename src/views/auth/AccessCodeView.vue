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
              <!-- <h1 class="text-xl font-bold">{{ $t('app.title') }}</h1>
              <p class="text-sm text-gray-300">{{ $t('app.subtitle') }}</p> -->
            </div>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="w-full max-w-md animate-fade-in mt-20">
      <div class="card-glass p-8 text-center">
        <!-- Logo -->
        <div class="mb-8">
          <div class="mx-auto w-16 h-16 bg-gradient-to-br from-accent-400 via-accent-500 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>

        <h2 class="text-2xl font-bold text-gray-900 mb-2">
          DOMAINS
        </h2>
        
        <p class="text-gray-600 mb-8">
          Connexion
        </p>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <AppInput
            v-model="accessCode"
            :label="$t('Code d\'accès')"
            :placeholder="$t('Entrer votre code d\'accès')"
            :error="error"
            :is-loading="authStore.loading"
            required
            autocomplete="off"
          >
            <template #icon>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-6 6c-3 0-5.196-1.004-6.5-2.5a11.25 11.25 0 01-2.5-2.5m0 0a6 6 0 016-6 2 2 0 012 2m6 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </template>
          </AppInput>

          <AppButton
            type="submit"
            variant="primary"
            :loading="authStore.loading"
            :disabled="!accessCode.trim()"
            full-width
            class="group"
          >
            {{ $t('auth.continue') }}
            <svg class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </AppButton>
        </form>

        <!-- Security Badge -->
        <!-- <div class="mt-6 flex items-center justify-center text-sm text-green-600">
          <div class="pulse-dot mr-2"></div>
          {{ $t('auth.secureConnection') }}
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'

import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'

const router = useRouter()
const authStore = useAuthStore()
const { t } = useI18n()

const accessCode = ref('')
const error = ref<string | null>(null)

const handleSubmit = async () => {
  error.value = null

  if (!accessCode.value.trim()) {
    error.value = t('auth.invalidCode')
    return
  }

  const success = await authStore.validateAccessCode(accessCode.value)

  if (success) {
    router.push('/login')
  } else {
    error.value = authStore.error || t('auth.invalidCode')
  }
}
</script>
