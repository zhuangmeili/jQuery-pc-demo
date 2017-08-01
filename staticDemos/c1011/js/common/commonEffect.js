/**
 * Created by Administrator zhuang meili on 2016/8/4.
 * 页面常用的jQuery效果 请勿随意修改，如果要修改请前端负责人指派专人负责维护
 */

//----------  jQuery封装的方法  -----------------
;(function($){
    $.fn.extend({
        //模拟下拉需要配置class
        simulateSelect:function(){
            $(this).click(function(e){
                var oBoxChoose=$(this).find(".jQ_SelectUl");
                if(oBoxChoose.css("display")=="none"){
                    //oBoxChoose.hide();//先让所有的隐藏
                    $(".jQ_Select").css("zIndex",0);
                    $(".jQ_SelectUl").hide();//所有的隐藏
                    $(this).css("zIndex",19);
                    oBoxChoose.slideDown(200);//当前的显示
                }else{
                    oBoxChoose.slideUp(300,function(){$(this).css("zIndex",0);}); //隐藏
                }
                e.stopPropagation();//阻止事件的冒泡
            });
            $(this).find(".jQ_SelectUl li").click(function(e){
                var oTxt=$(this).text();
                $(this).addClass("on").siblings().removeClass("on");
                $(this).parents(".jQ_Select").find(".jQ_SelectBtn").html(oTxt);
                $(this).parents(".jQ_SelectUl").slideUp(200,function(){$(this).parents(".jQ_Select").css("zIndex",0);   }); //隐藏
                e.stopPropagation();//阻止事件的冒泡
            });
            $(this).find(".jQ_SelectUl li").mouseover(function(){
                $(this).addClass("on").siblings().removeClass("on");
            });
            $(document).on("click",function(e){
                $(".jQ_SelectUl").slideUp(200,function(){$(this).parents(".jQ_Select").css("zIndex",0);   });
                e.stopPropagation();
            });
        },
        /*
        * switchContext方法是一个tab切换效果点击  ul>li中的li元素切换内容
        *   （1）默认参数
        *       switchTabs:"",      // 必选参数 切换按钮用于 switchTabs.ul>li结构
        *       switchCons:"",      // 必选参数 切换的内容区域 结构没有限制   选中的是其下面的直接孩子元素
        *       switchEvent:"click" // 可选参数 默认切换事件是click事件 （注意：参数可以为 click  ||  mouseenter  这两个已经经过测试）
        *   （2）当前选中的元素  请使用 class="on"
        *   （3）用法示例
        *       $(".testSwitch").switchContext({ switchTabs:".testTabs",switchCons:".testCons",switchEvent:"mouseenter"});//注意选中的元素  class 的话加"."  id的话加"#"；也就是说严格按照元素选择器写法
        *       对应的解构如下
        *       <div class="testSwitch">        // class="testSwitch"元素  里面必须包阔切换点与切换内容 （也就是参数 switchTabs  switchCons  所对应的元素）
        *           <ul class="testTabs">       //class="testTabs" 切换点  严格使用  ul>li结构（当前切换点选中为   li.on）
        *               <li class="on"></li>   <li></li>  <li></li>
        *           </ul>
        *           <div class="switchCons">    //切换点对应的所有内容区域
        *               <XX></XX>    <XX></XX>   <XX></XX>  //当前显示的内容（XX元素）  为switchCons的直接孩子  XX元素（XX表示一个任意的元素结构，没有限制）
        *           </div>
        *       </div>
        *   也就是包含切换按钮跟切换内容的区域）
        *
        *
        * */
        switchContext:function (options) {
            var $switchs=$(this);
            if($switchs.length){
                $switchs.each(function (i) {
                    var _this=$switchs[i];
                    var defaults={
                        switchTabs:"",      //切换按钮用于 switchTabs.ul>li结构
                        switchCons:"",      //切换的内容区域 用于switchCons >div结构
                        switchEvent:"click" //默认切换事件是click事件
                    };
                    //把option参数合并到defaults中，并把defaults赋值给  options
                    options=$.extend(defaults,options);
                    var $tabs=$(_this).find(options.switchTabs);
                    var $cons=$(_this).find(options.switchCons);
                    var $consItems=$cons.children("*");        //获得直接孩子children()只考虑子元素而不考虑所有后代元素。
                    var ind=0;
                    var eventName=options.switchEvent;
                    $tabs.find("li").on(eventName,function () {
                        ind=$(this).index();
                        $consItems.eq(ind).show().siblings().hide();
                        $(this).addClass("on").siblings().removeClass("on");
                    });
                });
            }
        },
        /*
        * slideToLeft 向左边的轮播（可以带焦点  左右按钮）
        *   （1）默认参数
        *       slideCon:"",        //必选参数  图片所在的区域，适用结构  slideCon.ul>li
        *       tabCon:"",          //可选参数  焦点区域  结构没有限制
        *       btnLeft:"",         //可选参数  向左的按钮
        *       btnRight:"",        //可选参数  向右的按钮
        *       autoPlay:true,      //可选参数  默认自动轮播
        *       slideTime:600,      //可选参数  运动时间
        *       intervalTime:3000   //可选参数  运动间隔时间
        *   （2）切换区域严格使用  ul>li结构
        *   （2）用法示例：
        *       $(".testSlide").slideToLeft({   slideCon:".testSlideCon",tabCon: ".testTabCon", btnLeft:".testBtnLeft" ,btnRight".testBtnLeft"     });
        *       结构如下：
        *       <div class="testSlide">
        *           <ul class="testSlideCon">                   //图片所在区域严格采用ul>li形式
        *               <li></li><li></li><li></li><li></li>    //每次切换为一个li
        *           </ul>
        *           <div class="testTabCon">                    //切换点区域
        *               <XX class="on"></XX> <XX></XX><XX></XX> //标签没有限制   .testTabCon > XX   (注意是严格的父子关系)   on为当前的焦点
        *           </div>
        *           <XX class="testBtnLeft"></XX>
        *           <XX class="testBtnLeft"></XX>
        *       </div>
        *
        * */
        slideToLeft:function (options) {
            var $slides=$(this);
            if($slides.length){
                $slides.each(function (i) {
                    var _this=$slides[i];
                    var defaults={
                        slideCon:"",        //必选参数
                        tabCon:"",          //可选参数
                        btnLeft:"",         //可选参数
                        btnRight:"",        //可选参数
                        autoPlay:true,      //可选参数
                        slideTime:600,      //可选参数
                        intervalTime:3000   //可选参数
                    };
                    //把option参数合并到defaults中，并把defaults赋值给  options
                    options=$.extend(defaults,options);
                    var $con=$(_this).find(options.slideCon);//滚动区域的总宽度
                    var $tab=$(_this).find(options.tabCon);  //焦点区域
                    var $btnL=$(_this).find(options.btnLeft);   //左边按钮
                    var $btnR=$(_this).find(options.btnRight);
                    var timer=null;
                    var stepW=$con.find("li:first").outerWidth(true);
                    var liLen=$con.find("li").length;
                    var count=0;
                    var width=0;
                    //这里是向左运动的方法
                    function picMoveLeft(){
                        $con.find("li").clone(true).appendTo($con);//复制一份 添加到元素后面
                        liLen=$con.find("li").length;
                        $con.css("width",liLen*stepW+"px");
                        function showPics(){
                            $con.stop(true,false).animate({marginLeft:-count*stepW+"px"},options.slideTime);
                        }
                        function changeTabFocus() {
                            if(count==liLen/2){
                                $tab.children("*:first").addClass("on").siblings().removeClass("on");
                            }
                            $tab.children("*").eq(count).addClass("on").siblings().removeClass("on");
                        }
                        if(options.btnLeft && $btnL.length){
                            //left
                            $btnL.click(function(){
                                count--;
                                if(count<0){
                                    count=liLen/2;
                                    $con.css({marginLeft:-count*stepW+"px"});  /*一瞬间拉回来*/
                                    count=liLen/2-1;
                                }
                                changeTabFocus();
                                showPics();
                            });
                        }
                        if(options.btnRight && $btnR.length){
                            //->right
                            $btnR.click(function(){
                                count++;
                                if(count>liLen/2){
                                    count=1;
                                    $con.css({marginLeft:0});  /*一瞬间拉回来*/
                                }
                                changeTabFocus();
                                showPics();
                            });
                        }
                        if(options.tabCon && $tab.length){
                            $tab.children("*").click(function () {
                                $(this).addClass("on").siblings().removeClass("on");
                                $con.stop(true,false).animate({marginLeft:-$(this).index()*stepW+"px"},options.slideTime);
                                count=$(this).index();
                            });
                        }

                        //是否触发自动轮播
                        if(options.autoPlay){
                            //鼠标放上去停止定时器
                            $(_this).hover(function(){
                                clearInterval(timer);
                            },function(){
                                timer=setInterval(function(){
                                    count++;
                                    if(count>liLen/2){
                                        count=1;
                                        $con.css({marginLeft:0});  /*一瞬间拉回来*/
                                    }
                                    changeTabFocus();
                                    showPics();
                                },options.intervalTime);
                            }).trigger("mouseleave");//刚开始就触发mouseleave事件
                        }
                    }
                    picMoveLeft();//调用向左边的轮播
                });
            }
        },
        /*
        * slideToTop  方法 向上滚动的效果（  适用向上滚动的banner（有焦点）  向上滚动的li tr）
        *   （1）默认参数
        *       slideCon:"",        //必选参数  滚动的区域 适用结构  ul>li   table>tr
        *       tabCon:"",          //可选参数  焦点切换的区域
        *       autoPlay:true,      //可选参数  是否自动播放
        *       slideTime:1000,     //可选参数  运动时间
        *       intervalTime:2500   //可选参数  运动时间间隔
        *    （2）用法示例
        *       $(".testSlide").slideToTop({ slideCon:".testPic", tabCon ".testTab" })
        *       <div class="testSlide">     //作为滚动区域的父亲或者祖先
        *           <ul class="testPic">    //滚动的区域  结构可以采用 ul>li  table >tr
        *               <li></li>  <li></li>
        *           </ul>
        *           <div class="testTab">       //tab切换区域
        *               <XX class="on"></XX>  <XX></XX>     //不限制元素类型，作为 class=".testTab"直接孩子出现
        *           </div>
        *       </div>
        * */
        slideToTop:function (options) {
            var $slides=$(this);
            if($slides.length){
                $slides.each(function (i) {
                    var _this=$slides[i];
                    var defaults={
                        slideCon:"",        //必选参数
                        tabCon:"",          //可选参数
                        autoPlay:true,      //可选参数
                        slideTime:1000,     //可选参数
                        intervalTime:2500   //可选参数
                    };
                    //把option参数合并到defaults中，并把defaults赋值给  options
                    options=$.extend(defaults,options);
                    var $slideCon=$(_this).find(options.slideCon);
                    var $tabCon=$(_this).find(options.tabCon);
                    var timer=null;
                    var stepH;
                    var liLen;
                    var count=0;
                    var height=0;
                    // 适用 结构 ul> li
                    if($slideCon.children("li").length>=1){
                        var stepH=$slideCon.find("li:first").outerHeight(true);
                        var liLen=$slideCon.find("li").length;
                        $slideCon.find("li").clone(true).appendTo($slideCon);//复制一份 添加到元素后面
                        liLen=$slideCon.find("li").length;
                        $slideCon.css("height",liLen*stepH+"px");
                    }
                    //适用结构 table tr
                    if($slideCon.find("tr").length>=1){
                        var stepH=$slideCon.find("tr:first").outerHeight(true);
                        var liLen=$slideCon.find("tr").length;
                        $slideCon.find("tr").clone(true).appendTo($slideCon);//复制一份 添加到元素后面
                        liLen=$slideCon.find("tr").length;
                        $slideCon.css("height",liLen*stepH+"px");
                    }
                    //运动函数
                    function fnMove(){
                        $slideCon.stop(true,false).animate({marginTop:-count*stepH+"px"},options.slideTime);
                    }
                    function changeTabFocus() {
                        //如果有焦点的话
                        if(options.tabCon  && $tabCon.length ){
                            if(count==liLen/2){
                                $tabCon.children("*:first").addClass("on").siblings().removeClass("on");
                            }
                            $tabCon.children("*").eq(count).addClass("on").siblings().removeClass("on");
                        }
                    }
                    if(options.tabCon && $tabCon.length){
                        $tabCon.children("*").click(function () {
                            $(this).addClass("on").siblings().removeClass("on");
                            $slideCon.stop(true,false).animate({marginTop:-$(this).index()*stepH+"px"},options.slideTime);
                            count=$(this).index();
                        });
                    }
                    //是否触发自动轮播
                    if(options.autoPlay){
                        //鼠标放上去停止定时器
                        $(_this).hover(function(){
                            clearInterval(timer);
                        },function(){
                            timer=setInterval(function(){
                                count++;
                                if(count>liLen/2){
                                    count=1;
                                    $slideCon.css({marginTop:0});  /*一瞬间拉回来*/
                                }
                                changeTabFocus();//切换焦点
                                fnMove();       //轮播
                            },options.intervalTime);
                        }).trigger("mouseleave");//刚开始就触发mouseleave事件
                    }
                });
            }
        },
        /*
        * slideMenu 轮播 针对宽度由一个小宽度变成一个大宽度的轮播
        *   （1）默认参数spreadWidth:"575px",normalWidth:"205px",intervalTime:3000,autoPlay:true
        *   （2）当前选中的元素  请使用 class="on"
        *   （3）请使用   ul>li结构
        *   （4）例如：用法如下
        *       $(".testEle").slideMenu({ spreadWidth:"470px",   normalWidth:"210px",intervalTime:3000,autoPlay:true});
        *       对应的结构如下
        *           <ul class="testEle"><li class="on"></li> <li></li> <li></li> <li></li> <li></li> </ul>
        *       对应的css
        *           .testEle li{ width:210px; float:left;}  .testEle li.on{ width:470px;}
        *
        * */
        slideMenu : function(options){
            var menus = $(this);
            if(menus.length > 0){
                menus.each(function(i){
                    var menu = menus.eq(i);
                    var list = menu.find("li");
                    var length = list.length;
                    var timer=null;
                    var curIndex=0;//当前项索引
                    //定义默认值
                    var defaults={
                        spreadWidth:"575px",    //可选参数
                        normalWidth:"205px",    //可选参数  默认从宽度205px-->变化为575px;
                        intervalTime:3000,      //可选参数（默认轮播的间隔时间是3000ms）
                        autoPlay:true           //可选参数 （默认是自动轮播的）
                    };
                    //把option参数合并到defaults中，并把defaults赋值给  options
                    options=$.extend(defaults,options);
                    function autoMove(){
                        curIndex++;
                        if(curIndex==length){
                            curIndex=0;
                        }
                        list.eq(curIndex).addClass("on").siblings().removeClass("on");
                        list.eq(curIndex).stop(true,false).animate({ width:options.spreadWidth},300).siblings().animate({width:defaults.normalWidth},300);
                    }
                    if(length > 0){
                        list.mouseenter(function(){
                            clearInterval(timer);//清除定时器
                            curIndex=$(this).index();
                            $(this).addClass("on").siblings().removeClass("on");
                            $(this).stop(true,false).animate({ width:options.spreadWidth},300).siblings().animate({width:defaults.normalWidth},300);
                        });
                        list.mouseleave(function(){
                            if(options.autoPlay){
                                timer=setInterval(autoMove,options.intervalTime);
                            }
                        });
                    }
                    //判断是否自动播放
                    if(options.autoPlay){
                        timer=setInterval(autoMove,options.intervalTime); //自动播放
                    }
                });
            }
        },
        /*
         * slideGradual 方法 渐变的一种轮播    选中的焦点  on
         *    （1）默认参数
         *      slideCon:"",        //必选参数 图片所在的区域，适用结构  slideCon.ul>li
         *      tabCon:"",          //必选参数 焦点区域     结构没限制
         *      btnLeft:"",         //可选参数 向左的按钮
         *      btnRight:"",        //可选参数 向右的按钮
         *      autoPlay:true,      //可选参数 默认自动轮播
         *      fadeInTime:1000,    //可选参数 fadeIn时间  当前图进入时间
         *      fadeOutTime:2000,   //可选参数 fadeOut时间 前一个图离开时间
         *      intervalTime:4000   //可选参数 运动间隔时间
         *    （2）slideCon区域请使用   ul>li结构
         *    （3）当前焦点请使用   class="on"
         *    （4）用法示例：
         *          $(".testSlide").slideGradual({  slideCon:".testSlideCon",tabCon:".testTabCon",btnLeft:".testBtnLeft",btnRight:".testBtnRight"});
         *          对应的结构如下：
         *          //class="testSlide"作为（testSlideCons  && testTabCon &&testBtnLeft  && testBtnRight ）的父亲或者祖先元素
         *          //因为我们是根据testSlide  选中其下面的切换点  左右按钮等元素的；
         *          <div class="testSlide">
         *              <ul class="testSlideCons">                  //图片所在区域严格采用ul>li形式
         *                  <li></li>   <li></li>   <li></li>       //每次切换为一个li
         *              </ul>
         *              <div class="testTabCon">                    //切换点区域
         *                  <XX class="on"></XX><XX></XX><XX></XX>  //标签没有限制   .testTabCon > XX   (注意是严格的父子关系)   on为当前的焦点
         *              </div>
         *              <XX class="testBtnLeft"></XX>               //标签没有限制
         *              <XX class="testBtnRight"></XX>              //标签没有限制
         *          </div>
         * */
        slideGradual : function(options){
            var slides = $(this);
            if(slides.length > 0){
                slides.each(function(i){
                    var _this=slides[i];
                    //默认参数
                    var defaults={
                        slideCon:"",        //必选参数 图片所在的区域，适用结构  slideCon.ul>li
                        tabCon:"",          //必选参数 焦点区域     结构没限制
                        btnLeft:"",         //可选参数 向左的按钮
                        btnRight:"",        //可选参数 向右的按钮
                        autoPlay:true,      //可选参数 默认自动轮播
                        fadeInTime:1000,    //可选参数 fadeIn时间
                        fadeOutTime:2000,   //可选参数 fadeOut时间
                        intervalTime:4000   //可选参数 运动间隔时间
                    };
                    //把option参数合并到defaults中，并把defaults赋值给  options
                    options=$.extend(defaults,options);
                    var $slideCon=$(_this).find(options.slideCon);
                    var $lis=$slideCon.find("li");     //li元素
                    var $tabCon=$(_this).find(options.tabCon);
                    var $tabs=$tabCon.children("*");    //每一个焦点
                    var $btnLeft=$(_this).find(options.btnLeft);
                    var $btnRight=$(_this).find(options.btnRight);
                    var curIndex=$(_this).find(options.tabCon).children("*.on").index();
                    var lastIndex=0;//初始化
                    var picLen=$slideCon.find("li").length;     //图片的总个数
                    var timer=null;
                    function autoMove(){
                        curIndex++;
                        if(curIndex==picLen){
                            curIndex=0;
                        }
                        $lis.eq(curIndex).fadeIn(options.fadeInTime);
                        $lis.eq(lastIndex).fadeOut(options.fadeOutTime);
                        $tabs.eq(curIndex).addClass("on").siblings().removeClass("on");
                        lastIndex=curIndex;//变换值
                    }
                    $tabs.each(function(index,ele){
                        $(ele).click(function(){
                            curIndex=$(this).index();
                            clearInterval(timer);
                            if(lastIndex!=curIndex){
                                $(this).addClass("on").siblings().removeClass("on");
                                $lis.eq(curIndex).fadeIn(1000);
                                $lis.eq(lastIndex).fadeOut(2000);
                                lastIndex=curIndex;
                            }
                        });
                    });
                    //鼠标放上去关闭定时器 离开开始定时器
                    function hoverFn(obj) {
                        //是自动轮播的话，触发  hover事件
                        if(options.autoPlay){
                            obj.hover(function () {
                                clearInterval(timer);
                            },function () {
                                timer=setInterval(function(){
                                    autoMove();
                                },options.intervalTime);
                            });
                        }
                    }
                    hoverFn($slideCon);
                    hoverFn($tabCon);
                    hoverFn($btnLeft);
                    hoverFn($btnRight);
                    //是否自动轮播
                    if(options.autoPlay){
                        timer=setInterval(function(){
                            autoMove();
                        },options.intervalTime);
                    }
                    // right
                    if(options.btnRight && $btnRight.length){
                        $btnRight.click(function () {
                            autoMove();
                        });
                    }
                    // left
                    if(options.btnLeft && $btnLeft.length){
                        $btnLeft.click(function () {
                            curIndex--;
                            if(curIndex==-1){
                                curIndex=picLen-1;
                            }
                            $lis.eq(curIndex).fadeIn(options.fadeInTime);
                            $lis.eq(lastIndex).fadeOut(options.fadeOutTime);
                            $tabs.eq(curIndex).addClass("on").siblings().removeClass("on");
                            lastIndex=curIndex;//变换值
                        });
                    }
                    //
                });
            }
        }
        //其他效果
    });
})(jQuery);

$(function(){
    //模拟下拉需要配置相应的class   jQ_Select
    $(".jQ_Select").simulateSelect();//模拟下拉 2016-11-30从页面中移动到这里


});









