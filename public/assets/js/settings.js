$('#logo').on('change', function() {
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
            $('img').show().attr('src', res[0].cover)
        }
    })
})