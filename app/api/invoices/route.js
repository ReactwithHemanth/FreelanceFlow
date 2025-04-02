import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Invoice from "@/models/Invoice";

export async function GET() {
  await dbConnect();
  const invoices = await Invoice.find({});
  return NextResponse.json(invoices);
}

export async function POST(req) {
  await dbConnect();
  const { project, client, amount, status, dueDate } = await req.json();
  const newInvoice = new Invoice({ project, client, amount, status, dueDate });
  await newInvoice.save();
  return NextResponse.json(newInvoice);
}
