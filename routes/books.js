exports.list = function(req, res, next) {
    var title = '%' +req.params.title+ '%';
    req.getConnection(function(err, connection) {
         var query = connection.query('SELECT * FROM books WHERE title LIKE ?', title, function(err, rows) {
            if (err){
                next(err);
            }
            res.send(rows);
         });
     });
};

//save book
exports.save = function(req, res, next) {
    var input = req.body;
    req.getConnection(function(err, connection) {
        var query = connection.query('INSERT INTO books SET ?', input, function(err, rows) {
            if (err) {
                next(err);
            }
            res.send(rows);
        });
    });
};