import Model from "~/server/models/setting";

export default defineEventHandler(async (event) => {
  let setting = await Model.findOne();
  if (!setting) {
    setting = new Model();
  }
  Object.assign(setting, await readBody(event));
  await setting.save();
  return "ok";
});
