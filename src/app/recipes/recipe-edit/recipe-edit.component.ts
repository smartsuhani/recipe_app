import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number;
  editMode=false;
  recipeForm: FormGroup
  constructor(private route:ActivatedRoute, private recipeService: RecipeService,private router:Router) { }

  ngOnInit() {

    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id'];
      this.editMode = params['id'] !=null;
      //console.log(this.route.url);
      //console.log(this.editMode);
      this.initForm();
    })
  }

  onSubmit(){
    //console.log(this.recipeForm);
    /*const newRecipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.description ,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients);*/
    if(this.editMode){
      // this.recipeService.updateRecipe(this.id, newRecipe);
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }
    else{
      // this.recipeService.addRecipe(newRecipe);
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.editMode=false;
    this.recipeForm.reset();
    this.router.navigate(['../'],{relativeTo: this.route})
  }

  onAddIngredient()
  {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null,Validators.compose([Validators.required,])),
      'amount': new FormControl(null,Validators.compose([Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]))
    }));
  }

  get loadIngredients()
  { 
      return <FormArray>this.recipeForm.get('ingredients'); 
  }
  private initForm(){

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    
    
    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe.ingredients){
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name,Validators.compose([Validators.required])),
            'amount': new FormControl(ingredient.amount,Validators.compose([Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]))
          }))
        }
        console.log(recipeIngredients.controls);
      }
      //recipeIngredients = recipe.ingredients;
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.compose([Validators.required])),
      'imagePath': new FormControl(recipeImagePath,Validators.compose([Validators.required])),
      'description' : new FormControl(recipeDescription,Validators.compose([Validators.required])),
      'ingredients' : recipeIngredients
    })

  }

  onCancel(){
    this.editMode = false;
    this.recipeForm.reset();
    this.router.navigate(['../'],{relativeTo: this.route})
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  

}