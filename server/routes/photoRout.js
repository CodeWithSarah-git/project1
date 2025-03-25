const express=require("express")
const router=express.Router()
const photoController=require("../controllers/photoController")

router.get('/get',photoController.getAllPhotos)
router.put('/update/:id',photoController.updatePhoto)
router.post('/create',photoController.createPhoto)
router.delete('/delete/:id',photoController.deletePhoto)

module.exports=router