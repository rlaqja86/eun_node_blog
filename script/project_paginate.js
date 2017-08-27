$(document).ready(function() {
    var trigger = '#pages>#page';

    $(document).on('click', trigger, function() {
        var page = $(this).data('page');

        $.ajax({
            async: true,
            url: "/page/" + page,
            dataType: "json",
            success: function(data) {
                var project = ``;
                $.each(data, function(index, item) {
                    project += `<div id ='project'>`;
                    project += `<img src='/uploads/${item.images.image}' alt='thumbnail image'>`;
                    project += `<a href='/project/${item.name}'>`;
                    project += `<div class='caption' data-image='${item.images.image}' data-description='${item.description}'>${item.name}</div></a></div>`;
                })
                $('#projects').html(project);
                $('#pages>#page').css("font-size", "14px");
                $('#page.' + page).css("font-size", "20px");
            }
        });
    });
});