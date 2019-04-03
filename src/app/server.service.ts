import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  HomePageGoods , GoodsType,GoodsState} from '../app/struct';

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

  GetHomePageType(){
    var url = this.addr + "/data2";
    return this.http.get<GoodsType[]>(url).pipe();
  }

  //get homepagegoods-struct data
  GetGoodsDetail_1(id:number){
      var url = this.addr+"/getmsg/goods/souce?tag=base&goodsid="+id;
      return this.http.get<HomePageGoods>(url).pipe();
  }

  GetGoodsDetail_2(id:number){
    var url = this.addr+"/getmsg/goods/souce?tag=state&goodsid="+id;
      return this.http.get<GoodsState>(url).pipe();
  }

  GetGoodsDetail_3(id:number){
    var url =  this.addr+"/getmsg/goods/souce?tag=text&goodsid="+id;
    return this.http.get<string>(url).pipe();
  }

}
