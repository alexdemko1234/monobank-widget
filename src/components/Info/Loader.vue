<script setup>
  const props = defineProps(['loader'])
</script>

<template>
  <v-dialog
    v-model="props.loader"
    width="auto"
  >
    <v-card color="primary">
      <v-card-text>Зачекайте :)</v-card-text>
      <v-progress-linear indeterminate color="white" class="mb-0" />
    </v-card>
  </v-dialog>
</template>