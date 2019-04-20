import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import {  account1, account2} from '../struct';
// Property 'collapse' does not exist on type 'JQuery<HTMLElement>'....
import * as bootstrap from 'bootstrap';
// import * as $ from 'jquery';
declare var $ :any; 

//regex of email
var emailreg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/ ;
//regex of account name 
var namereg = /^[\u4e00-\u9fa5_a-zA-Z0-9]{2,15}$/;

@Component({
  selector: 'app-navig',
  templateUrl: './navig.component.html',
  styleUrls: ['./navig.component.css']
})
export class NavigComponent implements OnInit {
  data1 = new account1();
  data2 = new account2();
  constructor(
    private server : ServerService
  ) { }

  ngOnInit() {
    //hide or show the short-msg when click the owner name
    $("#user-toggle").click(function(){
      $("#shortmsg").dropdown('toggle');
    })
  }
  //show sing/regist box when click singin/reginst
  showsinginbox(){
    $("#exampleModal").modal('show');
  }
  //check and send username and userpassword to server
  loging(){
    this.data2.name = $("#loginname").val();
    //console.log(namereg.test(this.data2.name));
    this.data2.password = $("#loginpassword").val();
    this.server.Login(this.data2).subscribe(result=>{
        alert(result);
    })
  }
  //Send the Base message to Server receive the state, if the
  //message is ok, then should send the confirm code next
  confirm(){
    this.data1.name = $("#regname").val();
    this.data1.password = $("#regpasw1").val();
    this.data1.email = $("#regemail").val();
    this.server.ConfirmMsg(this.data1).subscribe(result=>{
      console.log(result);
    });
  }

  //send the confirm to the server 
  confirmcode(){
    this.data1.code = $("#regcode").val();
    this.server.ConfirmCode(this.data1).subscribe(result=>{
      console.log(result);
    });
  }


}

