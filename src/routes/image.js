const express = require('express')
const multer = require('multer')

const router = express.Router()
const MAX_SIZE = 70 * 1024 * 1024

const {
  uploadDoc,
  listDocs,
  getDocumentDetails,
  deleteDoc,
} = require('../controllers/image')
const { storage } = require('../middlewares/s3provider')
const auth = require('../middlewares/auth')

const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE },
})
router.post('/v1/documents/', auth, upload.array('document'), uploadDoc)
router.get('/v1/documents/', auth, listDocs)
router.get('/v1/documents/:doc_id', auth, getDocumentDetails)
router.delete('/v1/documents/:doc_id', auth, deleteDoc)

module.exports = router