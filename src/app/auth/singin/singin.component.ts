import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {

  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit() {
  }
  onSingIn(form:NgForm)
  {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.singinUser(email,password);
  }

}
