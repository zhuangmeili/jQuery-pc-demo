/**
 * Ajax请求
 * @param url
 * @param divId
 */
function moduleRequest(var1,var2){
  $("#"+var2).load(var1+"&t="+Date.parse(new Date()));
}

/*登录退出*/
function tologinOut(cookieDomain){
  //domainHref = window.location.host;
  //window.location.href="http://"+domainHref+ "/login/loginOut?service=" + window.location.href;
  window.location.href="/login/loginOut?service=" + window.location.href;
}
if(typeof($d) == "undefined")
{
    var $d = function(id){return document.getElementById(id);}
}

/********************************搜索  总站头部航******************************/
function loadTopSearch(name,siteId){
    var arrItems = new Array();
    arrItems[0] = new Array("供应",true,"请输入您感兴趣的内容","/Supply/l","supply");
    arrItems[1] = new Array("求购",true,"请输入您感兴趣的内容","/Buy/l","buy","Buy/Detail");
    arrItems[2] = new Array("公司",true,"请输入您感兴趣的内容","/Corporation/l","corporation");
    arrItems[3] = new Array("招商",true,"请输入您感兴趣的内容","/Information/l","information");
    arrItems[4] = new Array("展会",false,"请输入您感兴趣的内容","/Exhibition/List","exhibit");
    arrItems[5] = new Array("行情",false,"请输入您感兴趣的内容","","market");
    arrItems[6] = new Array("社区",false,"请输入您感兴趣的内容","http://bbs.99114.com/","bbs");
    arrItems[7] = new Array("B2B",false,"请输入您感兴趣的内容","/Tool/List.shtml","tool");
    arrItems[8] = new Array("进店网",false,"请输入您感兴趣的内容","http://www.jindian.com.cn/","jindian");
 //   arrItems[9] = new Array("资讯",false,"请输入您感兴趣的内容","/Article4/List","article4");
//    arrItems[10] = new Array("资讯",false,"请输入您感兴趣的内容","/Article3/List","article3");
 //   arrItems[11] = new Array("资讯",false,"请输入您感兴趣的内容","/Article2/List","article2");
 //   arrItems[12] = new Array("资讯",false,"请输入您感兴趣的内容","/Article1/List","article1");
 //   arrItems[13] = new Array("资讯",false,"请输入您感兴趣的内容","/Article/List","article"); 
    this.name = name;
    this.txtObj = null;/*搜索输入框*/
    this.btnObj =null ;/*搜索按钮*/
    this.lmObj=null;//初始化联盟搜按钮
    this.currentIndex = 0;/*搜索选项*/
    this.tabDiv = null;
    this.key="";
    this.isChild=false;
    this.isTabSearch =false;
    this.siteId=siteId;//siteId站点ID 可选参数

    this.arrItem = arrItems;/*选项数组*/
}
/*  
JavaScript的Cookie类  
 注：js设定cookie的时间是以毫秒为单位  
*/  
  function jsCookie(){   
    var COOKIE_LIFE ={year:31536000,month:2592000,week:604800,day:86400,hour:3600,browser:0}   
    this.expires = 'browser';   
    this.path = null;   
    this.domain = null;   
    this.get=function(fieldName){       
  
        var regexp = window.eval("/"+fieldName+"=([\\w%,]+)(|;)/");   
        var result = document.cookie.match(regexp);   
        return (result?unescape(result[1]):"");   
    }       
    this.set=function(fieldName,fieldValue){   
  
        var cookie_list;   
        cookie_list = fieldName+"="+escape(fieldValue);           
        cookie_list += setExpires(this.expires);   
        cookie_list += setPath(this.path);   
        cookie_list += setDomain(this.domain);   
        document.cookie = cookie_list;   
    }   
    function setExpires(expires){   
  
        var tm=0;   
          if(typeof(expires)=='string'){   
            if(!COOKIE_LIFE[expires]) return "";       
            tm = COOKIE_LIFE[expires]*1000;           
        }else if(typeof(expires)=='number'){               
            tm = expires*1000;   
        }else{return "";}   
        expires = ";expires="+new Date(new Date().getTime()+ tm).toUTCString();   
        return expires;   
    }   
    function setPath(path){   
        if(!path) return "";   
        return (";path="+path);   
    }   
    function setDomain(domain){   
        if(!domain) return "";   
        return (";domain="+domain);   
    }   
}
ckn = new jsCookie();   
ckn.expires = 'hour';   
ckn.path ="/";
ckn.domain = "99114.com";

