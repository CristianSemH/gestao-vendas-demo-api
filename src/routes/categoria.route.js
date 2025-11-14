
const router = require('express-promise-router')();
const controller = require('../controllers/categoria.controller');

const verifyToken = require('../middleware/authMiddleware');

router.get('/categoria/:limit/:offset/:filter?', verifyToken, controller.listAll);
router.post('/categoria', verifyToken, controller.create);
router.get('/categoria/:id', verifyToken, controller.findById);
router.put('/categoria/:id', verifyToken, controller.update);
router.delete('/categoria/:id', verifyToken, controller.delete);

module.exports = router;