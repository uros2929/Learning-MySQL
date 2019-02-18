import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  _urlMain="http://localhost:3000/api/main"
  _urlAddUser="http://localhost:3000/api/addUser"
  constructor(private _http:HttpClient) { }

  getAllUsers(){
    return this._http.get(this._urlMain)
  }
  addUser(newUser){
    return this._http.post(this._urlAddUser,newUser)
  }
}
