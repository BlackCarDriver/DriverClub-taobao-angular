import { Component, OnInit } from '@angular/core';
// Property 'collapse' does not exist on type 'JQuery<HTMLElement>'....
import * as bootstrap from 'bootstrap';
// import * as $ from 'jquery';
declare var $ :any; 

@Component({
  selector: 'app-navig',
  templateUrl: './navig.component.html',
  styleUrls: ['./navig.component.css']
})
export class NavigComponent implements OnInit {

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
