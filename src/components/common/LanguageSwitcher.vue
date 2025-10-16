<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-800/80 hover:text-red-800/70 transition-colors rounded-lg hover:bg-gray-50/50"
    >
    <span class="absolute top-3 right-16 w-2 h-2 bg-red-500 rounded-full"></span>
      <!-- <span class="text-lg">{{ currentFlag }}</span> -->
      <span>{{ currentLanguage.toUpperCase() }}</span>
      <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': isOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="isOpen" class="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click="changeLanguage(lang.code)"
          class="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-3"
          :class="{ 'bg-accent-50 text-accent-600 font-semibold': currentLanguage === lang.code }"
        >
          <span class="text-lg">{{ lang.flag }}</span>
          <span>{{ lang.name }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/app'
import type { Language } from '@/stores/app'

const { locale } = useI18n()
const appStore = useAppStore() 

const isOpen = ref(false)

const languages = [
  { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'cn' as Language, name: '中文', flag: '🇨🇳' }
]

const currentLanguage = computed(() => appStore.currentLanguage)

const currentFlag = computed(() => {
  const lang = languages.find(l => l.code === currentLanguage.value)
  return lang?.flag || '🇫🇷'
})

const changeLanguage = (langCode: Language) => {
  appStore.setLanguage(langCode)
  locale.value = langCode
  isOpen.value = false
}

const closeDropdown = (event: MouseEvent) => {
  if (isOpen.value) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>