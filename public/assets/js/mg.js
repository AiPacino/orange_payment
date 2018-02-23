(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

class Request {

  ajax(action, data, method = 'post') {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: method,
        url: action,
        data: data,
        dataType: 'json',
        success: function (response, txtStatus, xhr) {

          if (xhr.status == 200) {
            resolve(response);
          } else {
            reject(txtStatus);
          }
        },
        error: function (xml, status, err) {
          reject(err);
        }
      });
    });
  }

}

module.exports = new Request();

},{}],2:[function(require,module,exports){
const User = require('./mg/user');
const Business = require('./mg/business');

$(function () {

  User.init();
  Business.init();
});

},{"./mg/business":3,"./mg/user":4}],3:[function(require,module,exports){
const Request = require('./../common/request');

class Business {
  init() {
    this.update();
  }

  update() {
    let form = $('#form-buisness-update');
    if (form.length <= 0) {
      return;
    }

    form.on('submit', function () {
      let action = $(this).attr('action');
      let data = $(this).serialize();

      Request.ajax(action, data).then(response => {
        if (response.code == 0) {
          location.href = '/mg/business';
        } else {
          alert(response.message);
        }
      });

      return false;
    });
  }
}

module.exports = new Business();

},{"./../common/request":1}],4:[function(require,module,exports){
const Request = require('../common/request');

class User {

  init() {
    this.userStatusCheck();
    this.userRateSet();
  }

  userStatusCheck() {
    let btnUserStatus = $('.user-items').find('.user-status-check');
    if (btnUserStatus.length <= 0) {
      return;
    }

    btnUserStatus.on('click', function () {
      let userId = $(this).attr('data-id');
      let status = $(this).attr('data-status') || 1;

      let action = '/mg/api/userStatus';
      let data = { user_id: userId, status: status };

      Request.ajax(action, data).then(response => {
        if (response.code == 0) {
          location.reload();
        } else {
          alert(response.message);
        }
      });
    });
  }

  userRateSet() {
    let btnUserRate = $('.user-items').find('.user-rate-set');
    if (btnUserRate.length <= 0) {
      return;
    }

    btnUserRate.on('click', function () {
      let userId = $(this).attr('data-id');
      let rateIn = $('#rate-in-' + userId).val();
      let rateOut = $('#rate-out-' + userId).val();

      let action = '/mg/api/userRate';
      let data = {
        user_id: userId,
        rate_in: rateIn,
        rate_out: rateOut
      };

      Request.ajax(action, data).then(response => {
        if (response.code == 0) {
          alert('设置成功！');
          location.reload();
        } else {
          alert(response.message);
        }
      });
    });
  }
}

module.exports = new User();

},{"../common/request":1}]},{},[2]);
