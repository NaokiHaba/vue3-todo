import { defineStore } from 'pinia'

type Todo = {
  id: number;
  text: string;
  done: boolean;
}

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[]
  }),
  getters: {
    doneTodos(): Todo[] {
      return this.todos.filter((todo) => todo.done)
    },
    pendingTodos(): Todo[] {
      return this.todos.filter((todo) => !todo.done)
    }
  },
  actions: {
    add(text: string) {
      this.todos.push({
        id: Date.now(),
        text,
        done: false
      })
    },
    toggle(id: number) {
      const todo = this.todos.find((todo) => todo.id === id)
      if (todo) {
        todo.done = !todo.done
      }
    },
  }
})