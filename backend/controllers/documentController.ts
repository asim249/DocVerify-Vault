import { Request, Response } from "express";
import Document from "../models/Document.model.ts";
import { generateFileHash } from "../utils/hashFile.ts";
import path from "path";
import  fs  from 'fs';

export const uploadDocument = async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const filePath = path.join(req.file.destination, req.file.filename);
    const fileHash = generateFileHash(filePath);

    const document = new Document({
      userId: (req as any).user.id,
      fileName: req.file.originalname,
      storagePath: filePath,
      fileHash
    });

    await document.save();
    res.status(201).json({ message: "File uploaded", fileHash });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyDocument = async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const filePath = path.join(req.file.destination, req.file.filename);
    const newHash = generateFileHash(filePath);

    const doc = await Document.findOne({ fileHash: newHash }).populate("userId", "name email");

    if (doc) {
      res.json({ message: "Valid document", uploadedBy: (doc.userId as any ).name, uploadedAt: doc.createdAt });
    } else {
      res.json({ message: "Document modified or not found" });
    }
    fs.unlinkSync(filePath);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// my document

export const myDocument = async (req: Request, res: Response) => {
  try {
    let docs;
    if(req.user.role === "admin"){
        docs = await Document.find({}).populate("userId", "name email").sort({ createdAt: -1 });

    }else{
        docs = await Document.find({userId: (req as any).user.id}).populate("userId", "name email").sort({ createdAt: -1 });
    }
    if (!docs) return res.status(404).json({ message: "No documents found" });
    res.json(docs);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" });
  }
}

// Admin Controllers

export const getAllDocuments = async (req: Request, res: Response) => {
  try {
    const {hash} = req.query
    let query = {}
    if(hash){
        query = {fileHash: hash}
    }
    const docs = await Document.find(query).populate("userId", "name email").sort({ createdAt: -1 });
    res.json(docs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteDocument = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const doc = await Document.findById(id);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    if (fs.existsSync(doc.storagePath)) {
      fs.unlinkSync(doc.storagePath);
    }

    await Document.findByIdAndDelete(id);

    res.json({ message: "Document and associated file deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};