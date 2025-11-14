
const router = require('express-promise-router')();
const controller = require('../controllers/cliente.controller');

const verifyToken = require('../middleware/authMiddleware');

router.get('/cliente/:limit/:offset/:filter?', verifyToken, controller.listAll);
router.post('/cliente', verifyToken, controller.create);
router.get('/cliente/:id', verifyToken, controller.findById);
router.put('/cliente/:id', verifyToken, controller.update);
router.delete('/cliente/:id', verifyToken, controller.delete);

module.exports = router;