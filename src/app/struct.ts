export class HomePageGoods{
    imgurl:string="";
    owner:string="";
    date:string ="";
    title:string ="";
    price:number = 0;
    goodsid:number=0;
}
export class GoodSubType{
    name:string="";
    num: number=0;
}
export class GoodsType{
    typename :string = "";
    list:GoodSubType[];
}
