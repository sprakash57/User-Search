import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISummary } from './summary';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  users: any;
  repos = [];
  userName = "";
  results = 0;
  loginId = "";
  p = 1;
  resultFlag = true;
  details = "Details";
  repository = [];
  profiles = [];

  constructor(private _http:HttpClient) { }

  searchUser() {
    this.resultFlag = false;
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
    this.repos = [];

    this._http.get<ISummary[]>(`https://api.github.com/users/${id​}/repos?per_page=100type=owner`)
        .subscribe(data =>{
         this.repository = data;
         for(let item of this.repository){
            if(item.owner.login === id){
              this.loginId = id;
              this.repos.push(item);
            }
          }
        });
  }

  ascendingOrder(){
    this.profiles.sort();
  }

  descendingOrder(){
    this.profiles.sort().reverse();
  }

  ngOnInit(){
    
  }

}
