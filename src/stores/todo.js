import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'https://669612bf0312447373c0f0d2.mockapi.io'


export const useTodoStore = defineStore('todo', {
  state: () => ({
    list: [],
    selectedTodo: {},
    statuses: ['Pending', 'Doing', 'Done']
  }),
  actions: {
    async loadTodos () {
      try {
        const response = await axios.get(`${BASE_URL}/todos`)
        this.list = response.data
        console.log('load todos complete')
      } catch (error) {
        console.log('error',error)
      }
    },
    async loadTodo (id) {
      try {
        const response = await axios.get(`${BASE_URL}/todos/${id}`)
        this.selectedTodo = response.data
        console.log('load todo by id complete')
      } catch (error) {
        console.log('error',error)
      }
    },
    async addTodo (todoText) {
      const bodyData = {
        name: todoText,
        status: 'Pending'
      }
      try {
        const response = await axios.post(`${BASE_URL}/todos`, bodyData)
        this.list.push(response.data) //เพิ่มไปใน list เลย ไม่ต้องโหลดใหม่
        console.log('add todo complete')
      } catch (error) {
        console.log('error',error)
      }
    },
    async editTodo (todoData, id) {
      try {
        const response = await axios.put(`${BASE_URL}/todos/${id}`, todoData)
        console.log('edit todo complete')
      } catch (error) {
        console.log('error',error)
      }
    },
    async removeTodo (id) {
      try {
        const response = await axios.delete(`${BASE_URL}/todos/${id}`)
        console.log('delete todo complete')
      } catch (error) {
        console.log('error',error)
      }
    },
  }
})
