const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

router.get('/', controller.displayBooks);
router.post('/', controller.createBooks);
router.put('/:book_id', controller.updateBooks);
router.delete('/:book_id', controller.deleteBooks); 
router.get('/books', (req, res) => {
    res.render('books')
});

module.exports = router;