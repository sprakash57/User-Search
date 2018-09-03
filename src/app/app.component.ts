import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  userName = "";
  login = "";
  searchFlag = false;
  details = "Details";
  users: any;
  card = [];
  repository = [];
  constructor(private _http: HttpClient) { }

  searchUser() {
    this.searchFlag = true;
    this._http.get("https://api.github.com/search/users?q=" + this.userName + "+in%3Afullname&type=Users")
      .subscribe(data => {
        this.users = data;
        for (let i = 0; i < this.users.items.length; i++) {
          this._http.get("https://api.github.com/users/" + this.users.items[i].login)
            .subscribe((data) => {
              this.card[i] = data;

            });
        }
      });


  }


}
