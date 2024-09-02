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
router.use('/addProfiles', async (req, res) => {
  const { body:{ email,name, phone } }  = req
  const users = await prisma.userProfiles.create({
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
