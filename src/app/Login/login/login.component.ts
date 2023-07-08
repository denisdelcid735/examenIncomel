import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  singupUsers: any[] = [];
  singupObj: any = {
    userName: '',
    email: '',
    password: ''
  };
  loginObj: any = {
    userName: '',
    password: ''
  };
  
  constructor(
    private router: Router,
    private snack_bar: MatSnackBar){
    
  
  }
  
    ngOnInit(): void {
      const localData = localStorage.getItem('singUpUsers');
      if(localData != null){
        this.singupUsers = JSON.parse(localData);
        console.log(localData);
      }
    }
  
    onSingUp() {
      console.log("ingresa a singUpd");
      this.singupUsers.push(this.singupObj);
      localStorage.setItem('singUpUsers', JSON.stringify(this.singupUsers));
      this.singupObj = {
        userName: '',
        email: '',
        password: ''
      }
      }

      openSnackBar(msg: string, accion: string) {
        this.snack_bar.open(msg, accion,{
          horizontalPosition:"end",
          verticalPosition: "top",
          duration: 2000
        });
      }
      
      
      onLogin() {
        console.log("ingresa Login")
        const isUserExists = this.singupUsers.find(m => m.userName == this.loginObj.userName && m.password == this.loginObj.password);
          if(isUserExists != undefined) {
            this.openSnackBar("Tus credenciales son correctas", "Listo");
             this.router.navigate(['menu']);
          } else {
            this.openSnackBar("Credenciales incorrectas", "OK");
          }
      }
      
  
  

}
