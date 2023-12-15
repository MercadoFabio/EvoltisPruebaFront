import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { loadCategoriesFiltersSuccess, loadCategoriesFiltersFailure, loadCategories, addProduct, addProductFailure, addProductSuccess, deleteProduct, deleteProductFailure, deleteProductSuccess, loadProducts, loadProductsFailure, loadProductsSuccess, loadCategoriesSuccess, loadCategoriesFailure, loadCategoriesFilters, addCategory, addCategoryFailure, addCategorySuccess, deleteCategory, deleteCategoryFailure, deleteCategorySuccess } from './accions';
import { of } from 'rxjs';
import { CategoryService } from '../services/category.service';

@Injectable()
export class ProductEffects {

    //Product Effects
    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadProducts),
            mergeMap(action =>
                this.productService.getAll(action.page, action.pageSize, action.name, action.category).pipe(
                    map(response => loadProductsSuccess(response)),
                    catchError(error => of(loadProductsFailure({ error })))
                )
            )
        )
    );
    addProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addProduct),
            mergeMap(action =>
                this.productService.add(action.product).pipe(
                    map(response => addProductSuccess({ response })),
                    catchError(error => of(addProductFailure({ error })))
                )
            )
        )
    );
    deleteProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteProduct),
            mergeMap(action =>
                this.productService.delete(action.id).pipe(
                    map(response => deleteProductSuccess({ response })),
                    catchError(error => of(deleteProductFailure({ error })))
                )
            )
        )
    );

    //Category Effects

    loadCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCategories),
            mergeMap(action =>
                this.categoryService.getCategories().pipe(
                    map(response => loadCategoriesSuccess(response)),
                    catchError(error => of(loadCategoriesFailure({ error })))
                )
            )
        ));

    loadCategoriesFilters$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCategoriesFilters),
            mergeMap(action =>
                this.categoryService.getAll(action.page, action.pageSize, action.idCategory, action.name).pipe(
                    map(response => loadCategoriesFiltersSuccess(response)),
                    catchError(error => of(loadCategoriesFiltersFailure({ error })))
                )
            )
        )
    );

    addCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addCategory),
            mergeMap(action =>
                this.categoryService.add(action.category).pipe(
                    map(response => addCategorySuccess({ response })),
                    catchError(error => of(addCategoryFailure({ error })))
                )
            )
        )
    );
    deleteCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteCategory),
            mergeMap(action =>
                this.productService.delete(action.id).pipe(
                    map(response => deleteCategorySuccess({ response })),
                    catchError(error => of(deleteCategoryFailure({ error })))
                )
            )
        )
    );


    constructor(private actions$: Actions, private productService: ProductService, private categoryService: CategoryService) { }


}