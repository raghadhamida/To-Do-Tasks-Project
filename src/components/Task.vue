<template>
  <div class="task-details-container">
    <div class="task-details">
      <Card >
        <template #title>{{ task.title }}</template>
      </Card>
      <p class="text-2xl text-900"><strong>Description:</strong>{{ task.description }}</p>
      <div class="task-details-meta">
        <p class="text-2xl text-900"><strong>Priority:</strong> {{ task.priority.value }}</p>
        <p class="text-2xl text-900"><strong>Start Date:</strong> {{ formatDate(task.startDate) }}</p>
        <p class="text-2xl text-900"><strong>Due Date:</strong> {{ formatDate(task.dueDate) }}</p>
      </div>
      <div class="task-details-actions">
        <Button class="p-button-success" @click="editTask">Edit Task</Button>
        <Button class="p-button-danger" @click="deleteTask">Delete Task</Button>
      </div>
    </div>
  </div>  
</template>
  
<script>
import Button from 'primevue/button';
import Card from 'primevue/card';
import 'primeflex/primeflex.css';

export default {
name: "Task",
props: {
    task: {
    type: Object,
    required: true,
    },
},
inject: ['$tasks'],
created() {
      this.task = this.$tasks.getSingleTask(this.$route.params.id);
},
components: {
    Button,
    Card
},
data() {
    return {
      task: {},
    };
},
methods: {
    editTask() {
      this.$router.push({ name: "edit-task", params: { id: this.task.id } });
    },
    deleteTask() {
    if (confirm("Are you sure you want to delete this task?")) {
        this.$emit("delete-task", this.task.id);
        this.$tasks.deleteTask(this.task.id);
        this.$router.push({ name: "tasks" });
    }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    }
},
};
</script>

<style scoped>
.task-details-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("https://img.rawpixel.com/private/static/images/website/2022-05/pf-s113-ak-5123-ss-02.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=28a739666716d11a0c3d5b3e1d3c3d09");
  background-size: cover;
  background-repeat: no-repeat;
}

.task-details {
  text-align: center;
  margin-bottom: 20px;
}

.task-details h2 {
  margin-bottom: 10px;
}

.task-details p {
  color: #8c7d7d;
  margin-bottom: 5px;
}

.task-details-actions button {
  margin-right: 10px;
}
</style>