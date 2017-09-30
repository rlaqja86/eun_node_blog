$(document).ready(function() {
    var trigger = '#projectPreview>img';
    var frameWidth = $('#projectPreview').width();
    var frameHeight = $('#projectPreview').height();
    var frameRatio = frameWidth / frameHeight;

    $(trigger).bind('load', imageResizeSmall);

    function imageResizeSmall(e) {
        var originImageWidth = $(this).get(0).naturalWidth;
        var originImageHeight = $(this).get(0).naturalHeight;
        var imageRatio = originImageWidth / originImageHeight;
        if (imageRatio > frameRatio) { // 너비 > 높이
            $(this).css({ 'width': '100%', 'height': 'auto' });
            // var imageHeight = frameWidth / imageRatio;
            // var paddingTop = (frameHeight - imageHeight) / 2.0;
            // $(this).css({ 'padding-top': paddingTop + 'px' });
        } else { // 너비 < 높이
            $(this).css({ 'width': 'auto', 'height': '100%', });
            // $(this).css({ 'padding-top': '0px' });
        }
    }

    function imageResizeLarge(e) {
        var originImageWidth = $(this).get(0).naturalWidth;
        var originImageHeight = $(this).get(0).naturalHeight;
        var imageRatio = originImageWidth / originImageHeight;
        if (imageRatio > frameRatio) { // 너비 > 높이
            $(this).css({ 'width': 'auto', 'height': '100%', });
        } else { // 너비 < 높이
            $(this).css({ 'width': '100%', 'height': 'auto' });
        }
    }

});