import { createRouter, createWebHashHistory } from "vue-router";
import Tasks from "./components/Tasks.vue";
import Task from "./components/Task.vue";
import CreateTask from "./components/CreateTask.vue";
import EditTask from "./components/EditTask.vue";
import GanttChart from "./components/GanttChart.vue";

const router = createRouter({
  history: createWebHashHistory(),
  mode: "history",
  routes: [
    {
      path: "/",
      component: Tasks,
      name: "tasks",
    },
    {
      path: "/gantt-chart",
      component: GanttChart,
      name: "gantt-chart",
    },
    {
      path: "/task/:id", // Update the route path
      component: Task,
      name: "task",
      props: true,
    },
    {
      path: "/create-task",
      component: CreateTask,
      name: "create-task",
    },
    {
      path: "/edit-task/:id",
      component: EditTask,
      name: "edit-task",
      props: true,
    },
  ],
});

export default router;
