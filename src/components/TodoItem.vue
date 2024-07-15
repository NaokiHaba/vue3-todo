<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '@/stores/Todo'

const todoStore = useTodoStore()

const props = defineProps<{
  todo: { id: number; text: string; done: boolean }
}>()

const { toggle, remove } = todoStore
const isCompleted = ref(props.todo.done)

const toggleCompleted = () => {
  isCompleted.value = !isCompleted.value
  toggle(props.todo.id)
}

const deleteTodo = () => {
  remove(props.todo.id)
}

const date = new Date(props.todo.id).toLocaleString()
</script>

<template>
  <v-list-item
    v-if="!props.todo.done"
    :class="{ 'text-decoration-line-through': props.todo.done }"
    :ripple="true"
  >
    <v-list-item-title
      :class="{ 'text-grey': props.todo.done }"
    >
      {{ props.todo.text }}
    </v-list-item-title>

    <v-list-item-subtitle>{{ date }}</v-list-item-subtitle>

    <template v-slot:append>
      <v-btn
        size="small"
        @click="toggleCompleted"
        color="success"
      >
        <v-icon>mdi-check</v-icon>
      </v-btn>
    </template>

  </v-list-item>
</template>