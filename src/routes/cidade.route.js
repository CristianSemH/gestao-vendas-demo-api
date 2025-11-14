
const router = require('express-promise-router')();
const controller = require('../controllers/cidade.controller');

const verifyToken = require('../middleware/authMiddleware');

router.get('/cidade', verifyToken, controller.listAll);
router.get('/cidade/:estadoId', verifyToken, controller.listAllforEstado);
router.post('/cidade', verifyToken, controller.create);
router.get('/cidade/:id', verifyToken, controller.findById);
router.put('/cidade/:id', verifyToken, controller.update);
router.delete('/cidade/:id', verifyToken, controller.delete);

module.exports = router;