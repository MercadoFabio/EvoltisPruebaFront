import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Observable, map, catchError, of, take, Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import { addCategory, addCategorySuccess, addCategoryFailure } from 'src/app/reduce/accions';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit, OnDestroy {
  category!: Category;
  categoryForm!: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(
    private dialogRef: DynamicDialogRef,
    private store: Store,
    private messageService: MessageService,
    private actions$: Actions,
    private config: DynamicDialogConfig,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      id: [0],
      name: ['', Validators.required, this.categoryNameValidator.bind(this)],
      description: ['']
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit() {
    if (this.config.data) {
      this.category = this.config.data.category;
      this.categoryForm.patchValue({
        id: this.category.id,
        name: this.category.name,
        description: this.category.description
      });
    }
  }

  addCategory() {
    this.store.dispatch(addCategory({ category: this.categoryForm.value }));

    const successSubscription = this.actions$.pipe(
      ofType(addCategorySuccess),
      take(1)
    ).subscribe((action) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: action.response.message });
      this.dialogRef.close(action.response);
    });
    const errorSubscription = this.actions$.pipe(
      ofType(addCategoryFailure),
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

  categoryNameValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.categoryService.getCategories().pipe(
      map((response: any) => {
        const category = response.data.find((category: any) => category.name === control.value);
        return category ? { categoryNameExists: true } : null;
      }),
      catchError(() => of(null))
    );
  }
}
