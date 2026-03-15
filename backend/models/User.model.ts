import mongoose, {Schema, Document} from 'mongoose'

export interface IUser extends Document {
    name: String, 
    email: String,
    password: String,
    role: 'user' | 'admin',
    createdAt: Date,
    updatedAt: Date
}

const userSchema: Schema = new Schema({
    name: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    
}, {
    timestamps: true
})

const User = mongoose.model<IUser>('User', userSchema)

export default User












