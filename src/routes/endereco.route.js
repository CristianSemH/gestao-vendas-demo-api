
const router = require('express-promise-router')();
const controller = require('../controllers/endereco.controller');

const verifyToken = require('../middleware/authMiddleware');

router.get('/endereco/cliente/:id', verifyToken, controller.listAllForCliente);
router.get('/endereco', verifyToken, controller.listAll);
router.post('/endereco', verifyToken, controller.create);
router.get('/endereco/:id', verifyToken, controller.findById);
router.put('/endereco/:id', verifyToken, controller.update);
router.delete('/endereco/:id', verifyToken, controller.delete);

module.exports = router;