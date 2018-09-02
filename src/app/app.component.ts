import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  userName = "";  
  fullName = "";
  login = "";
  avatar_url="";
  searchFlag = false;
  users:any;
  constructor(private _http:HttpClient){  }

  searchUser(){
    this.searchFlag = true;
    this._http.get("https://api.github.com/search/users?q="+this.userName+"+in%3Afullname&type=Users")
                      .subscribe(data => {
                        this.users = data;
                        for(let i=0;i<this.users.items.length;i++){
                            this._http.get("https://api.github.com/users/"+this.users.items[i].login)  
                                .subscribe((res:Response)=>{
                                this.fullName = res.name;
                                console.log(this.fullName);
                                });                           
                        }
                        
                              
                      });
    //console.log(this.users.json());
    // this._http.get("https://api.github.com/search/users?q="+this.userName+"+in%3Afullname&type=Users")
    //             .subscribe(
    //               (res:Response)=>{
    //                 this.login = res.items[0].login;
    //                 // this.avatar_url = res.items[0].avatar_url;
    //                 this._http.get("https://api.github.com/users/"+this.login)  
    //                     .subscribe((res:Response)=>{
    //                     this.fullName = res.name;
    //                     }); 
    //               });

     
  } 
  
}
