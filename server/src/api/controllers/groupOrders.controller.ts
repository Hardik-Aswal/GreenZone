import { success, error } from "../../utils/response";
import { compute, getAllPincodesFromDB } from "../services/groupOrder.service";
import { Request } from "express";


export async function groupOrders(req: Request) {
  const {pincode} = req.query;
  const groupedOrders = await compute(Number(pincode));
  return success({ message: "Group Orders Calculated", groupedOrders }, 200);
}

export async function getAllPincodes() {
  const pincodes = await getAllPincodesFromDB();
  if (!pincodes || pincodes.length === 0) {
    return error("No pincodes found", 404);
  }
  return success({ pincodes }, 200); 
}