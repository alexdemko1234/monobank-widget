<script setup>
    const props = defineProps(['success'])
</script>

<template>
  <v-dialog
    v-model="props.success"
    width="auto"
  >
  <v-card color="green">
    <v-card-text>Дякуємо Вам! Ваш відгук успішно був відправлений!</v-card-text>
      <v-card-actions>
        <v-spacer />

        <v-btn
          color="teal-darken-4"
          variant="text"
          @click="$emit('successClose', false)"
        >
          Закрити
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>