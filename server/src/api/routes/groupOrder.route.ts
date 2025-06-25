import express from 'express';


const router = express.Router();
import { handleError } from '../../utils/response';
import * as groupOrderController from '../controllers/groupOrders.controller';

router.route("/get").get(
    handleError(groupOrderController.groupOrders)
);

export default router;