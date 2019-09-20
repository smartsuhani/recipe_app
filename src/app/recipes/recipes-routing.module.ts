import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { AuthGaurd } from '../auth/auth-gaurd.service';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const recipesRoutes:Routes = [
    {
        path:'',
        component:RecipesComponent,
        children: [
            {
                path:'',
                component:RecipeStartComponent
            },
            {
                path:'new',
                canActivate:[AuthGaurd],
                component:RecipeEditComponent
            },
            {
                path:':id',
                component:RecipeDetailComponent
            },
            {
                path:':id/edit',
                canActivate:[AuthGaurd],
                component:RecipeEditComponent
            }
        ]
        
    }
]


@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)],
    exports: [RouterModule],
})

export class RecipesRoutingModule{

}