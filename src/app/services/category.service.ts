import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import Category from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }
  baseRouteUrl = `${environment.baseUrl}/category`;
  categories: Category[] = []

  getAllCategories(){
    return this.http.get<Category[]>(`${this.baseRouteUrl}/GetAllRecipies`);
  }
  getCategoryById(categoryId: number){
    return this.http.get<Category[]>(`${this.baseRouteUrl}/GetCategoryById(${categoryId})`);
  }
}
