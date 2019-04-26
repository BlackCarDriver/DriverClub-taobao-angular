import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  HomePageGoods , GoodsType,GoodsState,UploadGoods,PersonalExpend } from '../app/struct';
import {  account1, account2} from '../app/struct';
import { PersonalBase} from '../app/struct';
import { post } from 'selenium-webdriver/http';
@Injectable({
  providedIn: 'root'
})

export class ServerService {

  //important config !!!
//本地开发配置
  //private addr: string  = "http://localhost:8090"
 //服务器配置
 private addr: string  = "https://www.blackcardriver.cn/server"
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
  //upload goods message to server
  UploadGoods(goods:string){
    var postdata = {goodsdata:goods};
    var url = this.addr+"/upload/goods";
    return this.http.post<string>(
      url,postdata).pipe();
  }
  //upload head-img of goods to server and receive an imgurl
  UploadCover(username:string , img:any){
    var postdata = new FormData();
    postdata.append("name", username);
    postdata.append("file",img)
    var url = this.addr + "/upload/cover"; 
    return this.http.post<string>(
      url,postdata
    ).pipe();
  }     
 //upload head-img of user to server and receive an imgurl
 UploadHeadImg(username:string , img:any){
    var postdata = new FormData();
    postdata.append("name", username);
    postdata.append("file",img)
    var url = this.addr + "/upload/headimg"; 
    return this.http.post<string>(
      url,postdata
    ).pipe();
  }

  //upload goods describe to server host used by upload goods page
  UploadGoodsData(data:UploadGoods){
    var url = this.addr + "/upload/upload/goodsdata"; 
    return this.http.post<number>(url,data).pipe();
  }
  //get usermsg in chgmymsg page
  Getmymsg(id:string){
    var url = this.addr+"/getmsg/usermsg?id="+id;
    return this.http.get<PersonalBase>(url).pipe();
  }
  //upload and updata base message of user
  UploadMyBaseMsg(data:PersonalBase){
    var url = this.addr + "/updata/mymessage/basemsg"; 
    return this.http.post<number>(url,data).pipe();
  }
  //upload and updata base message of user
  UploadContactMsg(data:PersonalBase){
      var url = this.addr + "/updata/mymessage/contactmsg"; 
      return this.http.post<number>(url,data).pipe();
  }
  //get message of personal in pereesonal page
  GetMyMsg(userid:string, key:string, tag:string){
      var url = this.addr + "/getmsg/personal/mymessage"; 
      var data = {tag:tag, id:userid, key:key};
      return this.http.post<any>(url,data).pipe(); 
  }
  //get message of personal2 page
  GetOtherMsg(userid:string){
    var url = this.addr+"/getmsg/othermsg?id="+userid;
    return this.http.get<PersonalExpend>(url).pipe();
  }
  //login function used in naving
  Login(data:account2){
      var url = this.addr+"/signin";
      return this.http.post<number>(url,data).pipe();
  }
  //send base message to server to conirm 
  ConfirmMsg(data:account1){
    var url = this.addr + "/register/confirmmsg";
    return this.http.post<number>(url,data).pipe();
  }
  //send confirm code to the server and receive the state
  ConfirmCode(data :account1){
    var url = this.addr + "/regeister/confirmcode";
    return this.http.post<number>(url,data).pipe();
  }
  
 

}
