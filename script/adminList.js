$(function() {
    $('.getDetail').on('click', function() {
        location.href = "/admin/detail/" + $(this).data('project')
    })

     $('.deleteDetail').on('click', function() {
        location.href = "/admin/delete/" + $(this).data('project')
    })
})