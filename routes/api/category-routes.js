const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try{
    const categoryData= await Category.findAll();
    res.status(200),json(categoryData);
  }catch (err){
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  try{
    const categoryData= await Category.findByPk(req.params.id, {
      include:[{model: Product, as: "()"}]
    });
    
    if(!categoryData){
      res.status(400).json({message: "No product found under this id."});
      return;
    }

  }catch(err){
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  try{
    const categoryData= await Category.create(req.body);
    res.status(200).json(categoryData);
  }catch(err){
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try{
    const categoryData= await Category.destroy({
      where:{
        id: req.params.id
      }
    });

    if(!categoryData){
      res.status(400).json({message: "No cateory found with this id!"})
    }

  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
