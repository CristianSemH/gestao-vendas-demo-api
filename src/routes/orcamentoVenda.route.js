
const router = require('express-promise-router')();
const controller = require('../controllers/orcamentoVenda.controller');

const verifyToken = require('../middleware/authMiddleware');

router.get('/orcamentoVenda/:limit/:offset/:filter?', verifyToken, controller.listAll);
router.post('/orcamentoVenda', verifyToken, controller.create);
router.get('/orcamentoVenda/:id', verifyToken, controller.findById);
router.put('/orcamentoVenda/:id', verifyToken, controller.update);
router.delete('/orcamentoVenda/:id', verifyToken, controller.delete);
module.exports = router;