const express = require("express")
const { deleteOne } = require("../model/productModel")
const router = express.Router()
const productModel = require("../model/productModel")

router.get('/', async (req,res)=>{
    let id = req.params.productNumber
    let product  = await productModel.find()
        // if(err){res.send(err)}
        // res.json(products)})
        res.json({status:"success",data:product})

})

router.get('/:id', async (req,res)=>{
    //let id = req.params.id
    let product  = await productModel.findById(req.params.id)
        // if(err){res.send(err)}
        // res.json(products)})
        res.json({status:"success",data:product})

})

router.post('/', async (req,res,next)=>{ 
    // productModel.create({productName:req.body.productName,
    //     productNumber:req.body.productNumber,productreview:req.body.productreview,
    //     userid:req.body.userid,username:req.body.username},(err,product)=>{
        const newproduct = await productModel.create(req.body)
        res.json({data:newproduct})
})

router.put('/:id',async(req,res,next)=>{
    
    let product = await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    if(!product){
        return res.status(400).json({status:"failed"})
    }
    res.json({status:"success",data:product})

})
router.delete('/:id',async(req,res,next)=>{
    let product = await productModel.findByIdAndDelete(req.params.id)
    if(!product){return res.status(400).json({status:"failed"})}
    res.json({status:"success",data:product})
})

module.exports = router