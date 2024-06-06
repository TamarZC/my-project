import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import Category from '../models/Category';
import Recipe from '../models/Recipe';
import { CategoryService } from '../services/category.service';
import { RecipeService } from '../services/recipe.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-all-recipe',
  templateUrl: './all-recipe.component.html',
  styleUrls: ['./all-recipe.component.scss']
})
export class AllRecipeComponent implements OnInit{
  allRecipies: Recipe[] = []
  categories: Category[] = []
  name: string = null
  categoryId: number = null
  preperationTime: number = null
  isFilter: boolean = false

  constructor(public recipeService: RecipeService, public categoryService: CategoryService, public myRouter: Router,
    public userService: UserService) { }

  ngOnInit(): void {
    debugger
    this.recipeService.getAllRecipies().subscribe((succ) => {
      this.allRecipies = succ;
      this.categories = this.categoryService.categories
    },
      (err) => {
        alert("Error");
        console.log(err)
      })
  }

  addRecipeToRecipes(e: any) {
    this.recipeService.addRecipe(e).subscribe((succ) => {
      this.allRecipies.push(e);
    },
      (err) => {
        alert("Error");
        console.log(err)
      });
  }

  showDetails(recipe: Recipe) {
    if (this.isUser()) {
      this.myRouter.navigate(['/details', recipe.Id])
    }
    else {
      this.myRouter.navigate(['/login'])
    }
  }

  isUser() {
    return this.userService.currentUser.value.name !== 'Guest'
  }

  clearFilter() {
    this.name = null
    this.categoryId = null
    this.preperationTime = null
  }

  checkFilter(r: Recipe) {
    return ((this.name === null || this.name === "" || r.Name.startsWith(this.name)) && (this.categoryId === null || this.categoryId == r.CategoryId)
      && (this.preperationTime === null || this.preperationTime == +"" || +this.preperationTime === r.PreparationTimeInMinute))
  }

  playFilter() {
    this.isFilter = true
  }

  displayFilter() {
    this.isFilter = false
    this.clearFilter()
  }
}
