export const refreshOnEvent = (refresh: Function, event: String = "tasks") => {
  useNuxtApp().$event.on(event, refresh);
};

export const useEmit = (event: String = "tasks") => {
  useNuxtApp().$event.emit(event);
};
