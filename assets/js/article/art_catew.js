$(function () {
    let layer = layui.layer;
    let form = layui.form

    initArtCateList()

    function initArtCateList() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success(res) {
                console.log(res);
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    let indexadd = null;
    $('#btnAddCate').on('click', function () {
        indexadd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });

    })
    //通过代理的形式 为 form-add表单绑定submit事件
    $('body').on('click', '#btnRest', function (e) {
        e.preventDefault()
        //  将jq对象转为DOM对象并重置表单
        $('#form-add')[0].reset()
    })

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) return layer.msg('新增分类失败！')
                layer.msg('新增分类成功！')
                layer.close(indexadd)

            }
        })
    })



    //编辑按键
    let indexEdit = null;
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        let id = $(this).attr('data-id');
        console.log(id);
        $.ajax({
            type: 'GET',
            url: '/my/article/cates/' + id,
            success(res) {
                console.log(res);
                form.val('form-edit', res.data)
            }
        })
    })
    // 通过代理的形式，为修改分类的表单绑定 submit 事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) return layer.msg('修改失败！')
                layer.msg('修改成功！')
                layer.close(indexEdit)
                initArtCateList()

            }
        })
    })
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id');
        layer.confirm('确认删除？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            console.log(index);
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    console.log('===============');
                    console.log(res);
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    console.log(index);

                    layer.close(index)
                    initArtCateList()
                }
            })
        })
    })
})