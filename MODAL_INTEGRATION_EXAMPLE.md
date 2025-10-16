# Modal Integration Example

## Complete Integration in ProjectsView

Here's a complete example of how to integrate the modal system into any view component:

```vue
<template>
  <div class="projects-management">
    <!-- Header with New Project Button -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="page-title">Project Management</h1>
          <p class="page-subtitle">Manage real estate projects</p>
        </div>
        <div class="header-actions">
          <button
            @click="projectModal.openCreate()"
            class="btn-primary"
          >
            <Plus class="w-5 h-5" />
            New Project
          </button>
        </div>
      </div>
    </div>

    <!-- Projects Grid -->
    <div class="projects-grid">
      <div
        v-for="project in projects"
        :key="project.id"
        class="project-card"
      >
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>

        <!-- Action Buttons -->
        <div class="card-actions">
          <button
            @click="projectModal.openEdit(project)"
            class="btn-secondary"
          >
            <Edit class="w-4 h-4" />
            Edit
          </button>
          <button
            @click="deleteModal.openDelete(project)"
            class="btn-danger"
          >
            <Trash2 class="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Project Modal (Create/Edit) -->
    <ProjectModal
      :is-open="projectModal.state.isOpen"
      :mode="projectModal.state.mode as 'create' | 'edit'"
      :project="projectModal.state.data"
      @close="projectModal.close()"
      @success="handleProjectSuccess"
    />

    <!-- Delete Confirmation -->
    <ConfirmDialog
      :is-open="deleteModal.state.isOpen"
      title="Delete Project"
      message="Are you sure you want to delete this project?"
      details="This action cannot be undone. All associated data will be permanently removed."
      type="danger"
      confirm-text="Delete Project"
      :loading="deleting"
      @confirm="handleDelete"
      @cancel="deleteModal.close()"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Plus, Edit, Trash2 } from 'lucide-vue-next'
import { useAppStore } from '@/stores/app'
import { useModal } from '@/composables/useModal'
import ProjectModal from '@/components/modals/ProjectModal.vue'
import ConfirmDialog from '@/components/modals/ConfirmDialog.vue'
import type { Project } from '@/types'

const appStore = useAppStore()

// Modal State Management
const projectModal = useModal<Project>()
const deleteModal = useModal<Project>()
const deleting = ref(false)

// Data
const projects = computed(() => appStore.projects)

// Handlers
function handleProjectSuccess(project: Project) {
  console.log('Project saved successfully:', project)
  // Optionally show a toast notification
}

async function handleDelete() {
  if (!deleteModal.state.data) return

  deleting.value = true
  try {
    appStore.deleteProject(deleteModal.state.data.id)
    deleteModal.close()
    // Show success notification
  } catch (error) {
    console.error('Error deleting project:', error)
    // Show error notification
  } finally {
    deleting.value = false
  }
}
</script>
```

## Integration Steps

### 1. Import Required Components and Composables

```typescript
import { useModal } from '@/composables/useModal'
import ProjectModal from '@/components/modals/ProjectModal.vue'
import ConfirmDialog from '@/components/modals/ConfirmDialog.vue'
import type { Project } from '@/types'
```

### 2. Initialize Modal State

```typescript
const projectModal = useModal<Project>()
const deleteModal = useModal<Project>()
const deleting = ref(false)
```

### 3. Add Modal Triggers

```vue
<!-- Create -->
<button @click="projectModal.openCreate()">
  New Project
</button>

<!-- Edit -->
<button @click="projectModal.openEdit(project)">
  Edit
</button>

<!-- Delete -->
<button @click="deleteModal.openDelete(project)">
  Delete
</button>
```

### 4. Add Modal Components

```vue
<ProjectModal
  :is-open="projectModal.state.isOpen"
  :mode="projectModal.state.mode as 'create' | 'edit'"
  :project="projectModal.state.data"
  @close="projectModal.close()"
  @success="handleProjectSuccess"
/>

<ConfirmDialog
  :is-open="deleteModal.state.isOpen"
  title="Delete Project"
  message="Are you sure?"
  type="danger"
  :loading="deleting"
  @confirm="handleDelete"
  @cancel="deleteModal.close()"
/>
```

