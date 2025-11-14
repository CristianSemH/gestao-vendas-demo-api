
const router = require('express-promise-router')();
const controller = require('../controllers/produto.controller');

const verifyToken = require('../middleware/authMiddleware');

router.get('/produto/:limit/:offset/:filter?', verifyToken, controller.listAll);
router.post('/produto', verifyToken, controller.create);
router.get('/produto/:id', verifyToken, controller.findById);
router.put('/produto/:id', verifyToken, controller.update);
router.delete('/produto/:id', verifyToken, controller.delete);

module.exports = router;