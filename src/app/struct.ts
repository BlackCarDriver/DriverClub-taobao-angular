//商品显示的基本信息，见首页封面
export class HomePageGoods{
    imgurl:string="";
    owner:string="";
    date:string ="";
    title:string ="";
    price:number = 0;
    goodsid:number=0;
    gname:string="";
}
//显示在首页的商品子分类，分类名和商品数量
export class GoodSubType{
    name:string="";
    num: number=0;
}
//显示在首页的商品主分类
export class GoodsType{
    typename :string = "";
    list:GoodSubType[];
}
//商品状况，包括观看数，收藏数等
export class GoodsState{
    see:number =0;
    like:number =0;
    collect:number =0;
    talk:number=0;
}