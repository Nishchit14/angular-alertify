/**
 * Created with JetBrains WebStorm.
 * User: Nishchit
 * Date: 24/9/13
 * Time: 12:18 PM
 * To change this template use File | Settings | File Templates.
 */
"use strict";

   
   /*--------------AlertiFy------------*/
app
 .directive('alertify', function () {
        return{
            restrict:"E",
            controller:function ($scope) {

            this.reset = function (option) {
                var d = Alertify.dialog, l = Alertify.log, $ = Alertify.get  ;
             //   $("toggleCSS").href = "assets/css/alertify.default.css";
                if(angular.isDefined(option)){
                    d.labels.ok     = option.btnOk || "Ok";
                    d.labels.cancel = option.btnCancel || "Cancel";
                    d.buttonReverse = option.buttonReverse || "False";
                    d.buttonFocus   = option.buttonFocus || "ok";
                    d.alertMe       = option.alert || "Please give any alert Message !!";
                    d.confirmMe     = option.confirm || "Please give any confirmation Message !!";
                    d.promptMe      = option.prompt || "Please give any prompt Message !!";
                    l.pTrue         = option.pTrue || "You Entered :  ";
                    l.pFalse        = option.True || "Canceled !!";
                    l.cTrue         = option.cTrue || "Selected Successfully ";
                    l.cFalse        = option.cFalse || "Canceled !! ";
                    l.delay         = option.delay || 5000;
                }
               /* else{
                    d.labels.ok     =  "Ok";
                    d.labels.cancel =  "Cancel";
                    d.buttonReverse =  "False";
                    d.buttonFocus   =  "ok";
                    d.alertMe       =  "Please give any alert Message !!";
                    d.confirmMe     =  "Please give any confirmation Message !!";
                    d.promptMe      =  "Please give any prompt Message !!";
                    l.pTrue         =  "You Entered :  ";
                    l.pFalse        =  "Selected Successfully ";
                    l.cTrue         =  "Selected Successfully ";
                    l.cFalse        =  "Canceled !! ";
                    l.delay         =  5000;
                }*/
                this.d = d;this.l=l;this.$=$;
            };
        }
      }
    })
