
var MongoClient = require('mongodb').MongoClient,
    path = require('path'),
    DB_CONSTANT = require(path.join(__dirname, '../DB_CONSTANT'));

module.exports = {
  getId: function(collectionName, name) {
    return MongoClient.connect(DB_CONSTANT.url).then(function(db) {
      var collection = db.collection(collectionName);
       return db.collection(collectionName).findAndModify( 
            {"_id" : name},
            [['_id','asc']],
            { $inc: { seq: 1 } },
            { 
                new: true, 
                upsert: true
            });
    }).then(function(items) {
      return items;
    });
  }
};

/*

exports.getId = function(collectionName, name) {
    MongoClient.connect(url, function(err, db) {
        if (err) 
            console.log("error occured at getNextSequenc : " + err);{
        }
        db.collection(collectionName).findAndModify( 
            {"_id" : name},
            [['_id','asc']],
            { $inc: { seq: 1 } },
            { 
                new: true, 
                upsert: true
            }, function(err, doc) {
               return doc.value.seq;
            });
        db.close();
    });
}*/
