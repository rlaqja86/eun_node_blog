$(document).ready(function() {
    var trigger = '#projects>#project>a>.caption';
    var latestImage = $("#projects").data('latest_image');
    var latestDescription = $("#projects").data('latest_description');
    var $image = $('#projectPreview>img');
    var $description = $('#projectPreview>a>.caption');

    $(document).on('mouseover', trigger, function() {
        var image = $(this).data('image'),
            description = $(this).data('description');

        $image.attr('src', '/uploads/' + image);
        $description.text(description);
    });

    $(document).on('mouseout', trigger, function() {
        $image.attr('src', '/uploads/' + latestImage);
        $description.text(latestDescription);
    });
});