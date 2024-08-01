<template>
  <div class="task-details">
    <div class="title-bar">
      <h2 class="mb-4">Create Task</h2>
    </div>
    <form @submit.prevent="submitForm">
      <div class="flex flex-column gap-2">
        <label style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold;" for="title">Title </label>
        <InputText style="margin-bottom: 10px;" class="form-control" id="title" type="text" v-model="title" required />
      </div>
      <div class="flex flex-column gap-2">
        <label style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold;" for="description">Description</label>
        <Textarea style="margin-bottom: 10px;" id="description" v-model="description" autoResize rows="5" cols="30" required/>
      </div>
      <div class="flex flex-column gap-2">
        <label style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold;" for="priority">Priority</label>
        <Dropdown style="margin-bottom: 10px;" :options="priorityOptions" optionLabel="label" placeholder="Select the Priority" class="w-full md:w-14rem" id="priority" v-model="priority" required/>
      </div>
      <div class="flex flex-column gap-2">
        <label style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold;" for="start-date">Start Date</label>
        <Calendar style="margin-bottom: 10px;" id="start-date" v-model="startDate" showIcon required />
      </div>
      <div class="flex flex-column gap-2">
        <label style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold;" for="due-date">Due Date</label>
        <Calendar style="margin-bottom: 10px;" id="due-date" v-model="dueDate" showIcon required />
      </div>
      <div class="d-flex justify-content-end">
        <Button type="submit">Create Task</Button>
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
  data() {
    return {
      title: "",
      description: "",
      priority: "Low",
      startDate: "",
      dueDate: "",
      priorityOptions: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' }
      ],
    };
  },
  components: {
    InputText,
    Textarea,
    Dropdown,
    Calendar,
    Button
  },
  methods: {
    submitForm() {
      const newTask = {
        id: this.$root.getNextId(),
        title: this.title,
        description: this.description,
        priority: this.priority,
        startDate: this.startDate,
        dueDate: this.dueDate,
      };
      this.$emit("create-task", newTask);
      this.$router.push({ name: "tasks" });
    },
    
  },
};
</script>

<style>
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
</style>
