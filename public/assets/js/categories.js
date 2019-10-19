$('#addCategory').on('submit', function() {
    let formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function() {
            location.reload();
        }
    })
    return false;
})

$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        console.log(res)
        let html = template('categoryListTpl', { data: res })
        $('#categoryBox').html(html);
    }
})

$('#categoryBox').on('click', '.edit', function() {
    let id = $(this).attr('data-id')
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(res) {
            let html = template('modifyCategoryTpl', res)
            $('#formBox').html(html);
        }
    })
})

$('#formBox').on('submit', '#modifyCategory', function() {
    let formData = $(this).serialize();
    let id = $(this).attr('data-id')
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function() {
            location.reload();
        }
    })
    return false;
})

$('#categoryBox').on('click', '.delete', function() {
    if (confirm('您真的要执行删除操作吗？')) {
        let id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function() {
                location.reload();
            }
        })
    }
})