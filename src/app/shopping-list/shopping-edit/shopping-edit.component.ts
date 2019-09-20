import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f',null) editForm:NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex:number;
  editedItem:Ingredient;

  constructor(private shoppinglistService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppinglistService.startedEditing.subscribe((index) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppinglistService.getIngredient(index);

      this.editForm.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount
      })


    })
  }

  onSubmit(form:NgForm) 
  {
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(!this.editMode){ 
      this.shoppinglistService.addIngredient(newIngredient);
    }
    else{
      this.shoppinglistService.updateIngredient(this.editedItemIndex,newIngredient);
      this.editMode = false;
      this.editedItemIndex = null;
      this.editedItem = null;
    } 
  }

  onClear(){
    this.editForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppinglistService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
