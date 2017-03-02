var method = {};
method.addevent = function(element,type,handler){
  if(element.addEventListener){
    element.addEventListener(type,handler,false);
  }else if(element.attachEvent){
      element.attachEvent('on'+type,handler);
    }else {
       element['on'+type]=handler;
    }
};
method.ajax = function(data,url,methods,handler){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if(xhr.readyState===4){
      if(xhr.status>=200 && xhr.status < 300||xhr.status === 304){
        // console.log(xhr.responseText);
        handler(xhr.responseText);
      }
      else {
        alert("ajax通信失败 "+xhr.status);
      }
    }
  };
  xhr.open(methods,url,true);
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  xhr.send(data);
}
method.testlogin = function(){
  if(localStorage.sign_in==='true'){
    return true;
  }else {
    return false;
  }
}
method.throttling1 = function(func,delay){
  var inthrott = false;
  console.log(delay);
  return function(){
    console.log('1');
    var self = this;
    var args = arguments;
    if(!inthrott){
      func.apply(self,args);
      console.log(2);
      inthrott = true;
      setTimeout(function(){
        inthrott = false;
      },delay);
    }
  }
}
method.fadeIn = function($el,t){
    var o = 1;
    var step = 1/(t/50);
    if(!$el.style.opacity){
      $el.style.opacity = 1;
    }
    var timer = setInterval(function($el,step){
      if($el.style.opacity<0){
        clearInterval(timer);
      }else {
        $el.style.opacity -= step;
      }
    }.bind(null,$el,step),50);
  }
export default method;
