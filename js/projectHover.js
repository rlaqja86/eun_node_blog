$(document).ready(function() {
    var inTrigger = '#projectListItemCaption';
    var outTrigger = '#projectListBox';
    var latestImage = $("#projectListBox").data('latest_image');
    var latestName = $("#projectListBox").data('latest_name');
    var latestDescription = $("#projectListBox").data('latest_description');
    var latestDate = $("#projectListBox").data('latest_date');
    var $image = $('#projectPreviewImage');
    var $caption = $('#projectPreviewCaption');

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