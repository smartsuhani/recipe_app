import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { map } from 'rxjs/operators';
//import 'rxjs/RX';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn:'root'
})
export class DataStorageService{
    constructor(private http:HttpClient, private recipeService:RecipeService,private authService: AuthService){

    }

    storeRecipes(){
        let token = this.authService.getToken();
        const headers = new HttpHeaders().set('Content-Type','application/json')
        
        return this.http.put("https://fir-angular-3685f.firebaseio.com/recipes.json?auth="+token,this.recipeService.getRecipes(),{
            observe: 'body',
            //headers : new HttpHeaders({'Content-Type':'application/json'})
            headers: headers
        })

        // for parameters
        // return this.http.put("https://fir-angular-3685f.firebaseio.com/recipes.json",this.recipeService.getRecipes(),{
        //     observe: 'body',
        //     params: new HttpParams().set('auth',token)
        // })

        //2nd way
        // const req = new HttpRequest('PUT',
        // 'https://fir-angular-3685f.firebaseio.com/recipes.json',
        // this.recipeService.getRecipes(),
        // {
        //     reportProgress: true,
        //     params: new HttpParams().set('auth',token)
        // })

        // return this.http.request(req)
    }

    getRecipes(){
        
        let token = this.authService.getToken();
        // this.http.get<Recipe[]>("https://fir-angular-3685f.firebaseio.com/recipes.json?auth="+token,
        // {
        //     observe: 'response',
        //     responseType : 'json'
        // }).pipe(map((response)=>{
        //     const data:Recipe[] = response;
        //     for (const recipe in data) {
        //         if(!data[recipe]['ingredients']){
        //             //console.log(data[recipe])
        //             data[recipe]['ingredients'] = [];
        //         }
        //     }
        //     return data;
        // }))
        // .subscribe((response)=>{
        //     this.recipeService.setRecipes(response);
        // });
        this.http.get<Recipe[]>("https://fir-angular-3685f.firebaseio.com/recipes.json?auth="+token)
        .pipe(map((response)=>{
            const data:Recipe[] = response;
            for (const recipe in data) {
                if(!data[recipe]['ingredients']){
                    //console.log(data[recipe])
                    data[recipe]['ingredients'] = [];
                }
            }
            return data;
        }))
        .subscribe((response)=>{
            this.recipeService.setRecipes(response);
        });
        /*.pipe(map((response)=>{
            this.recipeService.setRecipes(<Recipe[]>response);
        }));*/
    }
}