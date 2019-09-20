import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  //selectdeRecipe: Recipe;

  constructor() { }

  ngOnInit() {
    // this.recipeService.recipeSelected.subscribe((recipe:Recipe) => {
    //   this.selectdeRecipe = recipe;
    // })
  }

}
