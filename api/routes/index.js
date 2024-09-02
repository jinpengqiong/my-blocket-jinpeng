const middleware = require('@blocklet/sdk/lib/middlewares');
const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));

router.use('/getProfiles', async (req, res) => {
  const users = await prisma.userProfiles.findMany();
  return res.json(users);
  }
);
router.use('/updateProfiles', async (req, res) => {
  const { body:{ email,name, phone, id } }  = req
  console.log('email,name, phone, id', email,name, phone, id)
  const users = await prisma.userProfiles.update({
    where: {
      id,
    },
    data: {
      name,
      phone,
      email
    },
    });
  return res.json(users);
  }
);

module.exports = router;