.directive('alert', function () {
        return{
            require:"alertify",
            restrict:"A",
            scope:{
              alert:"@"
            },
             link: function (scope, element, attrs, alertifyCtrl) {
                element[0].onclick =  function () {
                     alertifyCtrl.reset();
                    attrs.btnOk?alertifyCtrl.d.labels.ok = attrs.btnOk:0;
                     alertifyCtrl.d.alert(scope.alert || alertifyCtrl.d.alertMe);
                     return false;
                 };
            }
        }
})
.directive('confirm', function () {
        return{
            require:"alertify",
            scope:{
                option:"=option",
                okFun: "&"
            },
            restrict:"A",
            link: function (scope, element, attrs, alertifyCtrl) {
                element[0].onclick =  function () {
                    alertifyCtrl.reset(scope.option);
                    attrs.btnOk?alertifyCtrl.d.labels.ok = attrs.btnOk:0;
                    attrs.btnCancel?alertifyCtrl.d.labels.cancel = attrs.btnCancel:0;

                     alertifyCtrl.d.confirm(attrs.confirm || alertifyCtrl.d.confirmMe|| "This is Demo",function(){
                         scope.$apply(scope.okFun());
                         alertifyCtrl.l.success(attrs.cTrue || alertifyCtrl.l.cTrue || "Success !!")
                     },function(){
                         alertifyCtrl.l.error(attrs.cFalse || alertifyCtrl.l.cFalse || "Canceled !!")
                     });
                     return false;
                 };
            }
        }
})
.directive('prompt', function () {
        return{
            require:"alertify",
            restrict:"A",
            scope:{
                option:"=option"
            },
             link: function (scope, element, attrs, alertifyCtrl) {

                 element[0].onclick = function () {
                     alertifyCtrl.reset();
                     alertifyCtrl.d.prompt(attrs.prompt || alertifyCtrl.d.promptMe, function (str) {
                         alertifyCtrl.l.success(attrs.pTrue || alertifyCtrl.l.pTrue + str);
                     }, function () {
                         alertifyCtrl.l.error(attrs.pFalse || alertifyCtrl.l.pFalse);
                     }, "Default Value");
                     return false;
                 };
            }
        }
})
.directive('notification', function () {
        return{
            require:"alertify",
            scope:{mes:"@"},
            restrict:"A",
             link: function (scope, element, attrs, alertifyCtrl) {
                 element[0].onclick = function () {
                     alertifyCtrl.reset(scope.option);
                     alertifyCtrl.l.create("info", attrs.mes);
                     return false;
                 };
            }
        }
})
.directive('info', function () {
        return{
            require:"alertify",
            restrict:"A",
             link: function (scope, element, attrs, alertifyCtrl) {
                 element[0].onclick = function () {
                     alertifyCtrl.reset();
                     alertifyCtrl.l.info("Standard log message");
                     return false;
                 };
            }
        }
})
.directive('success', function () {
        return{
            require:"alertify",
            scope:{message:"@"},
            restrict:"A",
             link: function (scope, element, attrs, alertifyCtrl) {
                 element[0].onclick = function () {
                     alertifyCtrl.reset();
                     alertifyCtrl.l.success(scope.message);
                     return false;
                 };
                 scope.$watch(function(){
                     return scope.message;
                 }, function(){
                     element[0].click();
                 })
            }
        }
})
.directive('error', function () {
        return{
            require:"alertify",
            restrict:"A",
             link: function (scope, element, attrs, alertifyCtrl) {
                 element[0].onclick = function () {
                     alertifyCtrl.reset();
                     alertifyCtrl.l.error("Error log message");
                     return false;
                 };
            }
        }
})
.directive('delay', function () {
        return{
            require:"alertify",
            restrict:"A",
             link: function (scope, element, attrs, alertifyCtrl) {
                element[0].onclick = function () {
                     alertifyCtrl.reset();
                     alertifyCtrl.l.info("Hiding in 10 seconds", 10000);
                     return false;
                 };
            }
        }
})
.directive('sticky', function () {
        return{
            require:"alertify",
            scope:{message:"@"},
            restrict:"A",
             link: function (scope, element, attrs, alertifyCtrl) {
                 element[0].onclick = function () {
                     alertifyCtrl.reset();
                     alertifyCtrl.l.info(scope.message);
                     return false;
                 };
                 scope.$watch(function(){
                     return scope.message;
                 }, function(){
                     element[0].click();
                 })
             }
        }
})
.directive('focus', function () {
        return{
            require:"alertify",
            restrict:"A",
             link: function (scope, element, attrs, alertifyCtrl) {
                 element[0].onclick = function () {
                     alertifyCtrl.reset();
                     alertifyCtrl.d.buttonFocus = "cancel";
                     alertifyCtrl.d.confirm("Confirm dialog with cancel button focused", function () {
                         alertifyCtrl.l.success("You've clicked OK");
                     }, function () {
                         alertifyCtrl.l.error("You've clicked Cancel");
                     });
                     return false;
                 };
             }
        }
})
.directive('order', function () {
        return{
            require:"alertify",
            restrict:"A",
             link: function (scope, element, attrs, alertifyCtrl) {
                 element[0].onclick = function () {
                     alertifyCtrl.reset();
                     alertifyCtrl.d.buttonReverse = true;
                     alertifyCtrl.d.confirm(alertifyCtrl.d.confirmMe, function () {
                         alertifyCtrl.l.success("You've clicked OK");
                     }, function () {
                         alertifyCtrl.l.error("You've clicked Cancel");
                     });
                     return false;
                 };
             }
        }
})
.directive('bootstrap', function () {
        return{
            require:"alertify",
            restrict:"A",
             link: function (scope, element, attrs, alertifyCtrl) {
                 element[0].onclick = function () {
                     alertifyCtrl.reset();
                     alertifyCtrl.$("toggleCSS").href = "assets/css/alertify.bootstrap.css";
                     alertifyCtrl.d.prompt("Prompt dialog with bootstrap theme", function () {
                         alertifyCtrl.l.success("You've clicked OK");
                     }, function () {
                         alertifyCtrl.l.error("You've clicked Cancel");
                     }, "Default Value");
                     return false;
                 }
             }
        }
});