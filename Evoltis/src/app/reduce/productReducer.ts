

import { Product } from '../interfaces/product';
import { addProduct, deleteProduct, loadProducts, loadCategories, loadCategoriesFilters, addCategory, deleteCategory } from './accions';

export const initialState: ReadonlyArray<Product> = [];


export function productReducer(state: any, action: any) {
  switch (action.type) {
    case loadProducts.type:
      return { ...state, action };
    case addProduct.type:
      return { ...state, action };
    case deleteProduct.type:
      return { ...state, action };
    case loadCategories.type:
      return { ...state, action };
    case loadCategoriesFilters.type:
      return { ...state, action };
    case addCategory.type:
      return { ...state, action };
    case deleteCategory.type:
      return { ...state, action };
    default:
      return { ...state, action };
  }

}