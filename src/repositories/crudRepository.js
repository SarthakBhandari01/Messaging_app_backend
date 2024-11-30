export default function crudRepository(model) {
  return {
    create: async function (data) {
      const newDoc = await model.create(data);
      return newDoc;
    },
    getAll: async function () {
      const allDoc = await model.find();
      return allDoc;
    },
    getById: async function (id) {
      const newDoc = await model.findById(id);
      return newDoc;
    },
    delete: async function (id) {
      const response = await model.findByIdAndDelete(id);
      return response;
    },
    update: async function (id, data) {
      const updatedDoc = await model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return updatedDoc;
    },
  };
}
