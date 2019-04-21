import { Component, OnInit, Testability } from '@angular/core';
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
//regex of password
var passwordreg = /^[a-zA-Z._0-9]{6,20}$/;
//the regex of comfirm code
var codereg = /^^[0-9]{6}$/;

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
    this.checkinput();
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
      if(result==1){
        $("#codebox").removeClass("hidden");
        $("#registerbtn").removeClass("disablebtn");
        $("#registerbtn").addClass("loginbutton");
        $("#registerbtn").attr("disabled",false);
      }
    });
  }

  //send the confirm code and register message to the server 
  confirmcode(){
    this.data1.code = $("#regcode").val();
    this.server.ConfirmCode(this.data1).subscribe(result=>{
      console.log(result);
      if(result==1){
          var code = $("#regcode").val();
          if(codereg.test(code)==false){
            alert("请输入正确的验证码！");
          }else{
            alert("注册成功！");
            $(".modal-body  a[href='#home']").tab("show");
          }
      }
    });
  }
//check the intput box content in login 
//and register part after it have change
 checkinput(){
    //input of uesrname in register
    $("#regname").change(function(){
      if(namereg.test( $("#regname").val())==false){
        $("#regnamew").html("* 不能包含空格，符号，长度范围 2~15");
      }else  $("#regnamew").html("");
    });
  //input of first password in register
  $("#regpasw1").change(function(){
    if( passwordreg.test( $("#regpasw1").val() )==false ){
      $("#regpasw1w").html("* 密码应又6~20个字母或数字或._组成");
    }else  $("#regpasw1w").html("");
  });
  //input of second password in register
  $("#regpasw2").change(function(){
    if( $("#regpasw1").val() != $("#regpasw2").val()){
      $("#regpasw2w").html("* 两个密码不一致");
    }else  $("#regpasw2w").html("");
  });
  //input of email in register 
  $("#regemail").change(function(){
    if( emailreg.test($("#regemail").val())==false ){
      $("#regemailw").html("* 邮箱格式不正确");
    }else  $("#regemailw").html("");
  });
  //input of uesrname in login
  $("#loginname").change(function(){
    if(namereg.test( $("#loginname").val())==false){
      $("#loginnamew").html("* 不能包含空格，符号，长度范围 2~15");
    }else  $("#loginnamew").html("");
  });
  //input of password in login 
  $("#loginpassword").change(function(){
    if( passwordreg.test( $("#loginpassword").val())==false ){
      $("#loginpasswordw").html("* 密码应又6~20个字母或数字或._组成");
    }else  $("#loginpasswordw").html("");
  });
}

}

