$(document).ready(function() {
    var $trigger = $('#projects>#project'),
        $mainImage = $('#main>img'),
        $description = $('#main>a>div');

    var latestImage = $("#projects").data('latest_image');
    var latestDescription = $("#projects").data('latest_description');
    console.log(latestImage);
    console.log(latestDescription);


    $trigger.on('mouseover', function() {
        var imageName = $(this).data('image'),
            description = $(this).data('description'),
            $thisText = $(this).find('a>div');

        $(top.document).find('#main>img').attr('src', '/uploads/' + imageName);

        $mainImage.attr('src', '/uploads/' + imageName);
        $description.text(description);

        // div height를 100%로 늘리고나서 :hover로 처리하는게 더 간단할까
        // 아니면 여기다 몰아놓는게 관리하기편할까
        $thisText.css("color", "#ffca28");
        $thisText.css("font-weight", "bold");
        $thisText.css("font-size", "16px");

    });

    $trigger.on('mouseout', function() {
        var $thisText = $(this).find('a>div');

        $mainImage.attr('src', '/uploads/' + latestImage);
        $description.text(latestDescription);
        $thisText.css("color", "white");
        $thisText.css("font-weight", "normal");
        $thisText.css("font-size", "14px");
    });

});