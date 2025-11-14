
const router = require('express-promise-router')();
const controller = require('../controllers/user.controller');

const verifyToken = require('../middleware/authMiddleware');

router.get('/users/:limit/:offset/:filter?', verifyToken, controller.listAll);
router.post('/users', verifyToken, controller.create);
router.post('/users/login', controller.login);
router.get('/users/:id', verifyToken, controller.findById);
router.put('/users/:id', verifyToken, controller.update);
router.delete('/users/:id', verifyToken, controller.delete);
router.post('/users/default', controller.createDefaultUser);

module.exports = router;