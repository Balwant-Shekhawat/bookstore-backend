const expressValidator = require('express-validator');
const connection = require('./../../lib/db');


exports.getCategories = (req, res) => {
    connection.execute('SELECT b.category_id, c.category_name, COUNT(*) AS books FROM category c INNER JOIN books b ON c.id = b.category_id WHERE b.category_id > 0 GROUP BY b.category_id', function(err, results, fields) {
        if(err) {
            return res.status(200).send({
                status: 0,
                msg: err.message,
                data: []   
            })
        }

        return res.status(200).send({
            status: 1,
            msg: "Books categories available",
            data: results       
        })    
    });        
}

exports.list = (req, res) => {
    let itemPerPage = 10;
    let page = req.query.page || 1;
    let skip = (itemPerPage * page) - itemPerPage;
    let categoryId = req.query.cat || null;
    let order = req.query.order || 'DESC';
    let sortBy = req.query.sort || 'book_rating';
    let id = 1;

    console.log("FILTER", sortBy);

    

    let sql = 'SELECT id, book_name, book_image, is_instock,author,category_id, book_mrp, book_discount, book_selling_price, book_rating FROM books WHERE author IS NOT NULL AND category_id IS NOT NULL   AND  book_name IS NOT NULL AND book_image IS NOT NULL AND category_id > 0';
    
    sql += (categoryId)?' AND category_id = ' + categoryId :'';
    sql += ' ORDER BY ' + sortBy + ' ' + order;
    sql += ' LIMIT ' + skip + ' , ' + itemPerPage;

    let query = connection.query(sql, function(err, results, fields) {    
        if(err) {
            console.log("ERROR", err);
            return res.status(200).send({
                status: 0,
                msg: err.message,
                data: []   
            })
        }
        return res.status(200).send({
            status: 1,
            msg: 'Books listing',
            data: results   
        });
    
    });
    console.log(query.sql);
}
