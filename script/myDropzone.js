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
            var image = new Image();

            image.name = $(`#${selector}_name`).val();
            image.description = $(`textarea#${selector}_description`).val();
            image.isMain =  $(`#${selector}_mainimage`).is(':checked');

            formData.append(`images`, JSON.stringify(image));     
            
            formData.set("fileNameSelector", selector);
            formData.set("projectname", $('#project-name').val());     
            formData.set("projectdescription", $('textarea#project-description').val());     
            formData.set("projectsite", $('#project-site').val());     
            formData.set("projectdate", $('#project-date').val());  
            
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

    $(id).append(` <div class="panel panel-primary">
            <div role="tab" class="panel-heading">
              <h4 class="image-header panel-title">이미지 상세 정보 입력</h4>
              <button id="${selector}-delete" class="image-delete btn btn-danger"> 삭제 </button>
            </div>
            <div class="panel-body">
              <div id="pannelImage-${selector}" class="pannel-preview-image">
              </div>
              <div class="pannel-preview-input">
                    <div class="control-pannel-image-label">
                        <label for="projectname" class="control-label">이미지명</label>
                    </div>
                    <div class="control-pannel-image-value">
                        <input id="${selector}_name" type=text name="date">
                    </div>
                    <div class="control-pannel-image-label">
                        <label for="description" class="control-label">설명</label>
                    </div>
                    <div class="control-pannel-image-value">    
                        <textarea id="${selector}_description" name="imageDescription" style="width:250px;height:100px;"></textarea>
                    </div>
                   <div class="control-pannel-image-label">
                        <label for="site" class="control-label">메인</label>
                   </div>
                    <div class="control-pannel-image-value">
                        <input id="${selector}_mainimage" class="form-check-input " type=checkbox name="mainimage">
                    </div>
                </div>
            </div>`)

    var inputBox = $('#' + selector + '_mainimage');
    inputBox.click(function() {
        $('.main-image-checkbox').prop('checked', false);
        inputBox.prop('checked', true);
    });

    if($('.form-check-input').length < 2) {
        $('.form-check-input ').attr('checked',true);
    }   

    replaceDefaultIdToUniqueId(selector);
    appendImageAndProgressBarToUniqueId(selector);

}

function replaceDefaultIdToUniqueId(selector) {
    $('#dz-image-id').attr('id', `dz-image-id-${selector}`);
    $('#dz-progress-id').attr('id', `dz-progress-id-${selector}`);
}

function appendImageAndProgressBarToUniqueId(selector) {
    console.log(selector)
    $(`#dz-image-id-${selector}`).appendTo(`#pannelImage-${selector}`);
    $(`#dz-progress-id-${selector}`).appendTo(`#dz-image-id-${selector}`);
    
}

function specialCharRemove(selector) {
    var pattern = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/gi;
    if (pattern.test(selector)) {
        selector = selector.replace(pattern, "");
    }
    return selector
}

$('#sub-project-submit').on('click', function() {
    myDropzone.processQueue();
});

$('.image-delete').on('click', function() {
   console.log('heee')
})

var Image = function () {
    var name;
    var description;
    var isMain;
}