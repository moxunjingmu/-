$(function () {
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        // nickname(value) {
        //     if (value.length) return '昵称必须在1~6之间'
        // }
        nickname: [
            /^[\S]{1,6}$/, '昵称必须在1~6之间，且不能出现空格'
        ]
    })
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success(res) {
                if (res.status !== 0) return layer.msg('获取用户信息失败！')
                // 调用 form.val() 快速为表单赋值
                form.val('formUserInfo', res.data)
            }

        })
    }
    $('#btnRest').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),

            success(res) {
                if (res.status !== 0) return layer.msg('更新用户信息失败！')
                layer.msg('更新用户信息成功！')
                // 调用父页面的方法
                window.parent.getUserData();
                console.log(res);
            }
        })
    })
})