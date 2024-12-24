const express = require('express');
// const {loginapi,userpasswordresst} = require('../Controller/common/Login'); 
const router = express.Router();
const validate = require("../Middleware/Client-loginpage");
// const Clientloginapi = require('../Middleware/Client-validation'); 
const logoutmidleware = require('../Middleware/LogoutMiddleware');
const userlogout = require('../Controller/common/Logout');
const Clientloginapi = require('../Middleware/Client-validation');
const { loginapi, userpasswordresst, userdetails, Updateuser } = require('../Controller/common/Login');
const verificationMiddleware = require('../Middleware/LogoutMiddleware');
const { servicradd, findbyservice, serviceupdate, servicedelete, getallservice, caterorybyidData, servicescategory, searchapi } = require('../Controller/client/serviceController');
const { servicecategorys, categorysShow } = require('../Controller/client/Caterory');
const {CreateOrder, allordershow, getorderwithid, orderstatuschange, ordercancel} = require('../Controller/client/Order');
const {Reviewadd, reviewsforspecificservice, reviewsforspecificuser, orderdetails} = require('../Controller/User/Review && Rating/ReviewAdd');
const {Allusershow, Changeuserstatus, allservice, rejectservice, allOrder, rejectreson, total_revenue_active_users_top_services, contactapi, query_solvedupdate, All_query_solved, Getplatform_wide, settingA_Api, settingupdate, Allsetting_Allservice, oneservicetoallprice} = require('../Controller/Admin/Getalluser');


router.post('/login', validate(Clientloginapi), loginapi);
router.post("/userlogout", logoutmidleware, userlogout);
router.post("/userpasswordressaate/:user_id", verificationMiddleware, userpasswordresst);
router.post("/userdetails/:findid", userdetails);
router.post('/Updateuser/:userupdate', verificationMiddleware, Updateuser);
router.post('/servicradd', servicradd)
router.post('/findbyservice', findbyservice)
router.post('/serviceupdate/:serviceid',serviceupdate)
router.delete("/servicedelete/:serviceid",servicedelete)
router.get("/getallservice",getallservice)
router.post("/servicecategorys",servicecategorys);
router.get("/categorysShow",categorysShow)
router.get("/servicescategory",servicescategory)
router.get("/searchapi",searchapi)
router.post("/CreateOrder",CreateOrder)
router.get("/allordershow",allordershow)
router.post("/getorderwithid",verificationMiddleware, getorderwithid)
router.put("/orderstatuschange",orderstatuschange)
router.delete("/ordercancel",ordercancel)
router.post('/Reviewadd',Reviewadd)
router.get("/reviewsforspecificservice",reviewsforspecificservice)
router.get("/reviewsforspecificuser",verificationMiddleware,reviewsforspecificuser)
router.get("/orderdetails",orderdetails)


// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4$$$$ ==> Admin panel Api's  <== $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

router.get("/Allusershow",Allusershow)
router.put("/Changeuserstatus",verificationMiddleware,Changeuserstatus)
router.get("/allservice",allservice)
router.put("/rejectservice",rejectservice)
router.get("/allOrder",allOrder)
router.put("/rejectreson",rejectreson)
router.get("/totalrevenueactiveuserstopservices",total_revenue_active_users_top_services)
router.post("/contactapi",contactapi)
router.post("/query_solvedupdate",query_solvedupdate)
router.get("/All_query_solved",All_query_solved)
router.get("/Getplatform_wide",Getplatform_wide)
router.post("/settingA_Api",settingA_Api)
router.get("/settingupdate",settingupdate)
router.get("/allsetting_allservice",Allsetting_Allservice)
router.get("/oneservicetoallprice",oneservicetoallprice)


module.exports = router;