
const router = require('express-promise-router')();
const controller = require('../controllers/orcamentoVendaItem.controller');

const verifyToken = require('../middleware/authMiddleware');

router.get('/orcamentoVendaItems', verifyToken, controller.listAll);
router.post('/orcamentoVendaItem', verifyToken, controller.create);
router.get('/orcamentoVendaItem/:id', verifyToken, controller.findById);
router.put('/orcamentoVendaItem/:id', verifyToken, controller.update);
router.delete('/orcamentoVendaItem/:id', verifyToken, controller.delete);

module.exports = router;