import * as types from "./mutationTypes";

const mutations = {
    [types.SET_ITEMS](state, items) {
      console.log("SET_ITEMS", items);
      state.items = items;
    },
  
    [types.ADD_PROCESSING_TASK](state, task) {
      console.log("ADD_PROCESSING_TASK", task);
      state.processingTasks.push(task);
    },
  
    [types.REMOVE_PROCESSING_TASK](state, task) {
      console.log("REMOVE_PROCESSING_TASK", task);
      state.processingTasks.splice(state.processingTasks.indexOf(task), 1);
    }
  };
  
  export default mutations;