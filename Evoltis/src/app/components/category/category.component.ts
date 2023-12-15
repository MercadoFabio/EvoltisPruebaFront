import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryAddComponent } from './category-add/category-add.component';
import { Store } from '@ngrx/store';
import { Subscription, take, tap } from 'rxjs';
import { loadCategoriesFailure, loadCategoriesFilters, loadCategoriesFiltersFailure, loadCategoriesFiltersSuccess, loadCategoriesSuccess } from 'src/app/reduce/accions';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  categories!: Category[];
  page: number = 1;
  pageSize: number = 5;
  filterCategory: FormGroup;
  totalRows: any;
  addCategoryDialogRef!: DynamicDialogRef;
  private subscriptions: Subscription[] = [];

  constructor(private dialogService: DialogService,
    private categoryService: CategoryService, private fb: FormBuilder,
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private store: Store,
    private actions$: Actions

  ) {
    this.filterCategory = this.fb.group({
      name: [''],
      idCategory: [0],
    });
  }

  ngOnInit() {
    this.getCategories();
    this.filterCategory.valueChanges.subscribe((value) => {
      this.getCategories();
    })
  }

  getCategories() {
    this.store.dispatch(loadCategoriesFilters({ page: this.page, pageSize: this.pageSize, idCategory: this.filterCategory.value.idCategory, name: this.filterCategory.value.name }));
    const successSubscription = this.actions$.pipe(
      ofType(loadCategoriesFiltersSuccess),
      take(1)
    ).subscribe((action: any) => {
      this.categories = action.data;
      this.totalRows = action.totalRows;
    });
    const errorSubscription = this.actions$.pipe(
      ofType(loadCategoriesFiltersFailure),
      take(1)
    ).subscribe((action) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: action.error.error.message,
      });
    });
  
    this.subscriptions.push(successSubscription, errorSubscription);
  }

  addCategory() {
    this.addCategoryDialogRef = this.dialogService.open(CategoryAddComponent, {
      header: 'Add Category',
      width: '30%',
      height: '70%',
    });
    this.addCategoryDialogRef.onClose.subscribe((category: Category) => {
      if (category) {
        this.getCategories();
      }
    });
  }

  editCategory(category: Category) {
    const ref: DynamicDialogRef = this.dialogService.open(CategoryAddComponent, {
      data: { category: category },
      header: 'Edit Category',
      width: '30%',
      height: '70%',
    });
    ref.onClose.subscribe((category: Category) => {
      if (category) {
        this.getCategories();
      }
    });
  }

  deleteCategory(category: Category) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Esta seguro que desea eliminar la categoría ' + category.name,
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.categoryService.delete(category.id).subscribe({
          next: (response: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
            this.getCategories();
          },
          error: (error: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
            this.getCategories();
          }
        });
      },
    });
  }

  onPageChange(event: any) {
    this.page = event.first / event.rows + 1;
    this.pageSize = event.rows;
    this.getCategories();
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
