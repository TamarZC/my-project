import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { RecipeService } from '../services/recipe.service';
import { UserService } from '../services/user.service';
import Category from '../models/Category';
import Recipe from '../models/Recipe';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: Recipe = new Recipe(null, null, null, null, null, null, null, null, null, null, null)
  category: Category = new Category(null, null, null);
  stars = [1, 2, 3, 4, 5]
  isCurrentUser: boolean = false;

  constructor(public categoryService: CategoryService, public activatedRoute: ActivatedRoute,
    public recipiesService: RecipeService, public userService: UserService) {
    
      this.activatedRoute.params.subscribe(param => {
      this.recipe.Id = param['id'];
    })
  }

  ngOnInit(): void {
    debugger
    this.recipiesService.getRecipeById(this.recipe.Id).subscribe((succ) => {
      this.recipe = succ
      this.category = this.categoryService.categories[this.recipe.CategoryId - 1]
      this.checkCurrentUser();
    }
      , (err) => {
        // console.log("error!!!")
      }
    )
  }

  checkCurrentUser() {
    let name: string = localStorage.getItem('name')
    let password: string = localStorage.getItem('password')

    this.userService.getUserById(this.recipe.UserId).subscribe((succ) => {
      let reciprOwner = succ
      if (reciprOwner.Id === +localStorage.getItem('ID')) {
        this.isCurrentUser = true
      }
    }, (err) => {
      // console.log("error!")
    })
  }

}