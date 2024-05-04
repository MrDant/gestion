export async function getSearchQuery(event: any) {
  const queries: any = await getQuery(event);
  const orList: object[] = [];
  Object.keys(queries).forEach((key) => {
    if (key.charAt(0) === "!") {
      queries[key.slice(1)] = { $ne: queries[key]?.toString() };
      delete queries[key];
    } else if (queries[key].charAt(0) === ">") {
      queries[key] = { $gt: queries[key]?.toString().slice(1) };
    } else if (queries[key].charAt(0) === "<") {
      queries[key] = { $lt: queries[key]?.toString().slice(1) };
    } else if (queries[key] == "false") {
      delete queries[key];
      orList.push({ [key]: { $exists: false } });
      orList.push({ [key]: { $eq: null } });
    } else if (queries[key] == "true") {
      queries[key] = { $exists: true };
    }
  });
  if (orList.length > 0) {
    return { $or: orList.map((e) => ({ ...queries, ...e })) };
  }
  return queries;
}
