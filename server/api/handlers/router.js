const router = require('koa-router')();

const handler = require('./handler');

router.prefix('/api/v1');
router.get('/example', handler.example);

module.exports = router;
