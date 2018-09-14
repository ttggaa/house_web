// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.use(VueResource);

/**
 * my vue-resource object
 * @type {{}}
 */
Vue.prototype.$AJAX = {};

Vue.prototype.$AJAX.formatParam = function(realURL, params) {
  return formatParam(realURL, params);
};

var formatParam = function(realURL, params) {
  if (typeof(params) === 'string') {
    params=JSON.parse(params);
  }
  if (typeof(params) == "object") {
    var paramArray = [];
    for (var key in params) {
      paramArray.push(key + "=" + params[key])
    }

    if (realURL.indexOf("?") > -1) {
      realURL += "&" + paramArray.join("&");
    } else {
      realURL += "?" + paramArray.join("&");
    }
  }

  return realURL;
}

function getTicket(){
  var ticket;
  var loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
  if(!loginInfo){
    window.location.href = "#/login";
  }else{
    ticket = loginInfo.ticket;
    if(!ticket){
      window.location.href = "#/login";
    }else{
      return ticket;
    }
  }
}

/**
 * my vue-resource put request
 * @param vm
 * @param uri
 * @param success
 * @constructor
 */
Vue.prototype.$AJAX.GET = function (vm, uri, params, success){
  vm.btnLoading = true;
  vm.tabLoading = true;

  var ticket = getTicket();

  var url;
  if(params == null){
    url = basePath + uri;
  }else{
    url = formatParam(basePath + uri, params);
  }

  vm.$http({
    url: url,
    method: 'GET',
    // 设置请求头
    headers: {
      'ticket': ticket
    }
  }).then(function (response) {
    // 请求成功回调
    if(response.body.code == 200){
      vm.$message.success(response.body.message);
      success(response);
      }else if(response.body.code == 401){
        window.location.href = "#/login";
      }else{
        vm.$message.error(response.body.message);
      }
      vm.tabLoading = false;
      vm.btnLoading = false;
  }, function (response) {
    // 请求失败回调
    vm.$message.error('\"status\"'+response.body.status+',\"error\":'+response.body.error+',\"message\":'+response.body.message);
    vm.btnLoading = false;
    vm.tabLoading = false;
  });
}


Vue.prototype.$AJAX.GET2 = function (vm, uri, params, success){
  vm.btnLoading = true;
  vm.tabLoading = true;

  var url;
  if(params == null){
    url = basePath2 + uri;
  }else{
    url = formatParam(basePath2 + uri, params);
  }
  vm.$http.get(url, []).then((response) => {
    if(response.body.code == 200){
      vm.$message.success(response.body.message);
      success(response);
    }else if(response.body.code == 401){
      window.location.href = "#/login";
    }else{
      vm.$message.error(response.body.message);
    }
    vm.tabLoading = false;
    vm.btnLoading = false;
  }, (response) => {
    vm.$message.error('\"status\"'+response.body.status+',\"error\":'+response.body.error+',\"message\":'+response.body.message);
    vm.btnLoading = false;
    vm.tabLoading = false;
  });
}


/**
 * my vue-resource post request
 * @param vm
 * @param param
 * @param uri
 * @param successFn
 * @constructor
 */
Vue.prototype.$AJAX.POST = function (vm, param, uri, isShowSuccessMsg, successFn){
  vm.winBtnLoading = true;
  var url = basePath + uri;
  var ticket = getTicket();
  vm.$http.post(url, param, {headers: {'ticket': ticket}}).then((response) => {
    if(response.body.code == 200){
      vm.$message.success(response.body.message);
      successFn(response);
    }else if(response.body.code == 401){
      window.location.href = "#/login";
    }else{
      vm.$message.error(response.body.message)
    }
    vm.winBtnLoading = false;
  }, (response) => {
    vm.$message.error('\"status\"'+response.body.status+',\"error\":'+response.body.error+',\"message\":'+response.body.message);
    vm.winBtnLoading = false;
  });
}

/**
 * my vue-resource put request
 * @param vm
 * @param param
 * @param uri
 * @param successFn
 * @constructor
 */
Vue.prototype.$AJAX.PUT = function (vm, param, uri, successFn){
  vm.winBtnLoading = true;
  var url = basePath + uri;
  var ticket = getTicket();
  vm.$http.put(url, param, {headers: {'ticket': ticket}}).then((response) => {
    if(response.body.code == 200){
      vm.$message.success(response.body.message);
      successFn(response);
    }else if(response.body.code == 401){
      window.location.href = "#/login";
    }else{
      vm.$message.error(response.body.message)
    }
    vm.winBtnLoading = false;
  }, (response) => {
    vm.$message.error('\"status\"'+response.body.status+',\"error\":'+response.body.error+',\"message\":'+response.body.message);
    vm.winBtnLoading = false;
  });
}

/**
 * my vue-resource delete request
 * @param vm
 * @param uri
 * @param successFn
 * @constructor
 */
Vue.prototype.$AJAX.DELETE = function (vm, uri, successFn){
  vm.winBtnLoading = true;
  var url = basePath + uri;
  var ticket = getTicket();

  vm.$http({
    url: url,
    method: 'DELETE',
    // 设置请求头
    headers: {
      'ticket': ticket
    }
  }).then(function (response) {
    // 请求成功回调
    if(response.body.code == 200){
      vm.$message.success(response.body.message);
      successFn(response);
    }else if(response.body.code == 401){
      window.location.href = "#/login";
    }else{
      vm.$message.error(response.body.message)
    }
    vm.winBtnLoading = false;
  }, function (response) {
    // 请求失败回调
    vm.$message.error('\"status\"'+response.body.status+',\"error\":'+response.body.error+',\"message\":'+response.body.message);
    vm.winBtnLoading = false;
  });
}

Vue.prototype.$OPTIONS = function(value, options){
  if(!options){
    return "";
  }
  for(var i=0;i<options.length;i++){
    var option = options[i];
    if(option.value == value){
      var label = option.label;
      return label;
    }
  }
}

Vue.prototype.$OPTIONS2 = function(values, options){
  if(!values){
    return "";
  }
  var arr = values.split(',');
  var texts = "";
  for(var i=0;i<arr.length;i++){
    var key = arr[i];
    if(options){
      for(var j=0;j<options.length;j++){
        var obj = options[j];
        if(obj.value == key){
          var text = obj.label;
          texts += text;
          if(i<arr.length-1){
            texts += ",";
          }
        }
      }
    }
  }
  return texts;
}

Vue.prototype.$RESET = function(vm){
  for(var p in vm.searchParam){
    if(p != 'start' && p != 'length'){
      vm.searchParam[p] = '';
    }
  }
  vm.search();
}

// Vue.http.interceptors.push((request, next) => {
//   // request.credentials = true;
//   var token = "abc";
//   request.headers.set('token', token); //setting request.headers
//   next((response) => {
//     return response
//   })
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
