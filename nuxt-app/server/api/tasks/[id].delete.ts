import Task from "~/server/models/task";

export default defineEventHandler(async (event) => {
  const id = await getRouterParam(event, "id");
  const task = await Task.findById(id);
  await Task.updateMany({ parent: id }, { parent: task?.parent });
  await Task.deleteOne({ _id: id });
  return "ok";
});
