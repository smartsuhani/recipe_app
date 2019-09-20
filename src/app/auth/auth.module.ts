import { NgModule } from "@angular/core";
import { SingupComponent } from './singup/singup.component';
import { SinginComponent } from './singin/singin.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations:[
        SingupComponent,
        SinginComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        AuthRoutingModule
    ]
})

export class AuthModule{

}