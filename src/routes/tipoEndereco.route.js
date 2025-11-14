
const router = require('express-promise-router')();
const controller = require('../controllers/tipoEndereco.controller');

const verifyToken = require('../middleware/authMiddleware');

router.get('/tipoEndereco/:limit/:offset/:filter?', verifyToken, controller.listAll);
router.post('/tipoEndereco', verifyToken, controller.create);
router.get('/tipoEndereco/:id', verifyToken, controller.findById);
router.put('/tipoEndereco/:id', verifyToken, controller.update);
router.delete('/tipoEndereco/:id', verifyToken, controller.delete);

module.exports = router;