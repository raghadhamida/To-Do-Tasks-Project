<template>
  <div class="card">
      <DataView :value="tasks" :layout="layoutComputed">
          <template #header>
            <h2 class="container-class">Task List</h2>
              <div class="flex justify-content-end">
                  <DataViewLayoutOptions v-model="layout" />
              </div>
          </template>

          <template #list="slotProps">
              <div class="col-12">
                  <div class="surface-300 text-white font-bold border-round flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                      <div class=" flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                          <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                              <div class="text-2xl font-bold text-900">
                                <router-link
                                  :to="{ name: 'task', params: { id: slotProps.data.id }, props: { task: slotProps.data } }"
                                  class="text-decoration-none text-primary"
                                >
                                  {{ slotProps.data.title }}
                                </router-link>
                              </div>
                              <div class="text-2xl font-semibold text-900">{{ slotProps.data.description }}</div>
                              <div class="flex align-items-center gap-3">
                                  <Tag :value="slotProps.data.priority.value" :severity="getSeverity(slotProps.data)"></Tag>
                              </div>
                          </div>
                          <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <Button icon="pi pi-trash" rounded @click="deleteTask(slotProps.data.id)"></Button>
                          </div>
                      </div>
                  </div>
              </div>
          </template>

          <template #grid="slotProps">
              <div class="surface-500 text-white font-bold border-round col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                  <div class="p-4 border-1 surface-border surface-card border-round">
                      <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                          <Tag :value="slotProps.data.priority.value" :severity="getSeverity(slotProps.data)"></Tag>
                      </div>
                      <div class="flex flex-column align-items-center gap-3 py-5">
                          <div class="text-2xl font-bold">
                            <router-link
                              :to="{ name: 'task', params: { id: slotProps.data.id }, props: { task: slotProps.data } }"
                              class="text-decoration-none text-primary"
                            >
                              {{ slotProps.data.title }}
                            </router-link>
                          </div>
                          <div class="text-2xl font-semibold text-900">{{ slotProps.data.description }}</div>
                      </div>
                      <div class="flex align-items-center justify-content-between">
                          <Button icon="pi pi-trash" rounded @click="deleteTask(slotProps.data.id)"></Button>
                      </div>
                  </div>
              </div>
          </template>
      </DataView>
      <router-view></router-view>
      <Button class="mr-4" @click.prevent="createTask">Create Task</Button>
      <router-link class="p-button p-component custom-button" :to="{ name: 'gantt-chart' }">View Gantt Chart</router-link>
  </div>
</template>

  
  <script>
  import 'primeflex/primeflex.css';
  import DataView from 'primevue/dataview';
  import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'   // optional
  import { ref, onMounted } from "vue";
  import Tag from 'primevue/tag';
  import Button from 'primevue/button';
  import { computed } from '@vue/reactivity';


  const layout = ref('grid');

  export default {
    name: "Tasks",
    setup() {
      const layout = ref('grid');
      const layoutComputed = computed(() => layout.value);

      // Other component code

      return {
        layout,
        layoutComputed,
        // Other variables and methods
      };
    },
    components: {
      DataView,
      DataViewLayoutOptions,
      Tag,
      Button
    },
    props: {
      tasks: {
        type: Array,
        required: true,
      },
    },
    inject: ['$tasks'],
    created() {
      this.tasks = this.$tasks.getAllTasks();
    },
    data() {
      return {
        tasks: []
      };
    },
    methods: {
      createTask() {
        this.$router.push({ name: "create-task" });
      },
      deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.$tasks.deleteTask(id);
      },
      getSeverity(product){
          switch (product.priority.value) {
              case 'Low':
                  return 'success';

              case 'low':
                  return 'success';

              case 'medium':
                  return 'warning';

              case 'Medium':
                  return 'warning';

              case 'high':
                  return 'danger';

              case 'High':
                  return 'danger';

              default:
                  return null;
          }
      }
    }
  };
  </script>


<style>
  .custom-button {
    /* Add your custom styles for the link */
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #c55d66;
    color: #ffffff;
    border: none;
    border-radius: 0.25rem;
    font-size: 1rem;
    text-decoration: none;
    cursor: pointer;
  }
  
</style>