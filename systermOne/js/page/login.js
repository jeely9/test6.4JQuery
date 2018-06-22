function login(){
    // console.log(name);
    // var storage=window.localStorage;
    // storage.setItem("lists",lists);
    $('#mail').focus(function () {
        $('#mail').val('');
    });
    $('#psw').focus(function () {
        $('#psw').val('');
    });
    $('#mail').blur(function () {
        var email = $(this).val();
        var reg =  /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        if ($('#mail').val() ==''){
            $('#mail').val('用户名不能为空');
            //重新获得焦点
            // $('#txtUserName').focus();
        }
        // else if(!reg.test(email)){
        // 	alert("您输入的邮箱有误,请重新核对后再输入!");
        // }
    });
    $('#psw').blur(function () {
        if ($('#psw').val() == '') {
            $('#psw').val('密码不能为空');
        }
    });
    $(document).keyup(function(event){
        if(event.keyCode ==13){
            $("#login").trigger("click");
        }
    });
    $('#login').click(function () {
        var userName = $('#mail').val();
        var password = $('#psw').val();
        setCookie();        //记住密码
        //加密成md5
        // var passwd = $.md5(password);
        // console.log(passwd);
        if(userName=="admin" & password=="123456"){
            window.location.href="home.html?userName="+userName;
        }else{
            return false;
        }
        // $.ajax({
        //     type: "post",
        //     url: "http://" + host + "/user/doLogin",
        //     data:{
        //         "userName":userName,
        //         "password":password
        //     },
        //     async: true,
        //     success: function (data) {
        //         if(data.res == false){
        //             alert("您输入的密码错误！");
        //             $("#psw").focus();
        //             return false;
        //         }else{
        //             var userName = $("#mail").val();
        //             window.location.href="home.html?userName="+userName;
        //         }
        //     },
        //     error: function(data){
        //         // console.log(data);
        //     }
        // })
    });


//查看密码
    $(".eyes_box").click(function(){
        if($(this).attr("data-show")==1){//明文
            $(this).attr("data-show","2");
            //$(this).children("i").html("&#xe627;");
            $(this).parent("p").children(".psw_dd").hide();
            $(this).parent("p").children(".psw_wz").show();
            $(this).parent("p").children(".psw_wz").val($(this).parent("p").children(".psw_dd").val());
            return;
        }
        if($(this).attr("data-show")==2){//密文
            $(this).attr("data-show","1");
            //$(this).children("i").html("&#xe624;");
            $(this).parent("p").children(".psw_dd").show();
            $(this).parent("p").children(".psw_wz").hide();
            $(this).parent("p").children(".psw_dd").val($(this).parent("p").children(".psw_wz").val());
            return;
        }
    });
}
//保存用户信息
function setCookie() {
    var userName = $("#mail").val();
    var passWord = $("#psw").val();
    var checked = $('#rmbUser').prop('checked');	//获取“是否记住密码”复选框
    if (checked) {
        $.cookie("rmbUser", "true", { expires: 7 }); // 存储一个带7天期限的 cookie
        $.cookie("mail", userName, { expires: 7 }); // 存储一个带7天期限的 cookie
        $.cookie("passWord", passWord, { expires: 7 }); // 存储一个带7天期限的 cookie
        // console.log(userName,passWord);
    }else {
        $.cookie("rmbUser", "false", { expires: -1 });
        $.cookie("mail", '', { expires: -1 });
        $.cookie("passWord", '', { expires: -1 });
        // console.log(userName,passWord);
    }
}
function getCookie(){
    var loginCode = $.cookie("mail"); //获取cookie中的用户名
    var pwd =  $.cookie("passWord"); //获取cookie中的登陆密码
    if(pwd){//密码存在的话把“记住用户名和密码”复选框勾选住
        $("#rmbUser").attr("checked","true");
    }
    if(loginCode){//用户名存在的话把用户名填充到用户名文本框
        $("#mail").val(loginCode);
    }
    if(pwd){//密码存在的话把密码填充到密码文本框
        $("#psw").val(pwd);
    }
}
//查看密码
$(".eyes_box").click(function(){
    console.log("ok");
    if($(this).attr("data-show")==1){//明文
        $(this).attr("data-show","2");
        //$(this).children("i").html("&#xe627;");
        $(this).parent("p").children(".psw_dd").hide();
        $(this).parent("p").children(".psw_wz").show();
        $(this).parent("p").children(".psw_wz").val($(this).parent("p").children(".psw_dd").val());
        return;
    }
    if($(this).attr("data-show")==2){//密文
        $(this).attr("data-show","1");
        //$(this).children("i").html("&#xe624;");
        $(this).parent("p").children(".psw_dd").show();
        $(this).parent("p").children(".psw_wz").hide();
        $(this).parent("p").children(".psw_dd").val($(this).parent("p").children(".psw_wz").val());
        return;
    }
});













$(function(){
    //初始化页面时验证是否记住了密码
    getCookie();
    // if ($.cookie("rmbUser") == "true") {
    //    $("#rmbUser").attr("checked", true);
    //    $("#mail").val($.cookie("mail"));
    //    $("#psw").val($.cookie("passWord"));
    // }
    // userInfo();
    login();
});
