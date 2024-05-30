const { Router } = require("express");
const router=Router();
const {login, getUser, deleteUser, createUser, updateUser}=require("../controllers/Auth");
const { validateJWT } = require("../../middlewares/verifyJWT");
const { verifyAdminRol } = require("../../middlewares/verifyRolAdministration");



router.post("/",login);
router.get("/",[validateJWT,verifyAdminRol],getUser);
router.delete("/",[validateJWT,verifyAdminRol],deleteUser);
router.post("/new",createUser);
router.put("/",[validateJWT,verifyAdminRol],updateUser);


module.exports=router;