$(document).ready(function() {
    var $trigger = $('#pages>#page');

    $trigger.on('click', function() {
        var page = $(this).data('page');

        $.ajax({
            async: true,
            url: "/page/" + page,
            dataType: "json",
            success: function(data) {
                var project = `<script src="/js/mouse_event.js"></script>`;
                $.each(data, function(index, item) {
                    project += `<div id ='project' data-image='${item.mainImage}' data-description='${item.description}'>`;
                    project += `<a href='/project/${item.name}'>`;
                    project += `<div>${item.name}</div>`;
                    project += `<img src='/uploads/${item.thumbnailImage}' alt='thumbnail image'`;
                    project += `</a></div>`;
                })
                $('#projects').html(project);
            }
        });
    });
});