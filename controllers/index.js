const router = require('express').Router();
const apiRoutes = require('./api');
<<<<<<< HEAD
const homeRoutes = require('./homepage-route');
const dashboardRoutes = require('./dashboard-routes');
=======
const homeRoutes = require('./homepage-routes');
// const dashboardRoutes = require('./dashboard');
>>>>>>> 6dd3117b391204df1e339a6c70bd3ef51d29fd20

router.use('/', homeRoutes);
<<<<<<< HEAD
router.use('/dashboard', dashboardRoutes)
=======
router.use('/api', apiRoutes);
// router.use('/dashboard', dashboardRoutes);

>>>>>>> 6dd3117b391204df1e339a6c70bd3ef51d29fd20

module.exports = router;