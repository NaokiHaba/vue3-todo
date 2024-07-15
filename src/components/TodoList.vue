<script setup lang="ts">
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useTodoStore } from '@/stores/Todo'
import TodoItem from './TodoItem.vue'

const todoStore = useTodoStore()

const schema = yup.object({
  newTodo: yup.string().required('Todo item is required')
})

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: schema
})

const { value: newTodo } = useField<string>('newTodo')

const onSubmit = handleSubmit((values) => {
  todoStore.add(values.newTodo)
  resetForm({
    values: {
      newTodo: ''
    }
  })
})

const todos = ref(todoStore.todos)
</script>

<template>
  <v-container>
    <h1 class="text-h4 mb-4">TODO App</h1>
    <v-form @submit.prevent="onSubmit">
      <v-text-field
        v-model="newTodo"
        label="New Todo"
        :error-messages="errors.newTodo"
      />
      <v-btn
        type="submit"
        color="primary"
        class="mt-2"
        :disabled="!newTodo"
      >
        Add Todo
      </v-btn>
    </v-form>
    <v-list class="mt-4">
      <todo-item
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
      />
    </v-list>
  </v-container>
</template>