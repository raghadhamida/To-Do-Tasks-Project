<template>
    <div style="height: 100%;" ref="gantt"></div> 
</template> 
 <script>
  import { gantt } from 'dhtmlx-gantt';
  
  export default {
    name: 'gantt',
    props: {
      tasks: {
        type: Object,
        required: true,
      }
    },
    // inject: ['$tasks'],
    // created() {
    //     this.tasks = this.$tasks.getAllTasks();
    // },

  
    mounted: function () {
      gantt.config.date_format = "%Y-%m-%d";
  
      gantt.init(this.$refs.gantt);
      console.log(this.tasks);
      const formattedTasks = this.formatTasks(this.tasks);
      console.log(formattedTasks);
      gantt.parse(formattedTasks);

      // // Add the event listener here
      // const element = document.querySelector('.gantt_grid_head_add');
      // element.addEventListener('click', handleClick);

      // // Define the click event handler
      // function handleClick() {
      //         // Handle the click event here
      //   // const newTask = {
      //   //   //id: this.$root.getNextId(),
      //   //   title: this.title,
      //   //   description: this.description,
      //   //   priority: this.priority,
      //   //   startDate: this.startDate,
      //   //   dueDate: this.dueDate,
      //   // };
      //   // this.$emit("create-task", newTask);
      //   //this.$router.push({ name: "create-task" });
      //   window.open('/create-task', '_blank', 'width=800,height=600');
      //   //console.log('Element clicked!');
      // }

      // Override the gantt.showLightbox function
      gantt.showLightbox = function () {
        // Add your custom logic here to open the pop-up window
        window.open('/#/create-task?popup=true', '_blank', 'width=800,height=600');
        
        
      };



      // // Find the "add task" button element
      const addTaskButton = document.querySelector('.gantt_grid_head_add');

      // // Remove the default click event handler
      addTaskButton.removeEventListener('click', gantt.createTask, true);

      // // Add your own event listener to open the custom pop-up window
      // addTaskButton.addEventListener('click', openPopupWindow);

      // // Define the function to open the custom pop-up window
      // function openPopupWindow() {
      //   window.open('/create-task', '_blank', 'width=800,height=600');
      // }
  
      //this.$_initDataProcessor();
    },
    methods: {
        // $_initDataProcessor() {
        // // Initialize data processor logic
        // },
        formatTasks(tasks) {
            const formattedTasks = {
                data: [],
                links: [],
            }; 

            tasks.forEach(task => {
                formattedTasks.data.push({
                    id: task.id,
                    text: task.title,
                    start_date: task.startDate,
                    end_date: task.dueDate,
                    progress: task.progress,
                });
            });

            return JSON.stringify(formattedTasks);
        },
    },
  }
  //@import "./node_modules/dhtmlx-gantt/codebase/dhtmlxgantt.css"
  </script>
  
  
  <style>
      @import "../assets/dhtmlxgantt.css";
  </style>