import { Component, OnInit } from '@angular/core';
import {HomePageGoods,GoodsState } from'../struct';
import{ServerService} from'../server.service';

@Component({
  selector: 'app-goodspage',
  templateUrl: './goodspage.component.html',
  styleUrls: ['./goodspage.component.css']
})
export class GoodspageComponent implements OnInit {

  private data1 : HomePageGoods;
  private data2 : GoodsState;
  private data3 : string;

  constructor(private server : ServerService) { }
  ngOnInit() {
    this.getItPage(111);
  } 

  getItPage(id:number){
    this.server.GetGoodsDetail_1(id).subscribe(
      result=>{this.data1 = result;}
    )
    this.server.GetGoodsDetail_2(id).subscribe(
      result=>{this.data2 = result;}
    )
    this.server.GetGoodsDetail_3(id).subscribe(
      result=>{$("#text-targer").html(result);}
    )
  }

}
