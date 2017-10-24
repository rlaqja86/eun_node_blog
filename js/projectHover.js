$(document).ready(function() {
    var inTrigger = '#item>a>.caption';
    var outTrigger = '#box';
    var latestImage = $("#box").data('latest_image');
    var latestName = $("#box").data('latest_name');
    var latestDescription = $("#box").data('latest_description');
    var latestDate = $("#box").data('latest_date');
    var $image = $('#projectPreview>img');
    var $caption = $('#projectPreview>a>.caption');

    $(document).on('mouseenter', inTrigger, function() {
        var image = $(this).data('image'),
            name = $(this).data('name'),
            description = $(this).data('description'),
            date = $(this).data('date');

        $image.attr('src', '/uploads/' + image);
        $caption.html(`${name}<br>${date}`);
    });

    $(document).on('mouseleave', outTrigger, function() {
        $image.attr('src', '/uploads/' + latestImage);
        $caption.html(`${latestName}<br>${latestDate}`);
    });

    // $(document).on('mouseover', trigger, function() {
    //     var image = $(this).data('image'),
    //         name = $(this).data('name'),
    //         description = $(this).data('description'),
    //         date = $(this).data('date');

    //     $image.attr('src', '/uploads/' + image);
    //     $caption.html(`${name}<br>${date}`);
    // });

    // $(document).on('mouseout', trigger, function() {
    //     $image.attr('src', '/uploads/' + latestImage);
    //     $caption.html(`${latestName}<br>${latestDate}`);
    // });
});