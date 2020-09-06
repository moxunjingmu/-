$(() => {
    let layer = layui.layer;
    let form = layui.form

    initCate()
    initEditor()

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 定义加载文章分类的方法
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            type: 'GET',
            success(res) {

                if (res.status !== 0) return layer.msg('初始化文章失败')
                // 调用模板引擎，渲染分类的下拉菜单

                let htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                // 一定要记得调用 form.render() 方法
                form.render()
            }
        })
    }
    $('#btnChooseImage').on('click', () => $('#coverFile').click())

    $('#coverFile').on('change', function (e) {
        let filelist = e.target.files; //伪数组
        if (filelist.length === 0) return layer.msg('请选择照片!')
        let file = e.target.files[0];
        let imgurl = URL.createObjectURL(file);
        $image.cropper('destroy').attr('src', imgurl).cropper(options)
        // $('#image').prop('src', imgurl)
    })

    let art_state = '已发布'

    $('#btnsave2').on('click', function () {
        art_state = '草稿'
    })

    $('#form-pub').on('submit', function (e) {
        e.preventDefault();
        let fd = new FormData($(this)[0])
        fd.append('state', art_state)

        fd.forEach(function (v, k) {
            console.log(k, v);
        })
        console.dir(fd);
        //  将裁剪后的图片输出为一个文件对象
        $image.cropper('getCroppedCanvas', {
            width: 400,
            height: 200
        }).toBlob(function (blob) {
            fd.append('cover_img', blob)
            publishArticle(fd)
        })
    })

    function publishArticle(fd) {
        $.ajax({
            type: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success(res) {
                if (res.status !== 0) return layer.msg('发布文章失败！')
                layer.msg('发布文章成功！')
                location.href = '/article/art_listw.html'
            }
        })
        let list = window.parent.document.querySelector('.list')
        list.classList.add('layui-this')
        list.nextElementSibling.classList.remove('layui-this')

    }
})