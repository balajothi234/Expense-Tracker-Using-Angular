import { Injectable } from '@angular/core';
export interface User{
  username:string;
  email:string;
  password:string;
}
@Injectable({
  providedIn: 'root',
})
export class Auth {
  private userKey='users';
  private loggedInUserKey='loggedInUser';

  constructor(){}
  
  getAllUsers():User[]{
    return JSON.parse(localStorage.getItem(this.userKey)||'[]');
  }
  register(user:User):boolean{
    const users=this.getAllUsers();
    const exists=users.find(u=> u.email === user.email);
    if(exists){
      return false;
    }
    users.push(user);
    localStorage.setItem(this.userKey,JSON.stringify(users));
    return true;
  }
  login(email:string,password:string):boolean{
    const users=this.getAllUsers();
    const user=users.find(u=>u.email===email && u.password===password);
    if(user){
      localStorage.setItem(this.loggedInUserKey,JSON.stringify(user))
      return true;
    }else{
      return false
    }
  }
    getLoggedInUser(): User | null {
    const data = localStorage.getItem(this.loggedInUserKey);
    return data ? JSON.parse(data) : null;
  }
  logout() {
    localStorage.removeItem(this.loggedInUserKey);
  }
 isLoggedIn(): boolean {
    return !!localStorage.getItem(this.loggedInUserKey);
  }
}