String.prototype.trim = function()
{
    var s = this;
    return s.replace(/(^\s*)|(\s*$)/g, "");
}

loadTopSearch.prototype.doSearch=function()
{
   if(!this.isTabSearch)
      this.getIndex();
   if(this.arrItem[this.currentIndex][2]==trim(this.txtObj.value) || trim(this.txtObj.value)=='' || trim(this.txtObj.value)=='请输入产品名称')
   {
        //总站搜索供应，不输入关键字跳转到大类别页
        if(this.siteId&&(this.currentIndex==0))
        {
            window.location.href="/Category/Category_0_0.shtml";
            return;
        }
        else
        {
            alert("请输入您感兴趣的关键词！");
            this.txtObj.select();
            return;
        }
   }
   if(!(/^[\u4e00-\u9fa5\da-zA-Z\-\_]+$/.test(this.txtObj.value))){
     alert("请正确输入关键词！");
     this.txtObj.select();
       return;
   }
   this.key = this.txtObj.value;
  
    var productTypeUrl ="";
    var type = document.getElementsByName("TopSearchradioProductType");
    for(var i=0 ; i < type.length; i ++)
    {
        if(type[i].checked==true)
        {
            productTypeUrl =  "&t=" + type[i].value;
            break;
        }
    }
    
//   ckn.set("searchKey",this.key);
 
   //站内搜索Url
  /* var searchUrl = this.arrItem[this.currentIndex][3] +"/"+ encodeURIComponent(encodeURIComponent(this.key,"utf-8"),"utf-8") +
   "_"+ document.getElementById("siteID").value + productTypeUrl+".html";*/
  if(this.arrItem[this.currentIndex][0] == "供应" && this.arrItem[this.currentIndex][1]){
    var searchUrl = this.arrItem[this.currentIndex][3] +"_"+ this.key+
    "_"+ document.getElementById("siteID").value + productTypeUrl +"_0_0_0_0_0_0_1.html";
  } else if(this.arrItem[this.currentIndex][0] == "求购" && this.arrItem[this.currentIndex][1]){
    var searchUrl = this.arrItem[this.currentIndex][3] +"_"+ this.key+
      "_"+ document.getElementById("siteID").value + productTypeUrl +"_0_0_0_0_0_0_1.html";
  } else if(this.arrItem[this.currentIndex][0] == "公司" && this.arrItem[this.currentIndex][1]){
    var searchUrl = this.arrItem[this.currentIndex][3] +"_"+ this.key+
      "_"+ document.getElementById("siteID").value + productTypeUrl +"_0_0_1.html";
  } else if(this.arrItem[this.currentIndex][0] == "招商" && this.arrItem[this.currentIndex][1]){
    var searchUrl = this.arrItem[this.currentIndex][3] +"_"+ this.key+
      "_"+ document.getElementById("siteID").value + productTypeUrl +"_0_0_0_0_0_1.html";
  } else {
    var searchUrl = "";
  }
   
  //添加mode参数
  if(getValue("mode")!='') 
  searchUrl=searchUrl+"&mode="+getValue("mode");
 
   window.location.href=searchUrl;
  
}
//搜索dosearch2
loadTopSearch.prototype.lmDoSearch=function()
{
   if(!this.isTabSearch)
      this.getIndex();
   if(this.arrItem[this.currentIndex][2]==trim(this.txtObj.value) || trim(this.txtObj.value)=='' || trim(this.txtObj.value)=='请输入产品名称')
   {
        //总站搜索供应，不输入关键字跳转到大类别页
        if(this.siteId&&(this.currentIndex==0))
        {
            window.location.href="/Category/Category_0_0.shtml";
            return;
        }
        else
        {
            alert("请输入您感兴趣的关键词！");
            this.txtObj.select();
            return;
        }
   }
   if(!(/^[\u4e00-\u9fa5\da-zA-Z\-\_]+$/.test(this.txtObj.value))){
     alert("请正确输入关键词！");
     this.txtObj.select();
       return;
   }
   this.key = this.txtObj.value;
  
    var productTypeUrl ="";
    var type = document.getElementsByName("TopSearchradioProductType");
    for(var i=0 ; i < type.length; i ++)
    {
        if(type[i].checked==true)
        {
            productTypeUrl =  "&t=" + type[i].value;
            break;
        }
    }
    
   //ckn.set("searchKey",this.key);
  
   //联盟搜索url
   if(this.arrItem[this.currentIndex][0] == "供应" && this.arrItem[this.currentIndex][1]){
     var lmsearchUrl =this.arrItem[this.currentIndex][3] +"_"+ this.key+
    "_0" + productTypeUrl +"_0_0_0_0_0_0_1.html";
   } else if(this.arrItem[this.currentIndex][0] == "求购" && this.arrItem[this.currentIndex][1]){
     var lmsearchUrl =this.arrItem[this.currentIndex][3] +"_"+ this.key+
       "_0" + productTypeUrl +"_0_0_0_0_0_0_1.html";
   } else if(this.arrItem[this.currentIndex][0] == "公司" && this.arrItem[this.currentIndex][1]){
     var lmsearchUrl =this.arrItem[this.currentIndex][3] +"_"+ this.key+
       "_0" + productTypeUrl +"_0_0_1.html";
   } else if(this.arrItem[this.currentIndex][0] == "招商" && this.arrItem[this.currentIndex][1]){
     var lmsearchUrl =this.arrItem[this.currentIndex][3] +"_"+ this.key+
       "_0"+ productTypeUrl +"_0_0_0_0_0_1.html";
   } else {
     var lmsearchUrl ="";
   }
  //添加mode参数
  if(getValue("mode")!='') 
  //searchUrl=searchUrl+"&mode="+getValue("mode");
  lmsearchUrl=lmsearchUrl+"&mode="+getValue("mode");
  //总站并且为报价搜索
   window.location.href=lmsearchUrl;
}
//end
loadTopSearch.prototype.getIndex=function()
{
    this.currentIndex=0;
    for(var i = 0 ; i < this.arrItem.length ; i++)
    {
        for(var j = 4; j < this.arrItem[i].length ; j++)
        {
            if(window.location.pathname.toUpperCase().indexOf(this.arrItem[i][j].toUpperCase())!=-1)
            {
                this.currentIndex = i;
                return;
            }           
        }
    }
}
 
