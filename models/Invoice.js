import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema({
  project: String,
  client: String,
  amount: Number,
  status: String,
  dueDate: String,
});

export default mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);
