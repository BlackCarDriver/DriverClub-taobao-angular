import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  HomePageGoods } from '../app/struct';

@Injectable({
  providedIn: 'root'
})

export class ServerService {

  //important config !!!
  private addr: string  = "http://localhost:8090"

  constructor( 
    private http: HttpClient
    ){ }
    
  GetHomePageGoods(tag : string, index : number){
      var url = this.addr + "/data";
      return this.http.get<HomePageGoods[]>(url).pipe();
  }

}
