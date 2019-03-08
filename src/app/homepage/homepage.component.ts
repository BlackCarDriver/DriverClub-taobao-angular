import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  collapse(id:string){
    $(".collapse").collapse('hide');
    $(id).collapse('show');
  }
  showsinginbox(){
    $("#exampleModal").modal('show');
  }
}