loadTopSearch.prototype.setIndex=function(index,className)
{   
    this.currentIndex = index;
    if(!this.tabDiv)
    {
        alert("加载导航搜索栏必须要有一个容器!");
        return;
    }
    
    var sTemp="",sCss="",sSplit="";
    for(var i=0 ; i < this.arrItem.length ; i++)
    {
        if(!this.arrItem[i][1])
            continue;
        if(i == index)
        {
            sCss=className||"on";
        }
        else
        {
            sCss="";
        }
        if(className)
        {

                sTemp += "<li class=\""+ sCss+"\"><a href=\"javaScript://\" onclick=\"javaScript:"+ this.name +".setIndex("+ i +",'"+className+"');" +"\">"+this.arrItem[i][0]+"</a></li>" ;
        }
        else
        sTemp += "<li class=\""+ sCss+"\"><a href=\"javaScript://\" onclick=\"javaScript:"+ this.name +".setIndex("+ i +");" +"\">"+this.arrItem[i][0]+"</a></li>" ;
    }
    this.btnObj.value =  "找" + this.arrItem[index][0];
    this.tabDiv.innerHTML = sTemp;
  $(".common-searchbox-tagselect").html(this.arrItem[index][0]);
}
loadTopSearch.prototype.createHTML=function()
{
    this.getIndex();
    if(arguments.length>0&&arguments[0])
     this.setIndex(this.currentIndex,arguments[0]);
    else
     this.setIndex(this.currentIndex);
}

