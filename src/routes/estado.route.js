
const router = require('express-promise-router')();
const controller = require('../controllers/estado.controller');

const verifyToken = require('../middleware/authMiddleware');

router.get('/estado', controller.listAll);
router.post('/estado', controller.create);
router.get('/estado/:id', controller.findById);
router.put('/estado/:id', controller.update);
router.delete('/estado/:id', controller.delete);

module.exports = router;