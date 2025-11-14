
const router = require('express-promise-router')();
const controller = require('../controllers/clienteendereco.controller');

const verifyToken = require('../middleware/authMiddleware');

router.get('/clienteendereco', verifyToken, controller.listAll);
router.post('/clienteendereco', verifyToken, controller.create);
router.get('/clienteendereco/:id', verifyToken, controller.findById);
router.put('/clienteendereco/:id', verifyToken, controller.update);
router.delete('/clienteendereco/:id', verifyToken, controller.delete);

module.exports = router;