### 5. Implement Handlers

```typescript
function handleProjectSuccess(project: Project) {
  // Handle success (refresh data, show notification, etc.)
}

async function handleDelete() {
  if (!deleteModal.state.data) return

  deleting.value = true
  try {
    await deleteProject(deleteModal.state.data.id)
    deleteModal.close()
  } finally {
    deleting.value = false
  }
}
```

## Additional Examples

### Client Management

```vue
<template>
  <div class="clients-view">
    <!-- Buttons -->
    <button @click="clientModal.openCreate()">New Client</button>

    <!-- In list -->
    <button @click="clientModal.openView(client)">View</button>
    <button @click="clientModal.openEdit(client)">Edit</button>

    <!-- Modals -->
    <ClientModal
      :is-open="clientModal.state.isOpen"
      :mode="clientModal.state.mode as 'create' | 'edit' | 'view'"
      :client="clientModal.state.data"
      @close="clientModal.close()"
      @success="handleClientSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { useModal } from '@/composables/useModal'
import ClientModal from '@/components/modals/ClientModal.vue'
import type { Client } from '@/types'

const clientModal = useModal<Client>()

function handleClientSuccess(client: Client) {
  console.log('Client saved:', client)
}
</script>
```

### Floor Management

```vue
<template>
  <div class="floors-view">
    <!-- Add Floor -->
    <button @click="palierModal.openCreate()">Add Floor</button>

    <!-- Floor Actions -->
    <button @click="palierModal.openEdit(floor)">Edit</button>
    <button @click="deleteFloorModal.openDelete(floor)">Delete</button>

    <!-- Modals -->
    <PalierModal
      :is-open="palierModal.state.isOpen"
      :mode="palierModal.state.mode as 'create' | 'edit'"
      :palier="palierModal.state.data"
      :residence-id="selectedResidenceId"
      @close="palierModal.close()"
      @success="handleFloorSuccess"
    />

    <ConfirmDialog
      :is-open="deleteFloorModal.state.isOpen"
      title="Delete Floor"
      message="Delete this floor?"
      type="danger"
      @confirm="handleDeleteFloor"
      @cancel="deleteFloorModal.close()"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useModal } from '@/composables/useModal'
import PalierModal from '@/components/modals/PalierModal.vue'
import ConfirmDialog from '@/components/modals/ConfirmDialog.vue'
import type { Palier } from '@/types'

const palierModal = useModal<Palier>()
const deleteFloorModal = useModal<Palier>()
const selectedResidenceId = ref('')

function handleFloorSuccess(floor: Palier) {
  console.log('Floor saved:', floor)
}

async function handleDeleteFloor() {
  if (!deleteFloorModal.state.data) return
  // Delete logic
  deleteFloorModal.close()
}
</script>
```

## Error Handling

```typescript
async function handleSubmit() {
  try {
    loading.value = true
    await saveData()
    modal.close()
    // Show success toast
  } catch (error) {
    console.error('Error:', error)
    // Show error toast or inline error
    if (error instanceof ValidationError) {
      errors.value = error.errors
    }
  } finally {
    loading.value = false
  }
}
```

## Success Notifications

```typescript
import { useToast } from '@/composables/useToast'

const toast = useToast()

function handleSuccess(item: any) {
  toast.success('Item saved successfully!')
  // Or
  toast.show({
    type: 'success',
    title: 'Success',
    message: 'Item saved successfully!',
    duration: 3000
  })
}
```

## Keyboard Shortcuts

```typescript
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  document.addEventListener('keydown', handleKeyboard)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyboard)
})

function handleKeyboard(e: KeyboardEvent) {
  // Ctrl+N or Cmd+N for new
  if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
    e.preventDefault()
    projectModal.openCreate()
  }
}
```

## Best Practices Checklist

- ✅ Use `useModal` composable for state management
- ✅ Handle loading states during async operations
- ✅ Provide user feedback (toasts/notifications)
- ✅ Implement proper error handling
- ✅ Reset forms when modals close
- ✅ Validate data before submission
- ✅ Use appropriate modal sizes
- ✅ Test keyboard navigation
- ✅ Handle edge cases (null data, network errors)
- ✅ Maintain consistent styling across modals
