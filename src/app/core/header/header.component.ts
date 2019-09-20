import { Component } from '@angular/core';

import { DataStorageService } from '../../shared/data-storage.service';
import { RecipeService } from '../../recipes/recipe.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';


@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls: []
})


export class HeaderComponent{

    // @Output() featureSelected = new EventEmitter<string>();

    // onSelect(feature: string){
    //     this.featureSelected.emit(feature);
    // }

    constructor(private dataStoreService:DataStorageService,
        private recipeService:RecipeService,
        public authService: AuthService,
        private router:Router){

    }

    onLogout(){
        this.authService.logout()
    }
    onSave(){
        this.dataStoreService.storeRecipes().subscribe((response:Response) => {
            console.log(response)
        })
    }

    onFetch(){
        this.dataStoreService.getRecipes();
    }
}