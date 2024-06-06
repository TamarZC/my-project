import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllRecipeComponent } from './all-recipe/all-recipe.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { SmallRecipeComponent } from './small-recipe/small-recipe.component';
import Recipe from './models/Recipe';


const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'recipies',component:AllRecipeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'add',component:AddRecipeComponent},
  {path:'edit',component:EditRecipeComponent},
  {path:'details',component:RecipeDetailsComponent},
  {path:'smallrecipe',component:SmallRecipeComponent},
  {path:'',redirectTo:'home',pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }