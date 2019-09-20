import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn:'root'
})

export class AuthService{

    token: string;

    constructor(private router:Router){

    }

    singupUser(email: string, password: string){
        firebase.auth().createUserWithEmailAndPassword(email,password).catch(error => console.log(error))
    }

    singinUser(email: string, password: string){
        firebase.auth().signInWithEmailAndPassword(email, password).then((response)=>{
            this.router.navigate(['/recipes'])
            firebase.auth().currentUser.getIdToken().then((tk: string)=>{
                this.token = tk;
            });
        }).catch(error => console.log(error));
    }

    logout(){
        firebase.auth().signOut();
        this.token = null;
    }

    getToken(){
        firebase.auth().currentUser.getIdToken().then((tk: string)=>{
            this.token = tk;
        });
        return this.token;

    }

    isAuthenticated(){
        return this.token != null;
    }
}