loadTopSearch.prototype.initEvents=function()
{
    /*初始化控件，添加事件*/
    var currentObj = this;
    this.getIndex();
    if(this.txtObj)
    {
    
        var key = this.arrItem[this.currentIndex][2];
        var temK = (window.location.href).split("_").length>3?decodeURI((window.location.href).split("_")[1]):"";
        if(temK==0){
          temK=null;
        }
        var tempKey = temK || getValue("siteID") || ckn.get("searchKey");

        if(this.isChild)
            key ="请输入产品名称";
        if(trim(tempKey)=="" || trim(tempKey)== key)
            this.txtObj.value = key;
        else
            this.txtObj.value = trim(tempKey);
            
        this.txtObj.onkeypress=function(e){
            var iKeyCode = window.event?event.keyCode:e.which;
            if(iKeyCode==13)
            {
               currentObj.doSearch();
               return false;
            }
            return true;
        }
        this.txtObj.onfocus=function(e)
        {
           this.select();
        }
    }
    if(this.btnObj)
    {
        this.btnObj.onclick=function(){
          currentObj.doSearch();
            return false;
            }
    }
    //触发联盟搜onclick事件
    if(this.lmObj)
    { 
        this.lmObj.onclick=function(){
          currentObj.lmDoSearch();
            return false;
            }
    }
    if(this.imgObj)
    { 
        this.imgObj.onclick=function(){
            currentObj.doSearch();
            return false;
            }
    }
}

/*去空格*/
function trim(s)
{
    if(s==null)
        return "";
    return s.replace(/(^\s*)|(\s*$)/g, "");
}
/********************************************************************************************/
function getValue(sNameKey)
{
    sNameKey = sNameKey.toUpperCase()
    var arrPara = new Array();
    arrPara = window.location.href.toUpperCase().split("?");
        if(arrPara.length >=2)
        {
           arrPara = arrPara[1].split("&");
           for(var i=0  ; i < arrPara.length ; i++)
           {
                if(arrPara[i].indexOf("=")!=-1)
                {
                    if(arrPara[i].indexOf(sNameKey +"=")==0)
                    {
                    return arrPara[i].split("=")[1].toLowerCase();
                    }
                }
           }
        }
        return "";
}

/*导航li*/
$(function(){
  var $comwidth=$(".common-nav-con").width();
  var num=$('.common-nav-con li').length;
  var $liwidth=parseInt($comwidth/num);
  $('.common-nav-con li').width($liwidth) 
})
$(function(){
  var $comwidth=$(".common-nav-category-nav-con").width();
  var num=$('.common-nav-category-nav-con li').length;
  var $liwidth=parseInt($comwidth/num);
  $('.common-nav-category-nav-con li').width($liwidth)  
})
/*导航li--end*/

/*在线客服*/
$(function(){
     $(".common-service-box-left").hover(function(){
      $(".common-service-box").css("display","block");
      $(".common-service").css("width","200px");
     });
  $(".common-service").hover(function(){
      $(".common-service-box").css("display","block");
     },function(){
       $(".common-service-box").css("display","none");
      $(".common-service").css("width","33px");
  });  
})
/*返回顶部*/
$(document).ready(function(){
  $('<a class="retop">返回顶部</a>').appendTo('body').fadeOut().click(function(){
    $(document).scrollTop(0);
    $(this).fadeOut();
    return false
  });
  var $retop = $('.retop');
  $(window).scroll(function(){
    if ($(document).scrollTop() === 0){
      $retop.fadeOut()
    }else{
      $retop.fadeIn()
    }
    if ($.browser.msie && $.browser.version == 6.0 && $(document).scrollTop() !== 0){
      $retop.css({ 'opacity': 1 })
    } 
  });
});

//公告切换
function comTab1(tabTit,tabName){
  $(tabTit).hover(function(){
    $(this).addClass(tabName).siblings().removeClass(tabName);
    var index=$(this).index();
    $(this).parent().parent().siblings().children().eq(index).show().siblings().hide();
  })    
}








