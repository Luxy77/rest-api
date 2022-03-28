const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authorsController'); 

router.get('/', controller.displayAuthors);
router.get('/:author_id', controller.displayAuthorsId);
router.post('/', controller.createAuthors);
router.delete('/:author_id', controller.deleteAuthors);
router.put('/:author_id', controller.deleteAuthors);



module.exports = router;