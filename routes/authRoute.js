import express from 'express'
// import  registerController  from "../controllers/authController"
import  {registerController, orderStatusController ,loginController, testController,registeredUsersController, forgotPasswordController,updateProfileController,getOrdersController,getAllOrdersController,allUserOrderController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'


//rputer object

const router = express.Router()

//Register || METHOD POST
router.post('/register', registerController)

//register get info

router.get("/users",requireSignIn, isAdmin, registeredUsersController)

//LOGIN || POST

router.post('/login', loginController)

//ForgetPassword

router.post("/forgot-password", forgotPasswordController)


//test_route
router.get("/test", requireSignIn ,isAdmin ,testController);

//protected route auth for users

router.get('/user-auth', requireSignIn, (req,res)=>{
    res.status(200).send({
        ok:true,
    })
})

//protected route for admin 
router.get("/admin-auth", requireSignIn, isAdmin, (req,res)=>{
    res.status(200).send({
        ok:true,
    })

})

//profgile update 

router.put('/profile', requireSignIn, updateProfileController)

router.get('/orders', requireSignIn, getOrdersController)

router.get('/all-orders', requireSignIn,isAdmin, getAllOrdersController)

router.get('/all-orders/:uid',requireSignIn, allUserOrderController)

router.put("/order-status/:orderId", requireSignIn,isAdmin, orderStatusController);


export default router;