$(function () {
    let layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //为上传按钮添加点击事件
    $('#btnChooseImage').on('click', () => $('#file').click())

    $('#file').on('change', function (e) {
        let filelist = e.target.files; //伪数组
        if (filelist.length === 0) return layer.msg('请选择照片!')
        let file = e.target.files[0];
        let imgurl = URL.createObjectURL(file);
        $image.cropper('destroy').attr('src', imgurl).cropper(options)
        $('#image').prop('src', imgurl)
    })

    $('#btnUpload').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            type: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success(res) {
                if (res.status !== 0) return layer.msg('更换头像失败')
                layer.msg('更新涩图成功')
                window.parent.getUserData()
                console.log(res);
                // let file = $('#file').target.files[0];
                // let imgurl = URL.createObjectURL(file);

            }
        })
    })
})