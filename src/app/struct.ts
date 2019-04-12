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
//长传商品页面上传的信息
export class UploadGoods{
    username: string="";
    title:string="";
    date :string = "";
    price:number=0;
    imgurl:string="";
    type:string="";
    tag:string="";
    usenewtag:boolean = false;
    newtagname:string = "";
    text:string="";
}
//个人信息设置页上传的信息数据
export class PersonalBase{
    username:string= "";
    usersex:string = "";
    sign:string = "";
    grade:string="2019";
    college:string ="";
    email:string = "";
    qq:string ="";
    phone:string="";
}