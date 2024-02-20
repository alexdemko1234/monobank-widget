<script setup>
  const props = defineProps(['failure'])
</script>

<template>
  <v-dialog
    v-model="props.failure"
    width="auto"
  >
    <v-card color="red">
      <v-card-text>На жаль, у нас не вийшло відпраавити Ваш відгук...</v-card-text>
        <v-card-actions>
          <v-spacer />

          <v-btn
            color="red-darken-4"
            variant="text"
            @click="$emit('failureClose', false)"
          >
          Закрити
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>