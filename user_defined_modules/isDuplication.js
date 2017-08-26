var fs = require('fs');

module.exports = function(path, fileName) {
    console.log('함수시작');
    var result = 100;
    fs.readdir(path, function(err, fileList) {
        if (err) {
            console.log("경로잘못");
            result = -1; // 잘못된 경로
        } else {
            fs.readFile(path + fileName, 'utf8', function(err, fileContent) {
                if (err) {
                    console.log("파일없음");
                    result = 0; // 파일 없음
                } else {
                    console.log("파일있음");
                    console.log(result);

                    result = 1; // 파일 있음
                }
            });
        }
    });
    setTimeout(function() {
        console.log('리턴직전 : ' + result);
        return result;
    }, 3000);

}