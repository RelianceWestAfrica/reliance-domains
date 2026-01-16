<template>
  <div>
    <a-upload-dragger
        v-model:fileList="fileList"
        name="file"
        :multiple="true"
        action="http://localhost:3000/upload"
        @change="handleChange"
        @drop="handleDrop"
    >
      <p class="ant-upload-drag-icon">
        <inbox-outlined></inbox-outlined>
      </p>
      <p class="ant-upload-text">Click or drag file to this area to upload</p>
      <p class="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files
      </p>
    </a-upload-dragger>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { InboxOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import type { UploadChangeParam } from 'ant-design-vue';

// Événement émis
const emit = defineEmits<{
  (e: 'uploaded', url: string): void
}>();

const fileList = ref([]);

const handleChange = (info: UploadChangeParam) => {
  const { status, response } = info.file;

  if (status === 'done') {
    message.success(`${info.file.name} uploadé avec succès`);

    // 🔴 POINT CLÉ : response vient du backend
    if (response?.url) {
      emit('uploaded', response.url);
    } else {
      console.warn('Aucune URL retournée par le backend');
    }
  }

  if (status === 'error') {
    message.error(`${info.file.name} échec de l’upload`);
  }
};

function handleDrop(e: DragEvent) {
  console.log(e);
}
</script>

