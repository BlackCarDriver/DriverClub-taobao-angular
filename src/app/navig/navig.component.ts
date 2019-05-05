import { Component, OnInit, Testability } from '@angular/core';
import { ServerService } from '../server.service';
import {  account1, account2, UserShort} from '../struct';
// import { LocalStorage } from '../localstorge';
//  Property 'collapse' does not exist on type 'JQuery<HTMLElement>'....
import * as bootstrap from 'bootstrap';
//  import * as $ from 'jquery';
declare let $: any;

//  regex of email
const emailreg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/ ;
// regex of account name 
const namereg = /^[\u4e00-\u9fa5_a-zA-Z0-9]{2,15}$/;
// regex of password
const passwordreg = /^[a-zA-Z._0-9]{6,20}$/;
// the regex of comfirm code
const codereg = /^[0-9]{6}$/;
// the return state 
let worng     = -1;
let	scuess    = 1;
let	enable    = 2;
let	disable   = -2;
let unknowerr = -3;
let repectname  = -20;
let repectemail = -30;
let othererror  = -99


@Component({
  selector: 'app-navig',
  templateUrl: './navig.component.html',
  styleUrls: ['./navig.component.css']
})
export class NavigComponent implements OnInit {
  data1 = new account1();
  data2 = new account2();
  username = "";
  usermsg = new  UserShort();
  constructor(
    // private localdata: LocalStorage,
    private server : ServerService
  ) { }

