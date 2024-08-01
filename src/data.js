const tasksKey = 'tasks';

let tasksJson = localStorage.getItem(tasksKey) ? JSON.parse(localStorage.getItem(tasksKey)) : [];
let tasksStore = tasksJson;

export default {
    getAllTasks() {
        return tasksStore;
    },

    getSingleTask(id) {
        return tasksStore.find(task => task.id === id);
    },

    deleteTask(id) {
        tasksStore = tasksStore.filter(task => task.id !== id);
        localStorage.setItem(tasksKey, JSON.stringify(tasksStore));
    },

    editTask(id, task) {
        //tasksStore = tasksStore.map(task => {})
        const index = tasksStore.findIndex((task) => task.id === id);
        tasksStore.splice(index, 1, task);

        localStorage.setItem(tasksKey, JSON.stringify(tasksStore));
    },

    addTask(newTask) {
        tasksStore.push(newTask);
        localStorage.setItem(tasksKey, JSON.stringify(tasksStore));
    }

}