import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  fromServerKeys = [];
  idFromSql = [];
  firstNameFromSql = [];
  lastNameFromSql = [];
  yearFromSql = [];
  userIdForEdit;
  userFormForEdit=[];
  constructor(private _register: RegistrationService) { }

  ngOnInit() {
    this.getAllUsers()
  }



  getAllUsers() {
    this.fromServerKeys = [];
    this.idFromSql = [];
    this.firstNameFromSql = [];
    this.lastNameFromSql = [];
    this.yearFromSql = [];
    this._register.getAllUsers().subscribe(
      res => {
        this.fromServerKeys.push(Object.keys(res));
        for (let index = 0; index < this.fromServerKeys[0].length; index++) {
          this.idFromSql.push(res[index].userID)
          this.firstNameFromSql.push(res[index].firstName)
          this.lastNameFromSql.push(res[index].lastName)
          this.yearFromSql.push(res[index].userYear)
        }
      }
    )
  }
  addUserGetValues(event) {
    event.preventDefault();
    let newUserFromForm = {
      firstName: event.target.form[0].value,
      lastName: event.target.form[1].value,
      userYear: event.target.form[2].value
    }
    this._register.addUser(newUserFromForm).subscribe(
      res => {
        console.log(res),
        this.getAllUsers();
        event.target.form.reset();
      },
      err => { console.log(err) }
    )
  }

  removeUser(event){
    let userId=[event.target.id];
    this._register.removeUser(userId).subscribe(
      res=>{
        console.log(res);
        this.getAllUsers()
      },
      err=>{
        console.log(err)
      }
    )
  }
  userInfo(event){
    let userId=[event.target.id];
    document.getElementById('modalFormEdit').style.display='block';
    this.userIdForEdit=userId;
    this._register.userInfo(userId).subscribe(
      res=>{
        console.log(res)
        this.fillFormForEditUser(res[0].firstName,res[0].lastName,res[0].userYear);
      },
      err=>{
        console.log(err)
      }
    )
  }

  editUser(event){
    event.preventDefault();
    this.userFormForEdit=[];
    let form=document.getElementById('formEdit');
    this.userFormForEdit=[form[0].value,form[1].value,form[2].value,this.userIdForEdit];
    this._register.editUser(this.userFormForEdit).subscribe(
      res=>{
        console.log(res)
        this.getAllUsers()
        document.getElementById('modalFormEdit').style.display='none';

      },
      err=>{
        console.log(err)
      }
    )
  }

  fillFormForEditUser(firstName,lastName,userYear){
    let form=document.getElementById('formEdit');
    form[0].value=firstName;
    form[1].value=lastName;
    form[2].value=userYear;
  }
  
  closeModalEdit(){
    document.getElementById('modalFormEdit').style.display='none'; 
  }
}

