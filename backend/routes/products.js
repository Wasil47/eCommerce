const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
  res.send('GET handler for /products route.');
})
router.post('/add', (req,res)=>{
  res.send('POST handler for /products/add route.');
})



module.export = router;