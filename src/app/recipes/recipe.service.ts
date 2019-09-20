import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();
  
  private recipes:Recipe[] = [ 
    new Recipe('A Test Recipe',
    'This is simply a test',
    'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
    [
      new Ingredient('Meat',1),
      new Ingredient('French Fries',20)
    ]),
    new Recipe('Another Test Recipe',
    'This is simply a test',
    'https://c.pxhere.com/images/7a/68/166bae10efb2ba7e072ca553b907-1589195.jpg!d',
    [
      new Ingredient('Buns',2),
      new Ingredient('Meat',1)
    ]),
  ];
  
  constructor(private shoppinglistService: ShoppingListService) { }

  setRecipes(recipes:Recipe[]){
    this.recipes =recipes;
    this.recipesChanged.next([...this.recipes]);
  }

  getRecipes(){
    return [...this.recipes];
  }

  getRecipe(id:number){
    return this.recipes[id]
  }

  addIngredientToShoppingList(ingredients: Ingredient[]){
    this.shoppinglistService.addIngridients(ingredients)
  }

  addRecipe(recipe:Recipe){
    console.log(recipe)
    this.recipes.push(recipe);
    this.recipesChanged.next([...this.recipes]);
    
  }

  updateRecipe(index:number, newRecipe:Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next([...this.recipes]);
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipesChanged.next([...this.recipes]);
  }
}
