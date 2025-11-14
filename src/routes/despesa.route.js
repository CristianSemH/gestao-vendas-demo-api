
const router = require('express-promise-router')();
const controller = require('../controllers/despesa.controller');

const verifyToken = require('../middleware/authMiddleware');

router.get('/despesa/:limit/:offset/:filter?', verifyToken, controller.listAll);
router.post('/despesa', verifyToken, controller.create);
router.get('/despesa/:id', verifyToken, controller.findById);
router.put('/despesa/:id', verifyToken, controller.update);
router.delete('/despesa/:id', verifyToken, controller.delete);

module.exports = router;