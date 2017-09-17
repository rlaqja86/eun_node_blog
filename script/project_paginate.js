$(document).ready(function() {
    var trigger = '#more';

    $(document).on('click', trigger, function() {
        var next = $(this).data('next');
        var max = $(this).data('max');

        if (next <= max) {

            $(this).data('next', next + 1);

            $.ajax({
                async: true,
                url: `/page/${next}`,
                dataType: "json",
                success: function(data) {
                    var project = ``;
                    $.each(data, function(index, item) {
                        project += `<div id ='project'>`;
                        project += `<img src='/uploads/${item.images.image}' alt='${item.name}'>`;
                        project += `<a href='/project/${item.name}'>`;
                        project += `<div class='caption' data-image='${item.images.image}' data-name='${item.name}' data-description='${item.description}' data-date='${item.date}'>${item.name}</div></a></div>`;
                    })
                    $('#projects').append(project);
                }
            });
            if (next === max) {
                $(this).css('display', 'none');
            }

        }
    });
});