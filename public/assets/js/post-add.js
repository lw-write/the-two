$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        let html = template('categorypl', { data: res });
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
            $('#thumbnail').val(res[0].cover);
        }
    })
})
$('#addForm').on('submit', function() {
    let formData = $(this).serialize();
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