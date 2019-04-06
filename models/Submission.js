import mongoose, { Schema } from 'mongoose'

let Submission = mongoose.model('Submission', new Schema({
  slug: { type: String, unique: true },
  expression: { type: String, required: [true, "Expressão requerida"] },
  description: { type: String, required: [true, "Descrição requerida"] },
  origin: { type: String, required: [true, "Região de Origem requerida"] },
  user_id: { type: Schema.Types.ObjectId },
  valid: { type: Boolean, default: false }
}, { timestamps: { createdAt: 'created_at' } }))

export default Submission