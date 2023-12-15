import { createAction, props } from '@ngrx/store';
import { Product } from '../interfaces/product';
import { Category } from '../interfaces/category';


//Products Actions
export const loadProducts = createAction(
    '[Product] Load Products',
    props<{ page: number, pageSize: number, name: string, category: number }>()
);
export const loadProductsSuccess = createAction(
    '[Product] Load Products Success',
    props<{ products: Product[], totalRows: number }>()
);
export const loadProductsFailure = createAction(
    '[Product] Load Products Failure',
    props<{ error: any }>()
);

export const addProduct = createAction(
    '[Product] Add Product',
    props<{ product: Product }>()
);

export const addProductSuccess = createAction(
    '[Product] Add Product Success',
    props<{ response: any }>()
);

export const addProductFailure = createAction(
    '[Product] Add Product Failure',
    props<{ error: any }>()
);

export const deleteProduct = createAction(
    '[Product] Delete Product',
    props<{ id: number }>()
);

export const deleteProductSuccess = createAction(
    '[Product] Delete Product Success',
    props<{ response: any }>()
);

export const deleteProductFailure = createAction(
    '[Product] Delete Product Failure',
    props<{ error: any }>()
);


//Category Actions

export const loadCategories = createAction(
    '[Category] Load Categories'
);
export const loadCategoriesSuccess = createAction(
    '[Category] Load Categories Success',
    props<{ categories: any[] }>()
);
export const loadCategoriesFailure = createAction(
    '[Category] Load Categories Failure',
    props<{ error: any }>()
);

export const loadCategoriesFilters = createAction(
    '[Category] Load Categories',
    props<{ page: number, pageSize: number, idCategory: number, name: string }>()
);
export const loadCategoriesFiltersSuccess = createAction(
    '[Category] Load Categories Success',
    props<{ categories: Category[], totalRows: number }>()
);
export const loadCategoriesFiltersFailure = createAction(
    '[Category] Load Categories Failure',
    props<{ error: any }>()
);


export const addCategory = createAction(
    '[Category] Add Category',
    props<{ category: Category }>()
);

export const addCategorySuccess = createAction(
    '[Category] Add Category Success',
    props<{ response: any }>()
);

export const addCategoryFailure = createAction(
    '[Category] Add Category Failure',
    props<{ error: any }>()
);

export const deleteCategory = createAction(
    '[Category] Delete Category',
    props<{ id: number }>()
);

export const deleteCategorySuccess = createAction(
    '[Category] Delete Category Success',
    props<{ response: any }>()
);

export const deleteCategoryFailure = createAction(
    '[Category] Delete Category Failure',
    props<{ error: any }>()
);


