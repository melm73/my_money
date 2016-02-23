import categoryActions from '../category-actions';
import categoryTransformer from '../../transformers/category-transformer';
import subcategoryTransformer from '../../transformers/subcategory-transformer';
import apiUtil from '../../util/api-util';
import store from '../../stores/store';
import { fromJS } from 'immutable';

describe('CategoryActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(store, 'dispatch');
  });

  describe('getCategories', () => {
    //TODO: work out how to test promises
    xit('calls the api util to get category types, categories and subcategories', () => {

    });
  });

  describe('category type actions', () => {
    it('storeCategoryTypes dispatches the category type data to the store', () => {
      categoryActions.storeCategoryTypes('categoryTypes');
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_CATEGORY_TYPES',
        categoryTypes: 'categoryTypes'
      });
    });
  });

  describe('category actions', () => {
    describe('saveCategory', () => {
      it('calls createCategory when no id is present', () => {
        spyOn(categoryActions, 'createCategory');
        categoryActions.saveCategory({name: 'Melanie'});
        expect(categoryActions.createCategory).toHaveBeenCalledWith({name: 'Melanie'});
        expect(dispatcherSpy).toHaveBeenCalledWith({type: 'SAVE_CATEGORY'});
      });

      it('calls updateCategory when id is present', () => {
        spyOn(categoryActions, 'updateCategory');
        categoryActions.saveCategory({id: 1, name: 'Melanie'});
        expect(categoryActions.updateCategory).toHaveBeenCalledWith({id: 1, name: 'Melanie'});
        expect(dispatcherSpy).toHaveBeenCalledWith({type: 'SAVE_CATEGORY'});
      });
    });

    it('createCategory calls apiUtil.post with callback', () => {
      spyOn(apiUtil, 'post');
      spyOn(categoryTransformer, 'transformToApi').and.returnValue('transformedCategory');

      categoryActions.createCategory('category');

      expect(categoryTransformer.transformToApi).toHaveBeenCalledWith('category');
      expect(apiUtil.post).toHaveBeenCalled();

      let postArgs = apiUtil.post.calls.argsFor(0)[0];
      expect(postArgs.url).toEqual('http://localhost:3000/categories');

      spyOn(categoryTransformer, 'transformFromApi').and.returnValue('newCategory');
      spyOn(categoryActions, 'storeCategory');
      let successCallback = postArgs.onSuccess;
      successCallback({category: 'categoryFromApi'});

      expect(categoryTransformer.transformFromApi).toHaveBeenCalledWith('categoryFromApi');
      expect(categoryActions.storeCategory).toHaveBeenCalledWith('newCategory');
    });

    it('updateCategory calls apiUtil.put with callback', () => {
      let category = {id: 23, name: 'Cat'};
      spyOn(apiUtil, 'put');
      spyOn(categoryTransformer, 'transformToApi').and.returnValue('transformedCategory');

      categoryActions.updateCategory(category);

      expect(categoryTransformer.transformToApi).toHaveBeenCalledWith(category);
      expect(apiUtil.put).toHaveBeenCalled();

      let putArgs = apiUtil.put.calls.argsFor(0)[0];
      expect(putArgs.url).toEqual('http://localhost:3000/categories/23');
      expect(putArgs.body).toEqual({category: 'transformedCategory'});

      spyOn(categoryTransformer, 'transformFromApi').and.returnValue('updatedCategory');
      spyOn(categoryActions, 'storeCategory');
      let successCallback = putArgs.onSuccess;
      successCallback({category: 'categoryFromApi'});

      expect(categoryTransformer.transformFromApi).toHaveBeenCalledWith('categoryFromApi');
      expect(categoryActions.storeCategory).toHaveBeenCalledWith('updatedCategory');
    });

    it('deleteCategory calls apiUtil.destroy with callback', () => {
      spyOn(apiUtil, 'delete');
      categoryActions.deleteCategory(23);
      expect(apiUtil.delete).toHaveBeenCalled();
      expect(dispatcherSpy).toHaveBeenCalledWith({type: 'DELETE_CATEGORY'});

      let deleteArgs   = apiUtil.delete.calls.argsFor(0)[0];
      expect(deleteArgs.url).toEqual('http://localhost:3000/categories/23');

      spyOn(categoryActions, 'removeCategory');
      let successCallback = deleteArgs.onSuccess;
      successCallback();
      expect(categoryActions.removeCategory).toHaveBeenCalledWith(23);
    });

    it('storeCategories dispatches the categories to the store', () => {
      categoryActions.storeCategories(['categories']);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_CATEGORIES',
        categories: ['categories']
      });
    });

    it('storeCategory dispatches the category to the store', () => {
      categoryActions.storeCategory('category');
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_CATEGORY',
        category: 'category'
      });
    });

    it('removeCategory dispatches the category id to the store', () => {
      categoryActions.removeCategory(13);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'REMOVE_CATEGORY',
        categoryId: 13
      });
    });
  });

  describe('subcategory actions', () => {
    describe('saveSubcategory', () => {
      it('calls createSubcategory when no id is present', () => {
        spyOn(categoryActions, 'createSubcategory');
        categoryActions.saveSubcategory({name: 'Melanie'});
        expect(categoryActions.createSubcategory).toHaveBeenCalledWith({name: 'Melanie'});
        expect(dispatcherSpy).toHaveBeenCalledWith({type: 'SAVE_SUBCATEGORY'});
      });

      it('calls updateSubcategory when id is present', () => {
        spyOn(categoryActions, 'updateSubcategory');
        categoryActions.saveSubcategory({id: 1, name: 'Melanie'});
        expect(categoryActions.updateSubcategory).toHaveBeenCalledWith({id: 1, name: 'Melanie'});
        expect(dispatcherSpy).toHaveBeenCalledWith({type: 'SAVE_SUBCATEGORY'});
      });
    });

    it('createSubcategory calls apiUtil.post with callback', () => {
      spyOn(apiUtil, 'post');
      spyOn(subcategoryTransformer, 'transformToApi').and.returnValue('transformedSubcategory');

      categoryActions.createSubcategory('subcategory');

      expect(subcategoryTransformer.transformToApi).toHaveBeenCalledWith('subcategory');
      expect(apiUtil.post).toHaveBeenCalled();

      let postArgs = apiUtil.post.calls.argsFor(0)[0];
      expect(postArgs.url).toEqual('http://localhost:3000/subcategories');

      spyOn(subcategoryTransformer, 'transformFromApi').and.returnValue('newSubcategory');
      spyOn(categoryActions, 'storeSubcategory');
      let successCallback = postArgs.onSuccess;
      successCallback({subcategory: 'subcategoryFromApi'});

      expect(subcategoryTransformer.transformFromApi).toHaveBeenCalledWith('subcategoryFromApi');
      expect(categoryActions.storeSubcategory).toHaveBeenCalledWith('newSubcategory');
    });

    it('updateSubcategory calls apiUtil.put with callback', () => {
      let subcategory = {id: 11, name: 'Sub'};
      spyOn(apiUtil, 'put');
      spyOn(subcategoryTransformer, 'transformToApi').and.returnValue('transformedSubcategory');

      categoryActions.updateSubcategory(subcategory);

      expect(subcategoryTransformer.transformToApi).toHaveBeenCalledWith(subcategory);
      expect(apiUtil.put).toHaveBeenCalled();

      let putArgs = apiUtil.put.calls.argsFor(0)[0];
      expect(putArgs.url).toEqual('http://localhost:3000/subcategories/11');

      spyOn(subcategoryTransformer, 'transformFromApi').and.returnValue('updatedSubcategory');
      spyOn(categoryActions, 'storeSubcategory');
      let successCallback = putArgs.onSuccess;
      successCallback({subcategory: 'subcategoryFromApi'});

      expect(subcategoryTransformer.transformFromApi).toHaveBeenCalledWith('subcategoryFromApi');
      expect(categoryActions.storeSubcategory).toHaveBeenCalledWith('updatedSubcategory');
    });

    it('deleteSubcategory calls apiUtil.delete with callback', () => {
      spyOn(apiUtil, 'delete');
      categoryActions.deleteSubcategory(43);
      expect(apiUtil.delete).toHaveBeenCalled();
      expect(dispatcherSpy).toHaveBeenCalledWith({type: 'DELETE_SUBCATEGORY'});

      let deleteArgs = apiUtil.delete.calls.argsFor(0)[0];
      expect(deleteArgs.url).toEqual('http://localhost:3000/subcategories/43');

      spyOn(categoryActions, 'removeSubcategory');
      let successCallback = deleteArgs.onSuccess;
      successCallback();
      expect(categoryActions.removeSubcategory).toHaveBeenCalledWith(43);
    });

    it('storeSubcategories dispatches the subcategories to the store', () => {
      categoryActions.storeSubcategories(['subcategories']);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_SUBCATEGORIES',
        subcategories: ['subcategories']
      });
    });

    it('storeSubcategory dispatches the subcategory to the store', () => {
      categoryActions.storeSubcategory('subcategory');
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_SUBCATEGORY',
        subcategory: 'subcategory'
      });
    });

    it('removeSubcategory dispatches the subcategory id to the store', () => {
      categoryActions.removeSubcategory(14);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'REMOVE_SUBCATEGORY',
        subcategoryId: 14
      });
    });
  });
});
