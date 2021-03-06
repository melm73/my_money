
const categoryTransformer = {
  transformToApi(category) {
    const apiCategory = {
      name: category.name,
      category_type_id: category.categoryTypeId,
    };

    if (category.id) {
      apiCategory.id = category.id;
    }
    return apiCategory;
  },

  transformFromApi(category) {
    return {
      id: category.id,
      name: category.name,
      categoryTypeId: category.category_type_id,
    };
  },
};

export default categoryTransformer;
