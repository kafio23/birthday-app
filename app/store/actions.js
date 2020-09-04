import * as types from "./mutationTypes";
import AdoService from "@/services/adoService";

const adoService = new AdoService();

export const loadItems = (
  { commit },
  params
) => {
  const task = "action loadItems";
  console.log(task);
    return new Promise((resolve, reject) => {
      commit(types.ADD_PROCESSING_TASK, task);
      adoService
        .load({ searchText: params.searchText, byType: params.byType })
        .then(items => {
          commit(types.SET_ITEMS, items);
          commit(types.REMOVE_PROCESSING_TASK, task);
          resolve();
        })
        .catch(error => {
          console.error(`Error loading items from the backend: ${error}.`);
          commit(types.REMOVE_PROCESSING_TASK, task);
          reject(error);
        });
    });
};

