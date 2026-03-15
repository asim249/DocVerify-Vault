import express from "express";
import { uploadDocument, verifyDocument, getAllDocuments, deleteDocument, myDocument } from "../controllers/documentController.ts";
import { verifyToken } from "../middleware/authMiddleware.ts";
import { isAdmin } from "../middleware/adminMiddleware.ts";
import { upload } from "../middleware/uploadMiddleware.ts";

const router = express.Router();

router.post("/upload", verifyToken, upload.single("file"), uploadDocument);
router.post("/verify", verifyToken, upload.single("file"), verifyDocument);
router.get("/my-documents", verifyToken,  myDocument);

// Admin routes
router.get("/admin/documents", verifyToken, isAdmin, getAllDocuments);
router.delete("/admin/delete-document/:id", verifyToken, isAdmin, deleteDocument);

export default router;