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
    //hide or show the short-msg when click the owner name
    $("#user-toggle").click(function(){
      $("#shortmsg").dropdown('toggle');
    })
  }



  //show sing/regist box when click singin/reginst
  showsinginbox(){
    $("#exampleModal").modal('show');
  }

}
