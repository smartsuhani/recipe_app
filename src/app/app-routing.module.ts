
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { AuthModule } from './auth/auth.module';


const appRoutes:Routes = [
    {
        path:'',
        component: HomeComponent
    },
    {
        path:'recipes',
        loadChildren:'./recipes/recipes.module#RecipesModule'
    },
    {
        path:'shopping-list',
        loadChildren:'./shopping-list/shopping-list.module#ShoppingListModule'
    }
    /*{
        path:'',
        redirectTo:'/recipes',
        pathMatch:'full'
    },*/
    
    
    
]

@NgModule({  
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule],

})

export class AppRoutingModule{

}