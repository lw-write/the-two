$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        let html = template('cTpl', { data: res });
        $('#category').html(html);
    }
})

$('#feature').on('change', function() {
    let file = this.files[0];
    let formData = new FormData();
    formData.append('cover', file);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
            $('#img').val(res[0].cover);
            $('#prev').show().attr('src', res[0].cover)
        }
    })
})
$('#pAdd').on('click', function() {
    let formData = $('form').serialize();
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function() {
            location.href = '/admin/posts.html'
        }
    })
    return false;
})

let id = getUrlParams('id');
if (id != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function(res) {
            // console.log(res);
            $('#title').val(res.title);
            $('#content').val(res.content);
            $('h1').text('编辑文章');
            // 预览图片
            $('#prev').show().attr('src', res.thumbnail);
            $('#img').val(res.thumbnail);

            // 将对应的分类显示出来 
            $('#category > option').each((index, item) => {
                // 判断option里面的value属性的值与res.category的值是否相等 如果相等 就表示是这个分类 给其设置一个selected 
                if ($(item).attr('value') == res.category) {
                    $(item).prop('selected', true);
                }
            });


            $('#status > option').each((index, item) => {
                // 判断option里面的value属性的值与res.category的值是否相等 如果相等 就表示是这个分类 给其设置一个selected 
                if ($(item).attr('value') == res.state) {
                    $(item).prop('selected', true);
                }
            });

            $('#created').val(res.createAt && 　res.createAt.substr(0, 16));

            // 将保存按钮隐藏 将编辑按钮显示出来 
            $('#pAdd').hide();
            $('#pEdit').show();

        }
    })
}


function getUrlParams(name) {
    let paramsAry = location.search.substr(1).split('&');
    for (let i = 0; i < paramsAry.length; i++) {
        let tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1]
        }
    }
    return -1;
}


// 给编辑按钮注册点击事件 发送ajax 完成对文章的编辑功能  当编辑完成以后 我们需要让页面跳转到posts.html页面
$('#pEdit').on('click', function() {
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: $('form').serialize(),
        success: function(res) {
            location.href = "posts.html";
        }
    });
});
// 展示用户的相关信息
$.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function(response) {
        // console.log(response);
        $('.avatar').attr('src', response.avatar)
        $('.profile .name').html(response.nickName)
    }
})