import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subscription, catchError, map, of, take } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import { Product } from 'src/app/interfaces/product';
import { addProduct, addProductFailure, addProductSuccess } from 'src/app/reduce/accions';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit, OnDestroy {
  categories!: Category[];
  product!: Product;
  productForm!: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(private dialogRef: DynamicDialogRef,
    private messageService: MessageService,
    private config: DynamicDialogConfig,
    private productService: ProductService,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private store: Store,
    private actions$: Actions

  ) {
    this.productForm = this.fb.group({
      id: [0],
      name: ['', Validators.required, this.productNameValidator.bind(this)],
      idCategory: ['', Validators.required],
      price: ['', Validators.required, Validators.min(0)],
      quantity: ['', Validators.required, Validators.min(0)],
    })
  }
  ngOnInit() {
    this.getCategories();
    if (this.config.data) {
      this.product = this.config.data.product;
      this.productForm.patchValue({
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        quantity: this.product.quantity,
        idCategory: this.product.idCategory,
      });
    }
  }
  getCategories() {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data.data;
    });
  }

  addProduct() {
    this.store.dispatch(addProduct({ product: this.productForm.value }));
    const successSubscription = this.actions$.pipe(
      ofType(addProductSuccess),
      take(1)
    ).subscribe((action) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: action.response.message });
      this.dialogRef.close(action.response);
    });
    const errorSubscription = this.actions$.pipe(
      ofType(addProductFailure),
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

  productNameValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.productService.get().pipe(
      map((response: any) => {
        const product = response.data.find((product: any) => product.name === control.value);
        return product ? { productNameExists: true } : null;
      }),
      catchError(() => of(null))
    );
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