  ngOnInit() {
    // hide or show the short-msg when click the owner name
    $("#user-toggle").click(function(){
      $("#shortmsg").dropdown('toggle');
    })
    this.checkinput();
    this.getloginmessage();
    this.setstate();
  }


//show sing/regist box when click singin/reginst
showsinginbox(){
    $("#exampleModal").modal('show');
}

// check and send username and userpassword to server
loging(){
    this.data2.name = $("#loginname").val();
    this.data2.password = $("#loginpassword").val();
    this.server.Login(this.data2).subscribe(result=>{
        console.log(result);
        if (result==enable) {
          alert("登录成功！")
          this.setcookie();
        }else if (result==disable){ 
          alert("密码或账户名错误！")
        }else if (result==worng){
          alert("你的浏览器貌似禁止了保存cookie,访问本站信息可能会出错！")
        }else{
          alert("发生未知错误,请稍后再试或反馈信息！")
        }
    })
}
//clear the cookie
logout(){
  if(confirm("你确定要清楚登录状态并退出此账号？")){
    document.cookie =  "BCDCNCK=";
    document.cookie = "driverlei=";
    window.location.reload();
  }
}
 //check the check box and choose to set username and password in cookie
setcookie(){
      if($("#remember").is(':checked')==false){
         //erase the cookie if checkbox value is false 
         document.cookie =  "BCDCNCK=";
        return;
      }
      var Days = 10;  //the time of days saving cookie
      var exp = new Date();
      var ck = $("#loginname").val()+"@"+$("#loginpassword").val();
      var nap = this.server.encryption(ck);  
      var un = this.server.encryption($("#loginname").val());
      exp.setTime(exp.getTime() + Days*24*3600*1000);  
      document.cookie = "BCDCNCK=" + nap + ";expires=" +exp.toUTCString();
      document.cookie = "driverlei=" + un + ";expires=" +exp.toUTCString();
}
 
//get username and password in the cookie and push the nin input box
getloginmessage(){
    var ck = this.server.getCookie("BCDCNCK")
    if(ck=="")return;
    var cks = this.server.decode(ck);
    var name = cks.split("@")[0]
    var psw = cks.split("@")[1]
    $("#loginname").val(name);
    $("#loginpassword").val(psw);
}

// Send the Base message of register to Server receive the state, if the
// message is ok, then should send the confirm code next
confirm(){
    $("#registerbtn").attr("disabled",true);
    if(this.checkRegister()==disable) return;
    this.data1.name = $("#regname").val();
    this.data1.password = $("#regpasw1").val();
    this.data1.email = $("#regemail").val();
    this.server.ConfirmMsg(this.data1).subscribe(result=>{
      console.log(result);
      if(result == enable){
        alert("验证码已发送至你的邮箱!");
        //forbid to change the input
        $("#regname").attr("disabled","disabled");	
        $("#regpasw1").attr("disabled","disabled");	
        $("#regpasw2").attr("disabled","disabled");	
        $("#regemail").attr("disabled","disabled");	
        //forbit to click get code for a while
        $("#codebox").removeClass("hidden");
        $("#registerbtn").removeClass("disablebtn");
        $("#registerbtn").addClass("loginbutton");
        $("#registerbtn").attr("disabled",false);
        $("#getcode").addClass("hidden");
        $("#getcode").html("重新获取");
        $("#getcode2").removeClass("hidden");
        //show the button again after a minue
        setTimeout(function () {
          $("#getcode2").addClass("hidden");
          $("#getcode").removeClass("hidden");
        }, 60000);
      }else if(result == repectname){
        alert("这个账号名已被使用,请换个试试!");
      }else if(result == repectemail){
        alert("这个邮箱已被注册,请换一个试试!")
      }else{
        alert("发生错误,错误码:"+result);
      }
    });
}

// send the confirm code and register message to the server 
confirmcode(){
    this.data1.code = $("#regcode").val();
    if(codereg.test(this.data1.code)==false){
      alert("请输入正确的验证码！");
      return;
    }
    this.server.ConfirmCode(this.data1).subscribe(result=>{
      if(result==scuess){ 
          alert("注册成功！");
          $(".modal-body  a[href='#home']").tab("show");
      }else if (result==disable){
          alert("验证码有误，请重新输入");
      }else{
          alert("尝试次数太多或验证码过期,请重新注册或获取注册码!");
      }
    });
}
// check the intput box content in login and register
// part autotily after it have been change
checkinput(){
    // input of uesrname in register
    $("#regname").change(function(){
      if(namereg.test( $("#regname").val())==false){
        $("#regnamew").html("* 不能包含空格，符号，长度范围 2~15");
      }else  $("#regnamew").html("");
    });
  // input of first password in register
  $("#regpasw1").change(function(){
    if( passwordreg.test( $("#regpasw1").val() )==false ){
      $("#regpasw1w").html("* 密码应又6~20个字母或数字或._组成");
    }else  $("#regpasw1w").html("");
  });
  // input of second password in register
  $("#regpasw2").change(function(){
    if( $("#regpasw1").val() != $("#regpasw2").val()){
      $("#regpasw2w").html("* 两个密码不一致");
    }else  $("#regpasw2w").html("");
  });
  // input of email in register 
  $("#regemail").change(function(){
    if( emailreg.test($("#regemail").val())==false ){
      $("#regemailw").html("* 邮箱格式不正确");
    }else  $("#regemailw").html("");
  });
  // input of uesrname in login
  $("#loginname").change(function(){
    if(namereg.test( $("#loginname").val())==false){
      $("#loginnamew").html("* 不能包含空格，符号，长度范围 2~15");
    }else  $("#loginnamew").html("");
  });
  // input of password in login 
  $("#loginpassword").change(function(){
    if( passwordreg.test( $("#loginpassword").val())==false ){
      $("#loginpasswordw").html("* 密码应又6~20个字母或数字或._组成");
    }else  $("#loginpasswordw").html("");
  });
}
// initiatly check the register input data before send to server
checkRegister(){
  let worngnum = 0;
  if(namereg.test( $("#regname").val())==false){
    $("#regnamew").html("* 不能包含空格，符号，长度范围 2~15");
    worngnum ++;
  }else  $("#regnamew").html("");

  if( passwordreg.test( $("#regpasw1").val() )==false ){
    $("#regpasw1w").html("* 密码应又6~20个字母或数字或._组成");
    worngnum ++;
  }else  $("#regpasw1w").html("");

  if( $("#regpasw1").val() != $("#regpasw2").val()){
    $("#regpasw2w").html("* 两个密码不一致");
    worngnum ++;
  }else  $("#regpasw2w").html("");

  if( emailreg.test($("#regemail").val())==false ){
    $("#regemailw").html("* 邮箱格式不正确");
    worngnum ++;
  }else  $("#regemailw").html("");

  return worngnum==0?enable:disable;
}
// initiatly checke the login input data before send to server 
checkSignin(){
  let worngnum = 0;
  if(namereg.test( $("#loginname").val())==false){
    $("#loginnamew").html("* 不能包含空格，符号，长度范围 2~15");
    worngnum ++;
  }else  $("#loginnamew").html("");

  if( passwordreg.test( $("#loginpassword").val())==false ){
    $("#loginpasswordw").html("* 密码应又6~20个字母或数字或._组成");
    worngnum ++;
  }else  $("#loginpasswordw").html("");
  return worngnum==0?enable:disable;
}

//load username from cookie if it is not empty then
//hide the login box, and show the user message box and require user short data
setstate(){
  this.username = this.server.Getusername();
  if(this.username != ""){
    $("#singin").addClass("hidden");
    $("#userbox").removeClass("hidden");
    this.getusershort()
  }else{
    $("#userbox").addClass("hidden");
    $("#singin").removeClass("hidden");
  }
}

//call after click forget password tmeply
seecookie(){
  this.setcookie();
  this.getloginmessage();
}

//get short message of user from server
getusershort(){
  if( this.server.checkTimeTag("dvurst")==false ){  
    this.server.GetUserShort(this.username).subscribe(result=>{
      this.usermsg=result;
      this.server.setLocalStorge("dvleus",this.usermsg);
      this.server.setTimeTag("dvurst",120);
    });
  }else{ 
    this.usermsg=this.server.getLocalStorge("dvleus");
  }
}



}

