$(document).ready(function() {
    var trigger = '#projects>#project>a>.caption';
    var latestImage = $("#projects").data('latest_image');
    var latestName = $("#projects").data('latest_name');
    var latestDescription = $("#projects").data('latest_description');
    var latestDate = $("#projects").data('latest_date');
    var $image = $('#projectPreview>img');
    var $caption = $('#projectPreview>a>.caption');

    $(document).on('mouseover', trigger, function() {
        var image = $(this).data('image'),
            name = $(this).data('name'),
            description = $(this).data('description'),
            date = $(this).data('date');

        $image.attr('src', '/uploads/' + image);
        $caption.html(`${name}<br>${date}`);
    });

    $(document).on('mouseout', trigger, function() {
        $image.attr('src', '/uploads/' + latestImage);
        $caption.html(`${latestName}<br>${latestDate}`);
    });
});