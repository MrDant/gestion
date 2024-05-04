import Model from "~/server/models/setting";

export default defineEventHandler(async (event) => {
  let setting = await Model.findOne();
  if (!setting) {
    setting = new Model();
    await setting.save();
  }
  return setting;
});
