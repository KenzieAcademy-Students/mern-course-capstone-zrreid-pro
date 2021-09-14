import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const projectSchema = new mongoose.Schema({
  
})

const Project = mongoose.model('Prohect', projectSchema)

export default Project;
