# Modal System Documentation

## Overview

This directory contains a comprehensive modal system for the DOMAINS admin dashboard. The system provides reusable, accessible, and elegant modal components for all CRUD operations.

## Core Components

### BaseModal.vue
The foundation modal component that provides:
- Overlay with backdrop blur
- Keyboard navigation (ESC to close)
- Accessibility features (ARIA labels, focus management)
- Multiple sizes (sm, md, lg, xl)
- Customizable header, body, and footer slots
- Smooth transitions and animations

**Props:**
- `isOpen` (boolean): Controls modal visibility
- `title` (string): Modal title
- `size` ('sm' | 'md' | 'lg' | 'xl'): Modal width
- `showClose` (boolean): Show close button
- `closeOnOverlay` (boolean): Close when clicking overlay
- `scrollable` (boolean): Enable body scrolling

**Usage:**
```vue
<BaseModal
  :is-open="isOpen"
  title="My Modal"
  size="lg"
  @close="handleClose"
>
  <template #default>
    <!-- Modal content -->
  </template>

  <template #footer>
    <!-- Footer buttons -->
  </template>
</BaseModal>
```

### ConfirmDialog.vue
A specialized confirmation dialog for destructive actions with:
- Visual feedback icons
- Different types (info, warning, danger, success)
- Loading states
- Customizable button text

**Props:**
- `isOpen` (boolean): Controls dialog visibility
- `title` (string): Dialog title
- `message` (string): Main confirmation message
- `details` (string): Additional details
- `type` ('info' | 'warning' | 'danger' | 'success'): Visual style
- `confirmText` (string): Confirm button text
- `cancelText` (string): Cancel button text
- `loading` (boolean): Show loading spinner

**Usage:**
```vue
<ConfirmDialog
  :is-open="deleteModal.isOpen"
  title="Delete Project"
  message="Are you sure you want to delete this project?"
  details="This action cannot be undone."
  type="danger"
  confirm-text="Delete"
  @confirm="handleDelete"
  @cancel="deleteModal.close()"
/>
```

## Feature-Specific Modals

### ProjectModal.vue
Modal for creating and editing projects with:
- Project title, type, and location fields
- Country selection
- Photo URL input
- Publish toggle
- Full validation

**Props:**
- `isOpen` (boolean)
- `mode` ('create' | 'edit')
- `project` (Project | null)

**Events:**
- `close`: Modal closed
- `success`: Operation successful with project data

### PalierModal.vue
Modal for managing floors/levels with:
- Residence selection
- Floor title and unit count
- Description field

**Props:**
- `isOpen` (boolean)
- `mode` ('create' | 'edit')
- `palier` (Palier | null)
- `residenceId` (string): Pre-select residence

### ClientModal.vue
Multi-mode modal for client management:
- **Create/Edit Mode**: Full form with validation
- **View Mode**: Read-only detail display
- Personal and contact information sections

**Props:**
- `isOpen` (boolean)
- `mode` ('create' | 'edit' | 'view')
- `client` (Client | null)

## useModal Composable

A composable for managing modal state across components:

```typescript
const projectModal = useModal<Project>()

// Open in different modes
projectModal.openCreate()
projectModal.openEdit(project)
projectModal.openView(project)
projectModal.openDelete(project)

// Access state
projectModal.state.isOpen
projectModal.state.mode
projectModal.state.data

// Close
projectModal.close()
```

## Integration Example

### Complete Example with ProjectsView

```vue
<template>
  <div class="projects-view">
    <!-- Action Button -->
    <button @click="projectModal.openCreate()">
      New Project
    </button>

    <!-- Projects List -->
    <div v-for="project in projects" :key="project.id">
      <button @click="projectModal.openEdit(project)">Edit</button>
      <button @click="deleteModal.openDelete(project)">Delete</button>
    </div>

    <!-- Modals -->
    <ProjectModal
      :is-open="projectModal.state.isOpen"
      :mode="projectModal.state.mode"
      :project="projectModal.state.data"
      @close="projectModal.close()"
      @success="handleProjectSuccess"
    />

    <ConfirmDialog
      :is-open="deleteModal.state.isOpen"
      title="Delete Project"
      message="Are you sure you want to delete this project?"
      type="danger"
      :loading="deleting"
      @confirm="handleDelete"
      @cancel="deleteModal.close()"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useModal } from '@/composables/useModal'
import ProjectModal from '@/components/modals/ProjectModal.vue'
import ConfirmDialog from '@/components/modals/ConfirmDialog.vue'
import type { Project } from '@/types'

const projectModal = useModal<Project>()
const deleteModal = useModal<Project>()
const deleting = ref(false)

function handleProjectSuccess(project: Project) {
  // Refresh list or show notification
  console.log('Project saved:', project)
}

async function handleDelete() {
  if (!deleteModal.state.data) return

  deleting.value = true
  try {
    // Delete project
    await deleteProject(deleteModal.state.data.id)
    deleteModal.close()
  } finally {
    deleting.value = false
  }
}
</script>
```

## Styling Guidelines

All modals follow consistent design principles:

### Colors
- Primary: Blue (#4F46E5)
- Success: Green (#10B981)
- Warning: Amber (#F59E0B)
- Danger: Red (#EF4444)
- Secondary: Gray (#6B7280)

### Spacing
- Modal padding: 1.5rem (24px)
- Form field gap: 1rem (16px)
- Button gap: 0.75rem (12px)

### Typography
- Title: text-xl font-bold
- Labels: text-sm font-medium
- Input text: text-base

### Animations
- Modal entrance: 300ms ease-out
- Modal exit: 200ms ease-in
- Scale: 0.95 to 1.0
- Opacity: 0 to 1

## Accessibility Features

All modals include:
- ARIA labels and roles
- Keyboard navigation (Tab, Shift+Tab, ESC)
- Focus management (trapped within modal)
- Screen reader support
- High contrast mode support
- Proper heading hierarchy

## Form Validation

Forms include:
- Required field indicators (*)
- Real-time validation feedback
- Error messages below fields
- Submit button disabled during loading
- Clear error states with red borders

## Best Practices

1. **Always use the composable** for state management
2. **Handle loading states** to prevent double submissions
3. **Provide success feedback** after operations
4. **Reset forms** when modals close
5. **Validate before submit** to provide immediate feedback
6. **Use appropriate sizes** (sm for confirmations, lg for complex forms)
7. **Keep forms focused** - one purpose per modal
8. **Test keyboard navigation** for accessibility
9. **Handle errors gracefully** with user-friendly messages
10. **Maintain consistency** across all modals

## Future Enhancements

- Toast notifications for success/error feedback
- Multi-step forms with wizard navigation
- Drag-and-drop file uploads
- Rich text editor support
- Date/time picker components
- Advanced search and filtering
- Batch operations support
- Export/import functionality
