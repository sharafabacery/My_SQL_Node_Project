const {
    createUser,
    getUserByUserIdCont,
    getUsersCont,
    updateUserCont,
    deleteUserCont,
    login
} = require('./UseController')

const {checktoken }=require('../../auth/token_validation')


const router = require('express').Router()
router.post('/',checktoken, createUser)
router.get('/',checktoken, getUsersCont)
router.get('/:id',checktoken, getUserByUserIdCont)
router.patch('/',checktoken, updateUserCont)
router.delete('/',checktoken, deleteUserCont)
router.post('/login',login)

module.exports = router