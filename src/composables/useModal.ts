import { ref } from 'vue'

export interface ModalState<T = any> {
  isOpen: boolean
  mode: 'create' | 'edit' | 'view' | 'delete'
  data: T | null
}

export function useModal<T = any>() {
  const state = ref<ModalState<T>>({
    isOpen: false,
    mode: 'create',
    data: null
  })

  function open(mode: ModalState<T>['mode'] = 'create', data: T | null = null) {
    state.value = {
      isOpen: true,
      mode,
      data
    }
  }

  function close() {
    state.value = {
      ...state.value,
      isOpen: false
    }

    setTimeout(() => {
      state.value.data = null
    }, 300)
  }

  function openCreate() {
    open('create', null)
  }

  function openEdit(data: T) {
    open('edit', data)
  }

  function openView(data: T) {
    open('view', data)
  }

  function openDelete(data: T) {
    open('delete', data)
  }

  return {
    state,
    open,
    close,
    openCreate,
    openEdit,
    openView,
    openDelete
  }
}