//对加减增量修改商品数量
function updateProductNum(productId,type){
  var parm= /^[0-9]*[0-9][0-9]*$/;
  var increment = 0;
  var updateCount = 0;
  var productNum = $("#productNum_"+productId).val();
  var num = $("#num_"+productId).val();
  var max = parseInt($("#productNum_"+productId).attr("max"));
  var min = parseInt($("#productNum_"+productId).attr("min"));
  
  if(!parm.test(productNum)){
    alert("请输入正整数");
    $("#productNum_"+productId).val($("#num_"+productId).val());
    return;
  }

  if(type == 1){  //直接修改数量
    updateCount = $("#productNum_"+productId).val();
    if(updateCount == 0){
      alert("商品数量不能为0！");
      $("#productNum_"+productId).val($("#num_"+productId).val());
      return;
    }else if(updateCount < min){
      alert("商品数量不能小于最小购买数量！");
      $("#productNum_"+productId).val($("#num_"+productId).val());
      return;
    }else if(updateCount > max){
      alert("商品数量不能大于最大购买数量！");
      $("#productNum_"+productId).val($("#num_"+productId).val());
      return;
    }
  }else if(type == 2){  //增加数量数量
    var addNum = $("#productNum_"+productId).val();
    if(parseInt(addNum) + 1 > max){
      alert("商品数量不能大于最大购买数量！");
      $("#productNum_"+productId).val($("#num_"+productId).val());
      return;
    }
    $("#productNum_"+productId).val(parseInt(addNum) + 1);
    increment = 1;
  }else if(type == 3){  //减掉商品数量
    var subNum = $("#productNum_"+productId).val();
    if(subNum == 1){
      alert("商品数量不能为0！");
      return;
    }else if(parseInt(subNum) - 1 < min){
      alert("商品数量不能小于最小购买数量！");
      $("#productNum_"+productId).val($("#num_"+productId).val());
      return;
    }
    $("#productNum_"+productId).val(parseInt(subNum) - 1);
    increment = -1;
  }
  
  if($("#productNum_"+productId).val() == $("#num_"+productId).val()){
    return;
  }

  $.ajax({  
    type: "post",
    url:"/cart/update",
    data:{"id":productId,"increment":increment,"updateCount":updateCount},
    dataType:"json",
    success: function(data){
      if(data.status == -1){  //库存不足
        $("#productNum_"+productId).val($("#num_"+productId).val());

        alert("库存不足");
      }else if(data.status == 0){ //修改失败
        $("#productNum_"+productId).val($("#num_"+productId).val());
        alert("修改失败");
      }else if(data.status == 1){ //修改成功
        $("#num_"+productId).val($("#productNum_"+productId).val());
      }else if(data.status == -2){//商品小于最小订货量
        $("#productNum_"+productId).val($("#num_"+productId).val());
        alert("商品小于最小订货量"); 
      }
    }
  });
}

//删除购物车商品
function delProduct(productId){
  $.ajax({  
    type: "post",
    async:false,
    url:"/cart/delete",
    data:{"id":productId},
    dataType:"json",
    success: function(data){
      searchCartProduct();
      if(data.status == 0){
        $("#products").children().remove("#"+productId);
      }
    }
  });
} 
//足迹

//足迹查询
function queryFootPrint(size){ 
var memberTag=$.cookie('MEMBERTGC');
var memberName='';
if(memberTag!=null&&memberTag!=''){
  memberName=$.cookie(memberTag);
}
var host = window.location.host;
$("#footprintCon").attr("src","http://yyzx.99114.com/footPrint/getFootPrintList?siteId="+$("#siteID").val()+"&size="+size+"&memberName="+memberName+"&host="+host);
};
    
//添加足迹

var obj1;
function jumpDetail(memberId,supplyId){
  //obj1=obj;
  var size=4;
  var siteId=$("#siteID").val();
  var memberTag=$.cookie('MEMBERTGC');
  var memberName='';
  if(memberTag!=null&&memberTag!=''){
    memberName=$.cookie(memberTag);
  }   
  $(".menu-title").removeClass("selected");
  $(".vbarCon").hide();
  var str="s_"+memberId+"_"+supplyId+".html";
  
  var url="http://yyzx.99114.com/footPrint/footPrintAdd?siteId="+siteId+"&supplyId="+supplyId+"&memberName="+memberName;  
  $.ajax({
     url:url,
     dataType:'jsonp',
     processData: false, 
     type:'get',
     jsonpCallback:"result",
     success:function(data){
      // var str="s_"+memberId+"_"+supplyId+".html";
      // alert($(this).attr("class"));
      //$(obj1).attr("href",str);
      // window.open(str);
       //newTab.location.href=str;
     },
     error:function(XMLHttpRequest, textStatus, errorThrown) {
      // var str="s_"+memberId+"_"+supplyId+".html";
      // $(obj1).attr("href",str);
      // window.open(str);
      // newTab.location.href=str;
    }});
}
