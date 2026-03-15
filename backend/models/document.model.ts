import mongoose, { Schema, Document, type Types } from "mongoose";

// 1. Interface banayein
export interface IDocument extends Document {
  userId: Types.ObjectId; // User model ki reference ID
  fileName: string;
  fileHash: string;
  storagePath: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Schema banayein
const documentSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    fileName: {
      type: String,
      required: true
    },

    fileHash: {
      type: String,
      required: true
    },

    storagePath: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Documents = mongoose.model<IDocument>("Document", documentSchema);

export default Documents