$(function () {
    const form = layui.form;
    const layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须在6-12之间，且不能出现空格'
        ],
        samePwd(value) {
            if (value === $('[name=oldPwd]').val()) return layer.msg('新旧密码不能相同')
        },
        rePwd(value) {
            if (value !== $('[name=newPwd]').val()) return layer.msg('新旧密码不能相同')
        }
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),

            success(res) {
                if (res.status !== 0) return layer.msg('更新密码失败！')
                layer.msg('更新密码成功！')
                // 将jq对象转为DOM对象并重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})