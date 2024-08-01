<template>
  <div style="height:80vh">
    <Menubar :model="items">
      <template #start>
        <img alt="logo" src="https://w7.pngwing.com/pngs/209/1016/png-transparent-computer-icons-task-id-miscellaneous-computer-logo-thumbnail.png" height="40" class="mr-2" />
      </template>
    </Menubar>
    <router-view :tasks="tasks" @create-task="createTask" @update-task="updateTask" @delete-task="deleteTask" />
    <div class="container">
      <gantt class="left-container" :tasks="tasks"></gantt>
    </div>
  </div>
</template>

<script>
import Tasks from "./components/Tasks.vue";
import Task from "./components/Task.vue";
import CreateTask from "./components/CreateTask.vue";
import EditTask from "./components/EditTask.vue";
import GanttChart from "./components/GanttChart.vue";
import Menubar from 'primevue/menubar';
import 'primeicons/primeicons.css';
import Button from 'primevue/button';
import 'primeflex/primeflex.css';
//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primevue/resources/primevue.min.css";


export default {
  name: "App",
  components: {
    Menubar,
    Tasks,
    Task,
    CreateTask,
    EditTask,
    GanttChart
  },
  inject: ['$tasks'],
  created() {
    this.tasks = this.$tasks.getAllTasks();
  },
  data() {
    return {
      tasks: [],
      nextId: 1,
      showNavigation: false,
      items: [
        {
          label: 'To-Do List',
          icon: 'pi pi-list', // PrimeVue icon class
          to: '/',
          class: 'custom-menu-item' // Optional custom CSS class
        },
        {
          label: 'Home',
          icon: 'pi pi-home', // PrimeVue icon class
          to: '/',
          class: 'custom-menu-item' // Optional custom CSS class
        }
      ]
    };
  },
  methods: {
    // navigateTo(to) {
    //   this.$router.push(to);
    // },
    createTask(newTask) {
      newTask.id = this.getNextId();
      //this.tasks.push(newTask);
      this.$tasks.addTask(newTask);
    },
    getNextId() {
      let maxId = 0;
      this.tasks.forEach((task) => {
        const taskId = parseInt(task.id);
        if (taskId > maxId) {
          maxId = taskId;
        }
      });
      return JSON.stringify(maxId + 1);
    },
    updateTask(updatedTask) {
      const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
      this.tasks.splice(index, 1, updatedTask);
    },
    deleteTask(id) {
      const index = this.tasks.findIndex((task) => task.id === id);
      this.tasks.splice(index, 1);
    },
    toggleNavigation() {
      this.showNavigation = !this.showNavigation;
    }
  },
};
</script>

<style>
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .container {
    height: 100%;
    width: 100%;
  }
  .left-container {
    overflow: hidden;
    position: relative;
    height: 100%;
  }

</style>
