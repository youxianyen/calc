Page({
  data:{
    //初始化id
    id1:"back",
    id2:"clear",
    id3:"negative",
    id4:"+",
    id5:"7",
    id6:"8",
    id7:"9",
    id8:"-",
    id9:"4",
    id10:"5",
    id11:"6",
    id12:"*",
    id13:"1",
    id14:"2",
    id15:"3",
    id16:"/",
    id17:"0",
    id18:".",
    id19:"history",
    id20:"=",
    screenData:"0",
    lastIsOperator:false,
    arr:[],
    logs:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    
  },
  onReady:function(){
    // 页面渲染完成
    
  },
  onShow:function(){
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
    
  },
  onUnload:function(){
    // 页面关闭
    
  },
  //历史事件
  history:function(){
    wx.navigateTo({
      url: '../list/list',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  //点击事件
  btnClick:function(event){
    console.log(event.target.id);
    var id = event.target.id;
    if(id == this.data.id1){//如果点击的是退格键，则执行如下操作
      var data = this.data.screenData;
      if(data == 0){//如果值是0，不执行任何操作
        return ;
      }else{
        //如果不是0，则一点点减少
        data = data.substring(0,data.length-1);
        if(data == "" || data == "-"){
          data = 0;
        }
        this.setData({screenData:data});
        this.data.arr.pop();
      }
    }else if(id == this.data.id2){//如果点击的是清屏操作如下
      this.setData({screenData:"0"});
      this.data.arr.length = 0;
    }else if(id == this.data.id3){//点击的是正负号
      var data = this.data.screenData;
      if(data == 0){
        return ;
      }
      //获取第一个值判断是什么
      var firstWord = data.substring(0,1);
      if(firstWord == "-"){//得到第一个值是- ，重新赋值
        data = data.substring(1,data.length);
        this.data.arr.shift();
      }else{
        data = "-"+data;
        this.data.arr.unshift("-");
      }
      this.setData({screenData:data});
    }else if(id == this.data.id20){//如果点击的是等于号
      var data = this.data.screenData;
      if(data == 0){
        return;
      }
      //只有最后一位是数字，点击=才有意义，所以需要重新过滤一下
      var lastWord = data.substring(data.length-1,data.length);
      if(isNaN(lastWord)){
        return ;//说明不是数字 直接返回
      }
      var num="";
      var lastOperator;
      var arr = this.data.arr;
      var optarr = [];
      for(var i in arr){
        if(isNaN(arr[i]) == false || arr[i] == this.data.id18 || arr[i] == this.data.id3){
          num += arr[i];
        }else{
          lastOperator = arr[i];
          optarr.push(num);
          optarr.push(arr[i]);
          num = "";
        }
      }
      optarr.push(Number(num));
      var result = Number(optarr[0])*1.0;
      for(var i = 1;i < optarr.length;i++){
        if(isNaN(optarr[i])){
          //加减乘除的处理
          if(optarr[1] == this.data.id4){
            result += Number(optarr[i+1]);
          }else if(optarr[1] == this.data.id4){
            result += Number(optarr[i+1]);
          }else if(optarr[1] == this.data.id8){
            result -= Number(optarr[i+1]);
          }else if(optarr[1] == this.data.id12){
            result *= Number(optarr[i+1]);
          }else if(optarr[1] == this.data.id16){
            result /= Number(optarr[i+1]);
          }
        }
      }
      //保留结果集
      this.data.logs.push(data + "=" + result);
      wx.setStorageSync('callogs', this.data.logs);
      // console.log(wx.getStorageSync('callogs'));
      //算完之后清空数组
      this.data.arr.length = 0;
      this.data.arr.push(result);
      this.setData({screenData:result + ""});
    }else{
      if(id == this.data.id4 || id == this.data.id8 || id == this.data.id12 || id == this.data.id16){
        if(this.data.lastIsOperator == true || this.data.screenData == 0){
          return;
        }
      }
      var sd = this.data.screenData;
      var data;
      if(sd == 0){
        data = id;
      }else{
        data = sd + id;
      }
      this.setData({screenData:data});
      this.data.arr.push(id);
      //判断是否是加减乘除，不能连续添加
      if(id == this.data.id4 || id == this.data.id8 || id == this.data.id12 || id == this.data.id16){
        this.setData({lastIsOperator:true});
      }else{
        this.setData({lastIsOperator:false});
      }
    }
  }
})