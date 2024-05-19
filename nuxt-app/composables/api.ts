export const saveTask = async function (task: any) {
  return $fetch("/api/tasks/" + task._id, {
    method: "put",
    body: task,
  });
};
