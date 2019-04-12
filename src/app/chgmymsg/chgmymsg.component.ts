import { Component, OnInit } from '@angular/core';
import {ServerService} from '../server.service';
import {PersonalBase} from '../struct';

declare var $: any;


@Component({
  selector: 'app-chgmymsg',
  templateUrl: './chgmymsg.component.html',
  styleUrls: ['./chgmymsg.component.css']
})
export class ChgmymsgComponent implements OnInit {

  //绑定到表单的数据的默认值
  private usename = "Name";
  private usersex = "Sexal";
  private sign = "Welcome to BlackCarDriver.cn";
  private grade = "2019";
  private email = "blackcardriver@123.com";
  private qq = "666";
  private phome = "666";
  //上传到服务器和请求获取的数据
  private maindata = new PersonalBase();
  
  constructor(private server : ServerService) {}

  ngOnInit() {
    $(document).ready(function(){
    //解决下拉菜单按钮不能下拉
      $(".dropdown-toggle").on('click',function(){
          $('.dropdown-toggle').dropdown();
      });

    })//document.read() over
  
  }

}
