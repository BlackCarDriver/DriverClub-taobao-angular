import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import {  HomePageGoods } from '../struct';

// Property 'collapse' does not exist on type 'JQuery<HTMLElement>'....
// import * as bootstrap from 'bootstrap';
declare let $ : any;
// import * as $ from 'jquery';
// declare var $ :any; 


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {

  private goodsarray = HomePageGoods[100];  

  constructor(
    private server : ServerService
  ) { }

  ngOnInit() {
    this.GetGoods();
  }


  GetGoods(){
    this.server.GetHomePageGoods("haha",11).subscribe(
      result => {
          this.goodsarray = result;
          console.log(this.goodsarray);
          for (var i =0;i<3;i++) console.log(this.goodsarray[i].owner);
      })
  }


    
  collapse(id:string){
    $('.collapse').collapse('hide');
    $(id).collapse('show');
  }

  showsinginbox(){
    $("#exampleModal").modal('show');
  }
  

}
