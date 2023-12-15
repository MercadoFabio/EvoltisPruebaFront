import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { ProductAddComponent } from './components/product/product-add/product-add.component';
import { CategoryComponent } from './components/category/category.component';

const routes: Routes = [
  { path: "product", component: ProductComponent },
  { path: "category", component: CategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
