export const itemList = state => {
    return state.items;
};

export const isProcessing = state => {
    return state.processingTasks.length >= 1;
};
