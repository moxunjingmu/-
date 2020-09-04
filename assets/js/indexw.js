$(function () {
    getUserData()
    let layer = layui.layer;
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            localStorage.removeItem('token')
            location.href = '/loginw.html'
            layer.close(index)
        })
    })




})

function getUserData() {
    $.ajax({
        url: '/my/userinfo',
        type: 'GET',
        success(res) {
            console.log(res.data);
            if (res.status !== 0) return layui.layer.msg('获取用户信息失败！')
            renderAvatar(res.data)
        }
    })
}
//文字头像
function renderAvatar(user) {
    //                昵称             用户名
    const name = user.nickname || user.username;
    console.log(name);
    // 左侧欢迎标语
    $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
        console.log("pic");
    } else {
        $('.layui-nav-img').hide()
        const fr = name[0].toUpperCase()
        console.log(fr);
        $('.text-avatar').html(fr).show()
    }
}