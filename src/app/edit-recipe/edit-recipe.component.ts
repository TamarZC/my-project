import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Category from '../models/Category';
import Layer from '../models/Layer';
import Recipe from '../models/Recipe';
import { CategoryService } from '../services/category.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit{
  recipe: Recipe = new Recipe(null, null, null, null, null, null, null, null, null, null, null)
  emptyRecipe = new Recipe(null, null, null, null, null, null, null, null, null, null, null)
  layer: Layer = new Layer(null, [])
  category: Category = new Category(null, null, null);
  categories: Category[] = []

  constructor(public activatedRoute: ActivatedRoute, public recipeService: RecipeService,
    public categoryService: CategoryService, public myRouter: Router) {
    this.activatedRoute.params.subscribe(param => {
      this.recipe.Id = param['id'];
    })
  }

  ngOnInit(): void {
    this.recipeService.getRecipeById(this.recipe.Id).subscribe((succ) => {
      this.recipe = succ

      //deep copy
      this.emptyRecipe.Id = this.recipe.Id
      this.emptyRecipe.CategoryId = this.recipe.CategoryId
      this.emptyRecipe.Image = this.recipe.Image
      this.emptyRecipe.Level = this.recipe.Level
      this.emptyRecipe.UserId = this.recipe.UserId
      this.emptyRecipe.PreparationTimeInMinute = this.recipe.PreparationTimeInMinute
      this.emptyRecipe.Name = this.recipe.Name
      this.emptyRecipe.Layers = []
      this.emptyRecipe.Preparation = []
      this.recipe.Layers.forEach((layer, i) => {
        this.emptyRecipe.Layers.push(new Layer(layer.Description, []))
        layer.Components.forEach(comp => {
          this.emptyRecipe.Layers[i].Components.push(comp)
        })
      });

      this.recipe.Preparation.forEach(instruction => {
        this.emptyRecipe.Preparation.push(instruction)
      });

      this.category = this.categoryService.categories[this.recipe.CategoryId - 1]
      this.categories = this.categoryService.categories
    }
      , (err) => {
        alert("שגיאה בקבלת הנתונים")
      })
  }

  empty(event :any) {
    event.target.value = ""
    this.recipe.Name = ""
  }

  addComponentInRecipe(componentInRecipe :any, i:any) {
    this.emptyRecipe.Layers[i].Components.push(componentInRecipe.value)
    componentInRecipe.value = ""
  }


  addComponent(component:any) {
    this.layer.Components.push(component.value)
    component.value = ""
  }

  addLayer(description:any) {
    this.layer.Description = description.value;
    description.value = ""
    this.emptyRecipe.Layers.push(this.layer)
    this.layer = new Layer(null, [])
  }

  deleteLayer(i:any) {
    this.emptyRecipe.Layers.splice(i, 1)
  }

  deleteComponent(i:any, j:any) {
    this.emptyRecipe.Layers[i].Components.splice(j, 1)
  }

  deleteInstruction(i:any) {
    this.emptyRecipe.Preparation.splice(i, 1)
  }

  addInstruction(instruction:any) {
    this.emptyRecipe.Preparation.push(instruction.value)
  }

  cancel() {
    this.myRouter.navigate([''])
  }

  saveChanges() {
    this.recipeService.updateRecipe(1001, this.emptyRecipe)
      .subscribe(succ => {
        alert("הפרטים נשמרו בהצלחה")
        this.myRouter.navigate([''])
      }, err => {
        alert("התרחשה שגיאה בקבלת הנתונים")
      })
  }
}
