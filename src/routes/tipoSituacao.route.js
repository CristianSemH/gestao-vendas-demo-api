
const router = require('express-promise-router')();
const controller = require('../controllers/tipoSituacao.controller');

const verifyToken = require('../middleware/authMiddleware');

router.get('/tipoSituacao/:tipo/:limit/:offset/:filter?', verifyToken, controller.listAll);
router.post('/tipoSituacao/:tipo', verifyToken, controller.create);
router.get('/tipoSituacao/:tipo/:id', verifyToken, controller.findById);
router.put('/tipoSituacao/:tipo/:id', verifyToken, controller.update);
router.delete('/tipoSituacao/:tipo/:id', verifyToken, controller.delete);

module.exports = router;