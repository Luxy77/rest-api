const mysqlConnection = require('../database');

controller = {}

controller.displayBooks =  (req, res) => {
    const query = `
        SELECT * 
        FROM books 
        INNER JOIN authors
        ON authors.author_id = books.author_id`;

    mysqlConnection.query(query, (err, rows, _fields) => {
        if(!err){
            res.json(rows);
        }else {
            return res.status(500).json({Status: 'Error', Error: err});
        };
    });
};

controller.books = (req, res) => {
    res.render('books');
}

controller.createBooks = (req, res) => {
    const { book_id, title, author_id } = req.body;
    mysqlConnection.query('SELECT * FROM authors WHERE author_id = ?', author_id, (err, rows, _fields) => {
        if(!err){
            if(rows.length == 0){
             return res.status(500).json({Status: 'Error', Error: 'The author is not yet registered'})
            };  
        }else {
            return res.status(500).json({Status: 'Error', Error: err});        
        }; 
    });
    
    
    const query = 'INSERT INTO books (book_id, title, author_id) VALUES (?,?,?)';

    mysqlConnection.query(query, [book_id, title, author_id],(err, _rows, _fields) => {
        if(!err){
            res.json({Status: 'The book has been saved'})
        }else {  
            return res.status(500).json({Status: 'Error', Error: err});
        };
    });
};

controller.updateBooks = (req, res) => {
    const { title, author_id} = req.body;
    const { book_id } = req.params;
    const query = ` 
        UPDATE books	
        SET
        title = title,
        author_id = author_id
        WHERE book_id = book_id;`;
        
    mysqlConnection.query(query, [book_id, title, author_id], (err, _rows, _fields) => {
        if(!err){
            res.json({Status: 'The book has been updated'});
        }else {
            return res.status(500).json({Status: 'Error', Error: err});
        };
    });
};

controller.deleteBooks = (req, res) => {
    const { id } = req.params;  
        mysqlConnection.query('DELETE FROM books WHERE book_id = ?', [id], (err, _rows, _fields) => {
            if(!err){
                res.json({Status: "The book has been deleted"});
            }else {
                return res.status(500).json({Status: 'Error', Error: err});
        };
    });
};    

module.exports = controller;