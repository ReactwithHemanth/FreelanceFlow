import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: String,
  client: String,
  status: String,
  deadline: String,
  amount: Number,
});

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
