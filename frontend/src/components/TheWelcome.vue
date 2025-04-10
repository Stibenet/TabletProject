<script setup>
import draggable from 'vuedraggable'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const tasks = ref([])
const showModal = ref(false)
const newTask = ref({
  title: '',
  description: '',
  completed: false
})

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/tasks')
    tasks.value = response.data
    sortTasks() // Сортируем задачи после загрузки
  } catch (error) {
    console.error('Error fetching tasks:', error)
  }
})

// Функция для сортировки задач
const sortTasks = () => {
  tasks.value.sort((a, b) => a.completed - b.completed)
}

// Открытие модального окна
const openModal = () => {
  showModal.value = true
}

// Закрытие модального окна
const closeModal = () => {
  showModal.value = false
}

// Функция для добавления новой задачи
const addTask = () => {
  // Можно отправить данные на сервер, если требуется.
  axios.post('http://localhost:8080/api/tasks', newTask.value)
  tasks.value.push({ ...newTask.value, id: Date.now() }) // Добавляем задачу локально
  closeModal() // Закрыть модальное окно
  newTask.value = { title: '', description: '', completed: false } // Сбросить форму
}
</script>

<style scoped>
/* Кнопка с иконкой "+" */
button {
  position: fixed;
  bottom: 16px;
  right: 16px;
  width: 56px;
  height: 56px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Модальное окно */
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>

<template>
  <div class="task-list" v-if="tasks && tasks.length > 0">
    <draggable v-model="tasks" item-key="id" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <template v-slot:item="{ element }">
        <div :class="[
            'rounded-xl p-4 shadow-md',
            element.completed ? 'bg-yellow-100 line-through' : 'bg-yellow-200'
          ]">
          <h3 class="text-lg font-bold">{{ element.title }}</h3>
          <p class="text-gray-700">{{ element.description }}</p>
          <p v-if="element.completed" class="text-green-600">Completed</p>
          <p v-else class="text-red-600">Not Completed</p>
        </div>
      </template>
    </draggable>
  </div>

  <!-- Модальное окно для добавления задачи -->
  <div v-if="showModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h2 class="text-xl font-semibold mb-4">Add New Task</h2>
      <form @submit.prevent="addTask">
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" id="title" v-model="newTask.title" class="w-full p-2 border border-gray-300 rounded-md" required />
        </div>
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" v-model="newTask.description" class="w-full p-2 border border-gray-300 rounded-md" required></textarea>
        </div>
        <div class="flex justify-end">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Add Task</button>
        </div>
      </form>
      <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 text-2xl font-bold">×</button>
    </div>
  </div>

  <!-- Кнопка для открытия модального окна -->
  <button @click="openModal" class="fixed bottom-8 right-8 bg-blue-500 text-white rounded-full p-4 shadow-lg z-50">
    <span class="text-xl">+</span>
  </button>
</template>
