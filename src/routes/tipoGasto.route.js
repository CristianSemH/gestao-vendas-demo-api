
const router = require('express-promise-router')();
const controller = require('../controllers/tipoGasto.controller');

const verifyToken = require('../middleware/authMiddleware');

router.get('/tipoGasto/:limit/:offset/:filter?', verifyToken, controller.listAll);
router.post('/tipoGasto', verifyToken, controller.create);
router.get('/tipoGasto/:id', verifyToken, controller.findById);
router.put('/tipoGasto/:id', verifyToken, controller.update);
router.delete('/tipoGasto/:id', verifyToken, controller.delete);

module.exports = router;