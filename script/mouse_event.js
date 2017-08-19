$(document).ready(function() {
    var $trigger = $('#projects>div');

    $trigger.on('mouseover', function() {
        var imageName = $(this).data('image'),
            description = $(this).data('description'),
            $mainImage = $('#main>img'),
            $description = $('#main>a>div'),
            $thisText = $(this).find('a>div');
        $mainImage.attr('src', '/uploads/' + imageName);
        $description.text(description);

        // div height를 100%로 늘리고나서 :hover로 처리하는게 더 간단할까
        // 아니면 여기다 몰아놓는게 관리하기편할까
        $thisText.css("color", "#ffca28");
        $thisText.css("font-weight", "bold");
        $thisText.css("font-size", "16px");

    });

    $trigger.on('mouseout', function() {
        var imageName = $('#projects>div:nth-child(2)').data('image'),
            description = $('#projects>div:nth-child(2)').data('description'),
            $mainImage = $('#main>img'),
            $description = $('#main>a>div'),
            $thisText = $(this).find('a>div');
        $mainImage.attr('src', '/uploads/' + imageName);
        $description.text(description);
        $thisText.css("color", "white");
        $thisText.css("font-weight", "normal");
        $thisText.css("font-size", "14px");
    });

});