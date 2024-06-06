import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import Category from '../models/Category';
import Layer from '../models/Layer';
import Recipe from '../models/Recipe';
import { CategoryService } from '../services/category.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent  implements OnInit {
  constructor(public categoryService: CategoryService, public myRouter: Router, public recipeService: RecipeService) { }

  ngOnInit(): void {
    this.categories = this.categoryService.categories
  }

  emptyRecipe = new Recipe(null, null, null, null, null, null, [], [], null, null, null)
  layer: Layer = new Layer(null, [])
  categories: Category[] = []

  @Output()
  myAddEvent = new EventEmitter<Recipe>();

  save() {
    if (typeof window.localStorage !== 'undefined') {
      this.emptyRecipe.UserId = +localStorage.getItem('id')
    }

    if (this.emptyRecipe.Image == null)
      this.emptyRecipe.Image = "399.jpg"
    this.recipeService.addRecipe(this.emptyRecipe).subscribe((succ) => {
      debugger
      succ
      this.categories
      this.myRouter.navigate(['recipies'])
    },
      (err) => {
        alert("Error!");
      });
  }

  addInstruction(instruction: any) {
    this.emptyRecipe.Preparation.push(instruction.value)
    instruction.value = ""
  }

  addComponent(component: any) {
    this.layer.Components.push(component.value)
    component.value = ""
  }

  addLayer(description: any) {
    this.layer.Description = description.value;
    description.value = ""
    this.emptyRecipe.Layers.push(this.layer)
    this.layer = new Layer(null, [])
  }
}
