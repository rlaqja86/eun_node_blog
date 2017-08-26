$(document).ready(function() {
    var trigger = '#projects>#project>a>.caption';
    var latestImage = $("#projects").data('latest_image');
    var latestDescription = $("#projects").data('latest_description');
    var $mainImage = $('#main>img');
    var $description = $('#main>a>.caption');

    $(document).on('mouseover', trigger, function() {
        var imageName = $(this).data('image'),
            description = $(this).data('description');

        $mainImage.attr('src', '/uploads/' + imageName);
        $description.text(description);
    });

    $(document).on('mouseout', trigger, function() {
        $mainImage.attr('src', '/uploads/' + latestImage);
        $description.text(latestDescription);
    });
});