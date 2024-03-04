import Task from "~/server/models/task";
import { getSearchQuery } from "~/server/utils/query";

export default defineEventHandler(async (event) => {
  const queries = await getSearchQuery(event);
  return await Task.find(queries);
});
