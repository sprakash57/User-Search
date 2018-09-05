import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  p:number = 1;
  userName = "";
  results:number;
  loginId:string;
  resultFlag = false;
  details = "Details";
  users: any;
  repos: any;
  repository = [];
  profiles = [];

  constructor(private _http: HttpClient) { }

  searchUser() {
    this.resultFlag = true;
    this._http.get("https://api.github.com/search/users?q=" + this.userName + "+in%3Afullname&type=Users")
      .subscribe(data => {
        this.users = data;
        this.results = this.users.items.length;
        for (let i = 0; i < this.results; i++) {
          this._http.get("https://api.github.com/users/" + this.users.items[i].login)
            .subscribe((data) => {
              this.profiles[i] = data;
            });
        }
      });
  }

  fetchRepos(id:string){
    this._http.get(`https://api.github.com/users/${id​}/repos?per_page=100type=owner`)
        .subscribe(data =>{
          this.repos = data; 
          for(let item of this.repos){
            if(item.owner.login === id){
              this.loginId = id;
              this.repository.push(item);
            }
          }
        });
  }
}
