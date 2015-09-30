// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform, $ionicPopup, $timeout, $ionicLoading, $http) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
        StatusBar.styleDefault();
    }
    cordova.getAppVersion(function (version) {
      alert(version);
      });

    function checkUpdate() {
        cordova.getAppVersion.getVersionCode(function (versionCode) {
            var url="http://api.turtletl.com/mobile/appupdate/update";
            $http.post(url).success(function (data) {
                if (versionCode < data.versionCode) {
                    var confirmPopup = $ionicPopup.confirm({
                        title: "有新版本升级了",
                        template: data.msg,
                        cancelText: "取消",
                        okText: "升级"
                    });
                    confirmPopup.then(function (res) {
                        if (res) {
                            window.open(data.apk, '_system', 'location=yes');
                            alert("正在更新");
                        } else {
                            alert("您取消了更新");
                        }  
                    })
                }
            }).error(function (error) {
                alert("对不起更新失败");      
            })
        });
    }
    $timeout(function () {
        checkUpdate();
    }, 2000)
  });
})
