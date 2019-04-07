import { Component, OnInit } from '@angular/core';
import {ServerService} from '../server.service';
import { headersToString } from 'selenium-webdriver/http';
declare var $: any;


@Component({
  selector: 'app-uploadgoods',
  templateUrl: './uploadgoods.component.html',
  styleUrls: ['./uploadgoods.component.css']
})


export class UploadgoodsComponent implements OnInit {
  
  headImgName = "未选择文件...";
  constructor(private server : ServerService) { }
  
  
  ngOnInit() {
    $('#summernote').summernote({
      placeholder: '<p><span style="font-size: 36px;">这里编辑你的商品展示页面</span></p>',
      tabsize: 2,
      minHeight: 300,
      toolbar: [
        ['fontname', ['fontname']], //字体系列                                 
        ['style', ['bold', 'italic', 'underline']], // 字体粗体、字体斜体、字体下划线、字体格式清除       
        ['fontsize', ['fontsize']], //字体大小                                
        ['color', ['color']], //字体颜色             
        ['style', ['style']],//样式
        ['para', ['paragraph']], //无序列表、有序列表、段落对齐方
        ['table',['table']], //插入表格    
        ['hr',['hr']],//插入水平线                             
        ['picture',['picture']], //插入图片               
      ],
    });
    //上传头像框改变后，获取文件名，判断文件大小，上传文件，获得imgurl
    $("#upload").change(function(evt){ 
      //如果文件为空 
      if($(this).val() == ''){ 
        return; 
      } 
    
     //判断文件大小
     var files = evt.currentTarget.files;
     var filesize = files[0].size;
     console.log(filesize);
     if(filesize>102400){
       alert("请上传100kb 以下的图片");
       return;
     }
     //判断文件类型，并获取文件名到页面
     var filename = $(this).val().replace(/.*(\/|\\)/, "");
     var pos = filename.lastIndexOf(".");
     var filetype = filename.substring(pos,filename.length)  //此处文件后缀名也可用数组方式获得str.split(".") 
     if (filetype.toLowerCase()!=".jpg" && filetype.toLowerCase()!=".png"){
      alert("请上传 png 或 jpg 格式的图片");
      return;
     }else{
      $("#filename").html(filename);
     }

     
    }) 
  }

  test(){
    var goodsdata = $('#summernote').summernote('code');
    this.server.UploadGoods(goodsdata).subscribe(
      ressult=>{console.log(ressult);}
    )
  }

  selectImg(){
    $("#upload").trigger("click");
  }
  
}
