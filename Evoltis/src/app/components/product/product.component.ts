import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { Product } from 'src/app/interfaces/product';
import { CategoryService } from 'src/app/services/category.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductAddComponent } from './product-add/product-add.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { deleteProduct, deleteProductFailure, deleteProductSuccess, loadCategories, loadCategoriesFailure, loadCategoriesSuccess, loadProducts, loadProductsFailure, loadProductsSuccess } from 'src/app/reduce/accions';
import { Subscription, take, tap } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit, OnDestroy {
  totalRows: number = 0;
  products: Product[] = [];
  categories!: Category[];
  filters!: Product[];
  page: number = 1;
  pageSize: number = 5;
  filterProduct: FormGroup;
  private subscriptions: Subscription[] = [];



  addProductDialogRef!: DynamicDialogRef;


  constructor(private dialogService: DialogService,
    private store: Store,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private actions$: Actions,

  ) {
    this.filterProduct = this.fb.group({
      name: [''],
      category: [''],
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit() {
    this.getCategories();
    this.getProducts()
    this.filterProduct.valueChanges.subscribe((value) => {
      this.getProducts()
    })

  }
  getCategories() {
    this.store.dispatch(loadCategories());
    const successSubscription = this.actions$.pipe(
      ofType(loadCategoriesSuccess),
      take(1)
    ).subscribe((action:any) => {
      this.categories = action.data;
    });
    const errorSubscription = this.actions$.pipe(
      ofType(loadCategoriesFailure),
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
  getProducts() {
    this.store.dispatch(loadProducts({ page: this.page, pageSize: this.pageSize, name: this.filterProduct.value.name, category: this.filterProduct.value.category }));
    const successSubscription = this.actions$.pipe(
      tap((action: any) => console.log(action)),
      ofType(loadProductsSuccess),
      take(1)
    ).subscribe((action: any) => {
      this.products = action.data;
      this.totalRows = action.totalRows;
    });
    const errorSubscription = this.actions$.pipe(
      ofType(loadProductsFailure),
      take(1)
    ).subscribe((action: any) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: action.error.error.message,
      });
    });
    this.subscriptions.push(successSubscription, errorSubscription);
  }
  addProduct() {
    this.addProductDialogRef = this.dialogService.open(ProductAddComponent, {
      header: 'Add Product',
      width: '30%',
      height: '70%',
    });
    this.addProductDialogRef.onClose.subscribe((product: Product) => {
      if (product) {
        this.getProducts();
      }
    });
  }

  editProduct(product: Product) {
    const ref: DynamicDialogRef = this.dialogService.open(ProductAddComponent, {
      data: { product: product },
      header: 'Edit Product',
      width: '30%',
      height: '70%',
    });
    ref.onClose.subscribe((product: Product) => {
      if (product) {
        this.getProducts();
      }
    });
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Esta seguro que desea eliminar el producto ' + product.name,
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.store.dispatch(deleteProduct({ id: product.id! }));
        const successSubscription = this.actions$.pipe(
          ofType(deleteProductSuccess),
          take(1)
        ).subscribe((action) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: action.response.message });
        });
        const errorSubscription = this.actions$.pipe(
          ofType(deleteProductFailure),
          take(1)
        ).subscribe((action) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: action.error.error.message,
          });
        });
        this.subscriptions.push(successSubscription, errorSubscription);
      },
    });

  }
  onPageChange(event: any) {
    this.page = event.first / event.rows + 1;
    this.pageSize = event.rows;
    this.getProducts();
  }

}



