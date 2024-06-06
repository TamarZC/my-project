import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../services/category.service';
import Category from '../models/Category';
import Recipe from '../models/Recipe';

@Component({
  selector: 'app-small-recipe',
  templateUrl: './small-recipe.component.html',
  styleUrls: ['./small-recipe.component.scss']
})
export class SmallRecipeComponent implements OnInit{
  category: Category = new Category(0, "", "") 
  stars = [1, 2, 3, 4, 5]

  constructor(public categoryService: CategoryService) { }

  ngOnInit(): void {
    debugger
    this.category = this.categoryService.categories[this.emptyRecipe.CategoryId - 1]
  }

  @Input()
  emptyRecipe: Recipe;
}
