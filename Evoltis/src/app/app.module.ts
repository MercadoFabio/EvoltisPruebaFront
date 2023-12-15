import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryAddComponent } from './components/category/category-add/category-add.component';

//PrimeNg

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { ProductAddComponent } from './components/product/product-add/product-add.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService ,ConfirmationService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { MenubarModule } from 'primeng/menubar';

//NgRx

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { productReducer } from './reduce/productReducer';
import { ProductEffects } from './reduce/productEffects';


@NgModule({
  imports: [
    BrowserModule,
    
    FormsModule,
    MenubarModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    ToastModule,
    HttpClientModule,
    TableModule,
    InputTextModule,
    NoopAnimationsModule,
    DropdownModule,
    ButtonModule,
    PaginatorModule,
    InputTextareaModule,
    StoreModule.forRoot({ products: productReducer }),
    EffectsModule.forRoot([ProductEffects]),

  ],
    declarations: [ ProductComponent , CategoryComponent , AppComponent , ProductAddComponent , CategoryAddComponent]  ,
    providers: [DialogService,MessageService,ConfirmationService],
    bootstrap: [AppComponent] ,


})

export class AppModule {}