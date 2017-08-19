var fs = require('fs');

module.exports = function(path, fileName) {
    console.log(path);
    fs.readdir(path, function(err, fileList) {
        if (err) {
            console.log("경로잘못");
            return -1; // 잘못된 경로
        } else {
            fs.readFile(path + fileName, 'utf8', function(err, fileContent) {
                if (err) {
                    console.log("파일없음");
                    return 0; // 파일 없음
                } else {
                    console.log("파일있음");
                    return 1; // 파일 있음
                }
            });
        }
    });
}