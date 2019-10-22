$(function() {
    // 当管理员选择文件的时候
    $('#image').on('change', function() {
        // 用户选择到的文件
        var file = this.files[0];
        // console.log(file);
        // 创建formData对象实现二进制文件上传
        var formData = new FormData();
        // 将管理员选择到的文件添加到formData对象中
        formData.append('image', file);
        // 向服务器端发送请求 实现图片上传
        $.ajax({
            type: 'post',
            url: '/upload',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                // console.log(response[0].image)
                // 添加到隐藏域里面 
                $('#file').val(response[0].image)
                    // 将其预览出来 
                $('#prev').show().attr("src", response[0].image);
            }
        })
    });

    var sArr = [];

    // 当轮播图表单发生提交行为时
    $('#sAdd').on('click', function() {
        // 获取管理员在表单中输入的内容
        var formData = $("#slidesForm").serialize();
        // 向服务器端发送请求 添加轮播图数据

        $.ajax({
            type: 'post',
            url: '/slides',
            data: formData,
            success: function(res) {
                // 将返回回来的res追加到sArr数组中 
                sArr.push(res);
                render();
            }
        })

    })

    function render() {
        var html = template('slidesTpl', {
            data: sArr
        });
        $('tbody').html(html);
    }

    // 向服务器端发送请求 索要图片轮播列表数据
    $.ajax({
        type: 'get',
        url: '/slides',
        success: function(response) {
            sArr = response;
            render(sArr);

        }
    })


    // 当删除按钮被点击时
    $('tbody').on('click', '.delete', function() {
        if (confirm('您真的要进行删除操作吗')) {
            // 获取管理员要删除的轮播图数据id
            var id = $(this).attr('data-id');
            // 向服务器发送请求 实现轮播数据删除功能
            $.ajax({
                type: 'delete',
                url: '/slides/' + id,
                success: function(res) {
                    var index = sArr.findIndex(item => item._id == id);
                    sArr.splice(index, 1);
                    render();
                }
            })
        }
    });
})