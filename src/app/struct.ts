//商品显示的基本信息，见首页封面
export class HomePageGoods{
    imgurl:string="https://i03piccdn.sogoucdn.com/5b84e0a94f71278f";
    owner:string="找不到数据...";
    date:string ="2019-1-1";
    title:string ="找不到数据...";
    price:number = 0;
    goodsid:number=0;
    gname:string="找不到数据...";
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