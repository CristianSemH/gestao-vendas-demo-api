
const router = require('express-promise-router')();
const controller = require('../controllers/formaPagamento.controller');

const verifyToken = require('../middleware/authMiddleware');

router.get('/formaPagamento/:limit/:offset/:filter?', verifyToken, controller.listAll);
router.post('/formaPagamento', verifyToken, controller.create);
router.get('/formaPagamento/:id', verifyToken, controller.findById);
router.put('/formaPagamento/:id', verifyToken, controller.update);
router.delete('/formaPagamento/:id', verifyToken, controller.delete);

module.exports = router;