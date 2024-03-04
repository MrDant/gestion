import Task from "~/server/models/task";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = await getRouterParam(event, "id");
  return await Task.findByIdAndUpdate(id, body);
});
