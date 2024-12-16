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
      const doc = await model.findById(id);
      return doc;
    },
    delete: async function (id) {
      const response = await model.findByIdAndDelete(id);
      return response;
    },
    deleteMany: async function (modelIds) {
      const response = await model.deleteMany({
        _id: {
          $in: modelIds,
        },
      });
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
