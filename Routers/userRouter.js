const router = require('express').Router();
const { userregistration, Userlogin, getsingleuser,getallusers,deleteuserbyid,Logout } = require("../Controllers/userController")
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");




router.post('/userregistration', userregistration);
router.post('/userlogin', Userlogin);
router.get('/singleuser/me',verifyToken, getsingleuser);
router.get('/getallusers',verifyTokenwithAdmin, getallusers);
router.delete('/deleteuserbyid/:id',verifyTokenwithAdmin, deleteuserbyid);
router.post('/Logout', Logout);

/* Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjpbeyJfaWQiOiI2Mjc3MTZlYWJlYmUzY2Y3NWRhNjkyMTEiLCJ1c2VybmFtZSI6IkZyYW5jb1RlY2hzIiwiZW1haWwiOiJnYmFkZS5mcmFuY2lzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGJCTnpTSU5uMWRzVVhMWTRSOXEzNk95Q2wzeHZqODZ5WUdBOUpabDJWZE05UjlFZXA4a2tpIiwidmVyaWZpZWQiOnRydWUsImZpcnN0bmFtZSI6IkdiYWRlIiwibGFzdG5hbWUiOiJGcmFuY2lzIiwibG9jYXRpb24iOiJMYWdvcywgTmlnZXJpYSIsImNyZWF0ZWRBdCI6IjIwMjItMDUtMDhUMDE6MDM6MzguMzYyWiIsInVwZGF0ZWRBdCI6IjIwMjItMDUtMDhUMDE6MDM6MzguMzYyWiIsIl9fdiI6MH1dLCJpYXQiOjE2NTI1MjA2ODEsImV4cCI6MTY1MjYwNzA4MX0.awc4_OlCuIo-H9mB7Vq3DPT86qvFyoX9CoSpPqnBT04 */





module.exports = router;
