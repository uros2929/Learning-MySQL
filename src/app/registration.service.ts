import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  _urlMain="http://localhost:3000/api/main"
  _urlAddUser="http://localhost:3000/api/addUser"
  _urlRemoveUser="http://localhost:3000/api/removeUser"
  _urluserInfo="http://localhost:3000/api/userInfo"
  _urlEditUser="http://localhost:3000/api/editUser"
  constructor(private _http:HttpClient) { }

  getAllUsers(){
    return this._http.get(this._urlMain)
  }
  addUser(newUser){
    return this._http.post(this._urlAddUser,newUser)
  }
  removeUser(userId){
    return this._http.post(this._urlRemoveUser,userId)
  }
  userInfo(userId){
    return this._http.post(this._urluserInfo,userId)
  }
  editUser(params){
    return this._http.post(this._urlEditUser,params);
  }
}
