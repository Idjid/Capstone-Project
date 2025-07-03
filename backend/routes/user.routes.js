const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const {
    getProfile,
    getAllUsers,
    deleteUser,
    deleteAccount,
    updateName,
    updateDescription,
    updateAddress,
    updatePicture,
    getUserById
} = require('../controllers/user.controller');

//User Endpoints
router.get('/me', auth, getProfile);
router.get('/', auth, getAllUsers);
router.delete('/:id', auth, deleteUser);
router.delete('/me', auth, deleteAccount);
router.post('/name', auth, updateName)
router.post('/description', auth, updateDescription),
router.post('/address', auth, updateAddress)
router.post('/picture', auth, updatePicture)
router.get('/:id', auth, getUserById);


module.exports = router;