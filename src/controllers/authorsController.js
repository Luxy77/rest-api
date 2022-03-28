const mysqlConnection = require('../database');

controller = {}
controller.displayAuthors = (_req, res) => {
    mysqlConnection.query('SELECT * FROM authors', (err, rows, _fields) => {
        if(!err){
            res.json(rows);
        }else{
            return res.status(500).json({Status: 'Error', Error: err});
        };
    });
};  

controller.displayAuthorsId = (req, res) => {
    const { author_id } = req.params;
    mysqlConnection.query('SELECT * FROM authors WHERE author_id = ?', [author_id], (err, rows, _fields) => {
        if(!err){
            res.json(rows[0]);
        }else{
            return res.status(500).json({Status: 'Error', Error: err});
        };
    });
};

controller.createAuthors = (req, res) => {
    const { author_id, name, gender, nationality } = req.body;
     `INSERT INTO authors (author_id, name, gender, nationality) VALUES (?,?,?,?)`;
    mysqlConnection.query('INSERT INTO authors (author_id, name, gender, nationality) VALUES (?,?,?,?)',
    [author_id, name, gender, nationality], (err, _rows, _fields) => {
        if(!err){
            res.json({Status: 'The author has been created'});
        }else{
            return res.status(500).json({Status: 'Error', Error: err});
        };
    });
};

controller.updateAuthors = (req, res) => {
    const { name, nationality, gender } = req.body;
    const { author_id } = req.params;
    const query = `
        UPDATE authores
        SET 
        name = name, 
        gender = gender,
        nationality = nationality
        WHERE author_id = author_id`;

    mysqlConnection.query(query, [author_id, name, nationality, gender], (err, _rows, _fields) => {
        if(!err){
            res.json({Status: 'The author has been updated'});
        }else{
           return res.status(500).json({Status: 'Error', Error: err});
        };
    });
};    

controller.deleteAuthors = (req, res, next) => {
    const { author_id } = req.params;  
    mysqlConnection.query('DELETE FROM authors WHERE author_id = ?', [author_id], (err, _rows, _fields) => {
       if(!err){
           res.json({Status: "The changes has been saved"});
       }else{
           return res.status(500).json({Status: 'Error', Error: err});
       };    
    }); 
   const query =`DELETE FROM books WHERE author_id = ?`
   mysqlConnection.query(query, [author_id], (err, _rows, _fields) => {
       if(err){
           throw err;
       };    
   }); 
};    

module.exports = controller;