$(document).ready(function() {
    var trigger = '#projects>#project>a>.caption';
    var latestImage = $("#projects").data('latest_image');
    var latestDescription = $("#projects").data('latest_description');
    var latestDate = $("#projects").data('latest_date');
    var $image = $('#projectPreview>img');
    var $description = $('#projectPreview>a>.caption');

    $(document).on('mouseover', trigger, function() {
        var image = $(this).data('image'),
            description = $(this).data('description'),
            date = $(this).data('date');

        $image.attr('src', '/uploads/' + image);
        $description.html(`${description}<br>${date}`);
    });

    $(document).on('mouseout', trigger, function() {
        $image.attr('src', '/uploads/' + latestImage);
        $description.html(`${latestDescription}<br>${latestDate}`);
    });
});