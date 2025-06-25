import { success, error } from "../../utils/response";
import { compute } from "../services/groupOrder.service";
import { Request } from "express";


export async function groupOrders(req: Request) {
  const {pincode} = req.query;
  const groupedOrders = await compute(Number(pincode));
  return success({ message: "Group Orders Calculated", groupedOrders }, 200);
}