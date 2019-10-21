$.ajax({
    type: 'get',
    url: '/posts',
    success: function(res) {
        let html = template('postsTpl', res);
        $('#postsBox').html(html);
        let page = template('pageTpl', res)
        $('#page').html(page)
    }
})

function formateDate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: { page: page },
        success: function(res) {
            let html = template('postsTpl', res);
            $('#postsBox').html(html);
            let page = template('pageTpl', res)
            $('#page').html(page)
        }
    })
}

$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        let html = template('categoryTpl', { data: res })
        $('#categoryBox').html(html);
    }
})

$('#filterForm').on('submit', function() {
    let formDate = $(this).serialize();
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formDate,
        success: function(res) {
            let html = template('postsTpl', res);
            $('#postsBox').html(html);
            let page = template('pageTpl', res)
            $('#page').html(page)
        }
    })
    return false;
})

$('#postsBox').on('click', '.delete', function() {
    if (confirm("你真的要甩了我吗?")) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function() {
                location.reload();
            }
        });
    }
})