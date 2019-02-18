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

  constructor(private _register: RegistrationService) { }

  ngOnInit() {
    this.getAllUsers()
  }



  getAllUsers() {
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
        this.fromServerKeys = [];
        this.idFromSql = [];
        this.firstNameFromSql = [];
        this.lastNameFromSql = [];
        this.yearFromSql = [];
        this.getAllUsers()
      },
      err => { console.log(err) }
    )
  }
}

