import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
//import { HeaderComponent } from './core/header/header.component';
import { AppRoutingModule } from './app-routing.module';
//import { RecipesModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';
//import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
//import { HomeComponent } from './core/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //RecipesModule,
    FormsModule,
    SharedModule,
    //ShoppingListModule,
    AuthModule,
    CoreModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
