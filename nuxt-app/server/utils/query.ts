export async function getSearchQuery(event: any) {
  const queries = await getQuery(event);
  const orList: object[] = [];
  Object.keys(queries).forEach((key) => {
    if (key.charAt(0) === "!") {
      queries[key.slice(1)] = { $ne: queries[key]?.toString() };
      delete queries[key];
    } else if (queries[key] == "false") {
      delete queries[key];
      orList.push({ [key]: { $exists: false } });
      orList.push({ [key]: { $eq: null } });
    }
  });
  if (orList.length > 0) {
    return { $or: orList.map((e) => ({ ...queries, ...e })) };
  }
  return queries;
}
