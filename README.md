#updatedemo
ionic app 自动更新简单实例

第一版:

用到的插件
cordova plugin add https://github.com/whiteoctober/cordova-plugin-app-version.git
cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-inappbrowser.git

客户端主要代码说明：

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


服务器端主要代码说明：

public function update() {
        $data = array (
            'versionCode' => 28, 
            'versionName' => '0.0.2',
            'msg' => "1.界面美化<br/>2.性能优化，更流畅<br/>3.减少了更新框弹出时间",
            'apk' => 'http://www.turtletl.com/android-debug.apk'
        );
        $this -> ajaxReturn($data);
    } 
