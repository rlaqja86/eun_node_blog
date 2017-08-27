Dropzone.autoDiscover = false;

var myDropzone = new Dropzone('#myDrop', {
    url: "/admin/save",
    method: "post",
    autoProcessQueue: false,
    paramName: "files",
    params  : {
                sessionHash :  $('#image-name').val(),
                path : 'fdhgfdhgfdhgdfhg'
            },
    maxFileSize: 10,
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
            
            formData.append(file.name + "_name",  $(`#${selector}_name`).val());
            formData.append(file.name + "_description", $(`#${selector}_description`).val());
            formData.append(file.name + "_mainimage", $(`#${selector}_mainimage`).is(':checked'));     

            formData.append("projectname", $('#image-name').val());     
            formData.append("projectdescription", $('#image-description').val());     
            formData.append("projectsite", $('#image-site').val());     
            formData.append("projectdate", $('#image-date').val());     
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
    $(id).append(`<label> project description <input id="${selector}_description" type=text name="description">`)
    $(id).append(`<label> project name <input id="${selector}_name" type=text name="date">`)
    $(id).append(`<label> main image <input id="${selector}_mainimage" class="main-image-checkbox" type=checkbox name="mainimage">`
)
    var inputBox = $('#' + selector + '_mainimage');
    inputBox.click(function() {
        $('.main-image-checkbox').prop('checked', false);
        inputBox.prop('checked', true);
    });
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