<script setup>
import { onMounted, ref } from 'vue'
import { useTodoStore } from '@/stores/todo.js'
import { RouterLink } from 'vue-router';

const todoStore = useTodoStore()
const todoText = ref('')
const isLoading = ref(false)

onMounted(async () => {
    isLoading.value = true
    await todoStore.loadTodos()
    isLoading.value = false
})

const addTodo = async (text) => {
    isLoading.value = true
    try {
        await todoStore.addTodo(text)
        // await todoStore.loadTodos()
        text = ''
        isLoading.value = false
    } catch (error) {
        console.log('error',error)
    }
}

const editStatus = async (todoData, todoId) => {
    isLoading.value = true
    try {
        const updateData = {
            name: todoData.name,
            status: todoData.status
        }
        await todoStore.editTodo(updateData, todoId)
        isLoading.value = false
    } catch (error) {
        console.log('error',error)
    }
}

const deleteTodo = async (todoId) => {
    isLoading.value = true
    try {
        await todoStore.removeTodo(todoId)
        await todoStore.loadTodos()
        isLoading.value = false
    } catch (error) {
        console.log('error',error)
    }
}
</script>

<template>
    <div>
        <div>
            <input type="text" v-model="todoText">
            <button @click="addTodo(todoText)">Add</button>
        </div>
        <div>
            <span v-if="isLoading">Loading...</span>
        </div>
        <ul>
            <li v-for="todo in todoStore.list">
                {{ todo.name }}

                <select v-model="todo.status" @change="editStatus(todo,todo.id)">
                    <option value="">Select status</option>
                    <option 
                        v-for="status in todoStore.statuses" 
                        :value="status">
                        {{ status }}
                    </option>
                </select>

                <RouterLink :to="{name: 'edit-todo', params: {id: todo.id}}">
                    <button>Edit</button>
                </RouterLink>
                <button @click="deleteTodo(todo.id)">Delete</button>
            </li>
        </ul>
    </div>
</template>