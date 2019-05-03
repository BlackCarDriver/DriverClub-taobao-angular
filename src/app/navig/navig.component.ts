import { Component, OnInit, Testability } from '@angular/core';
import { ServerService } from '../server.service';
import {  account1, account2} from '../struct';
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
const codereg = /^^[0-9]{6}$/;
// the return state 
let worng     = -1;
let	scuess    = 1;
let	enable    = 2;
let	disable   = -2;
let unknowerr = -3;
let repectname  = -20;
let repectemail = -30;
let othererror  = -99
var code1 = "abcdefghijklmnopqrstuvwsyzABCDEFGHIJKLMNOPQRSTUVWSYZ_.0123456789@";
var code2 = "!w@EeR#TrY$UtI%OyP^AuSD&FiG*HoJ(KpL)XaV_BsN+Md=f-g{hjnm};Wk?l>zx<c,vb";

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
    // hide or show the short-msg when click the owner name
    $("#user-toggle").click(function(){
      $("#shortmsg").dropdown('toggle');
    })
    this.checkinput();
    this.getcookie();
    this.setstate();
  }
  // show sing/regist box when click singin/reginst
  showsinginbox(){
    $("#exampleModal").modal('show');
  }
  // check and send username and userpassword to server
  loging(){
    this.data2.name = $("#loginname").val();
    this.data2.password = $("#loginpassword").val();
    this.server.Login(this.data2).subscribe(result=>{
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
  //check the check box and choose to set username and password in cookie
  setcookie(){
      if($("#remember").is(':checked')==false){
         //erase the cookie if checkbox value is false 
        document.cookie = "drivername= ";
        document.cookie = "driverpasw= ";
        return;
      }
      var Days = 10;  
      var exp = new Date();
      var ck = $("#loginname").val()+"@"+$("#loginpassword").val();
      var nap = this.encryption(ck);  
      var un = this.encryption($("#loginname").val());
     // console.log("set " +  ck + " into " + ck2);
      exp.setTime(exp.getTime() + Days*24*3600*1000);  
      document.cookie = "BCDCNCK=" + nap + ";expires=" +exp.toUTCString();
      document.cookie = "driverlei=" + un + ";expires=" +exp.toUTCString();
  }
 
//find username and password in the cookie and push the nin input box
getcookie(){
    //console.log(document.cookie);
    var ck = this.getCookie("BCDCNCK")
    var cks = this.decode(ck);
   // console.log("reset " +  cks + " into " + ckss);
    var name = cks.split("@")[0]
    var psw = cks.split("@")[1]
    $("#loginname").val(name);
    $("#loginpassword").val(psw);
   // console.log(name+"   "+psw);
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
//use to make the cookie cant be undestant directly
encryption(code : string){
  var c=String.fromCharCode(code.charCodeAt(0)+code.length);
 for(var i=1;i<code.length;i++){      
   c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
 }   
 return escape(c);
}
//restore the string that after encryption
decode(code : string ){
  code=unescape(code);      
 var c=String.fromCharCode(code.charCodeAt(0)-code.length);      
 for(var i=1;i<code.length;i++){      
  c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));      
 }      
 return c;  
}
//take username from cookie
getusername(){
  var name = this.getCookie("driverlei")
  if (name=="")return "";
  name = this.decode(name);
  return name;
}

//get cookie by name
getCookie(name:string){ 
  var strCookie=document.cookie; 
  var arrCookie=strCookie.split("; "); 
  for(var i=0;i<arrCookie.length;i++){ 
    var arr=arrCookie[i].split("="); 
    if(arr[0]==name)return arr[1]; 
  }
  return ""; 
}

//if user have login then hide the login box, and show the user message box
setstate(){
  var name = this.getusername();
  if(name != ""){
    $("#singin").addClass("hidden");
    $("#userbox").removeClass("hidden");
  }else{
    $("#userbox").addClass("hidden");
    $("#singin").removeClass("hidden");
  }
}

seecookie(){
  this.setcookie();
  this.getcookie();
}


}

