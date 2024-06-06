import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import Recipe from '../models/Recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient) { }
  baseRouteUrl = `${environment.baseUrl}/recipe`;

  getAllRecipies(){
    return this.http.get<Recipe[]>(`${this.baseRouteUrl}/GetAllRecipies`);
  }
  getRecipeById(id: number){
    return this.http.get<Recipe>(`${this.baseRouteUrl}/GetRecipeById(${id})`);
  }
  getRecipiesByCategoryId(categoryId: number){
    return this.http.get<Recipe[]>(`${this.baseRouteUrl}/GetGetRecipesByCategoryId(${categoryId})`);
  }
  addRecipe(recipe: Recipe){
    return this.http.post<Recipe>(`${this.baseRouteUrl}/AddRecipe`, recipe);
  }
 updateRecipe(recipeId: number, recipe: Recipe){
    return this.http.put(`${this.baseRouteUrl}/UpdateRecipe?recipeId=${recipeId}`, recipe);
  }
}
