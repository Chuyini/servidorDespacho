const { Router } = require("express");
const router=Router();
const {getLawyers,updateLawyers,createLawyers,deleteLawyers}=require("../controllers/Lawyer");
const { validateJWT } = require("../../middlewares/verifyJWT");
const { verifyAdminRol } = require("../../middlewares/verifyRolAdministration");




router.get("/",[validateJWT],getLawyers);
/*router.get("/:id",getTvShowsById);*///buscamos por id un elemento por parametro de segmento
router.post("/",[validateJWT,verifyAdminRol],createLawyers);

router.delete("/:id",[validateJWT,verifyAdminRol],deleteLawyers);
router.put("/:Id",[validateJWT,verifyAdminRol],updateLawyers);/*
router.delete("/:id",deleteLawyers);*/

module.exports=router;