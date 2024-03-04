import Task from "~/server/models/task";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const task = new Task(body);
  await task.save();
  return task;
});
