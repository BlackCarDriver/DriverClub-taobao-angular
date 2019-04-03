import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-uploadgoods',
  templateUrl: './uploadgoods.component.html',
  styleUrls: ['./uploadgoods.component.css']
})
export class UploadgoodsComponent implements OnInit {

  constructor() { }

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
  }

  test(){
    var markupStr = $('#summernote').summernote('code');
    console.log(markupStr);
  }

}
