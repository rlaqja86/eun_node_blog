Dropzone.autoDiscover = false;

var myDropzone = new Dropzone('#myDrop', {
    url: "/admin/save",
    method: "post",
    autoProcessQueue: false,
    paramName: "files",
    maxFileSize: 100,
    maxFile: 10,
    parallelUploads: 10000,
    uploadMultiple: true,
    init: function() {
        myDropzone = this;
        this.on("addedfile", function(file) {
            var selector = (file.name.split('.')[0])
            if (!checkDuplicateFile(this, file)) {
                drawAdditionalInput(selector);
            }
        });
        this.on('sending', function(file, xhr, formData){
            var selector = specialCharRemove((file.name.split('.')[0]))

            formData.append("imageName",  $(`#${selector}_name`).val());
            formData.append("imageDescription", $(`#${selector}_description`).val());
            formData.append("isMainImage", $(`#${selector}_mainimage`).is(':checked'));     

            formData.set("projectname", $('#image-name').val());     
            formData.set("projectdescription", $('#image-description').val());     
            formData.set("projectsite", $('#image-site').val());     
            formData.set("projectdate", $('#image-date').val());     
        });
    }
});

function checkDuplicateFile(dropzone, file) {
    if (dropzone.files.length) {
        var length;
        var isDuplicate = false;
        for (var index = 0, length = dropzone.files.length - 1; index < length; index++) {
            if (dropzone.files[index].name === file.name) {
                isDuplicate = true;
                alert("중복된 파일명이 존재합니다.");
                dropzone.removeFile(file);
            }
        }
    }
    return isDuplicate;
}

function drawAdditionalInput(selector) {
    selector = specialCharRemove(selector);
    var id = '#' + selector;
    $(id).append(`<label> 이미지명 <input id="${selector}_name" type=text name="date">`)
    $(id).append(`<label> 이미지 설명 <input id="${selector}_description" type=text name="description">`)
    $(id).append(`<label> Main 이미지 설정 <input id="${selector}_mainimage" class="main-image-checkbox" type=checkbox name="mainimage">`
)
    var inputBox = $('#' + selector + '_mainimage');
    inputBox.click(function() {
        $('.main-image-checkbox').prop('checked', false);
        inputBox.prop('checked', true);
    });

    if($('.main-image-checkbox').length < 2) {
        $('.main-image-checkbox').attr('checked',true);
    }
}

function specialCharRemove(selector) {
    var pattern = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/gi;
    if (pattern.test(selector)) {
        selector = selector.replace(pattern, "");
    }
    return selector
}

$('#sub-image-submit').click(function() {
    myDropzone.processQueue();
});