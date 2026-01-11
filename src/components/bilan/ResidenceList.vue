<script setup lang="ts">
import ResidenceCard from '@/components/bilan/ResidenceCard.vue'

const emit = defineEmits<{
  selectResidence: [residenceId: string]
}>()

const props = defineProps<{
  residences: any[]
}>()

const handleViewDetails = (residenceId: string) => {
  emit('selectResidence', residenceId)
}
</script>

<template>
  <div class="residence-list-container">
    <div class="list-header">
      <h2 class="page-title">Gestion des Résidences</h2>
      <p class="page-subtitle">
        Explorez nos {{ residences.length }} résidences et consultez l'état de chaque appartement
      </p>
    </div>

    <div class="residence-grid">
      <ResidenceCard
          v-for="residence in residences"
          :key="residence.id"
          :residence="residence"
          @view-details="handleViewDetails"
      />
    </div>
  </div>
</template>


<style scoped>
.residence-list-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 24px;
}

.list-header {
  text-align: center;
  margin-bottom: 48px;
}

.page-title {
  font-size: 42px;
  font-weight: 700;
  color: #3b4b59;
  margin: 0 0 12px 0;
  letter-spacing: -1px;
}

.page-subtitle {
  font-size: 18px;
  color: #6B7280;
  margin: 0;
  font-weight: 400;
}

.residence-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 32px;
}

@media (max-width: 1200px) {
  .residence-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .residence-list-container {
    padding: 24px 16px;
  }

  .list-header {
    margin-bottom: 32px;
  }

  .page-title {
    font-size: 32px;
  }

  .page-subtitle {
    font-size: 16px;
  }

  .residence-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
