import { Component, OnInit } from '@angular/core';
// Property 'collapse' does not exist on type 'JQuery<HTMLElement>'....
import * as bootstrap from 'bootstrap';
// import * as $ from 'jquery';
declare var $ :any; 

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
