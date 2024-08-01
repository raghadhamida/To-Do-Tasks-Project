<template>
  <div class="task-details">
    <div class="title-bar">
      <h2 class="mb-4">Edit Task</h2>
    </div>
    <form @submit.prevent="updateTask">
      <div class="flex flex-column gap-2">
        <label style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold;" for="title">Title</label>
        <InputText style="margin-bottom: 10px;" type="text" id="title" v-model="editedTask.title" />
      </div>
      <div class="flex flex-column gap-2">
        <label style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold;" for="description">Description</label>
        <Textarea style="margin-bottom: 10px;" id="description" v-model="editedTask.description" autoResize rows="5" cols="30"/>
      </div>
      <div class="flex flex-column gap-2">
        <label style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold;" for="priority">Priority</label>
        <Dropdown style="margin-bottom: 10px;" v-model="editedTask.priority" :options="priorityOptions" optionLabel="label" placeholder="Select the Priority" class="w-full md:w-14rem" id="priority" required/>
          
      </div>
      <div class="flex flex-column gap-2">
        <label style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold;" for="startDate">Start Date</label>
        <Calendar style="margin-bottom: 10px;" id="startDate" v-model="editedTask.startDate" showIcon  />
      </div>
      <div class="flex flex-column gap-2">
        <label style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold;" for="dueDate">Due Date</label>
        <Calendar style="margin-bottom: 10px;" id="dueDate" v-model="editedTask.dueDate" showIcon />
      </div>
      <div class="d-flex justify-content-end">
        <Button class="update-button mr-2" type="submit">Update Task</Button>
        <Button type="button" @click="cancelEdit">Cancel</Button>
      </div>
    </form>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import 'primeflex/primeflex.css';

export default {
  name: "EditTask",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  inject: ['$tasks'],
  components: {
    InputText,
    Textarea,
    Dropdown,
    Calendar,
    Button
  },
  data() {
    return {
      priorityOptions: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' }
      ],
      editedTask: {
        title: '',
        description: '',
        priority: '',
        startDate: '',
        dueDate: '',
      },
    };
  },
  mounted() {
    this.loadTask();
  },
  methods: {
    loadTask() {
      const taskId = this.$route.params.id;
      this.editedTask = Object.assign({}, this.$tasks.getSingleTask(taskId));
    },
    updateTask() {
      this.$emit("update-task", this.editedTask);
      this.$tasks.editTask(this.editedTask.id, this.editedTask);
      this.$router.push({ name: "task", params: { id: this.editedTask.id } });
    },
    cancelEdit() {
      this.$router.push({ name: "task", params: { id: this.editedTask.id } });
    },
  },
};
</script>

<style scoped>
.task-details {
  margin-bottom: 20px;
}

.title-bar {
  background-color: #524f7a;
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #070707;
}

.title-bar h2 {
  color: #f5efef;
  font-weight: bold;
  font-size: 1.5rem;
  margin: 0;
  font-size: 2rem;
  font-family: "Arial", sans-serif;
}

.update-button {
  margin-right: 10px;
}
</style>
