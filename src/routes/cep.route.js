
const router = require('express-promise-router')();
const controller = require('../controllers/cep.controller');

const verifyToken = require('../middleware/authMiddleware');

router.get('/cep/:codCep', verifyToken, controller.listAll);

module.exports = router;