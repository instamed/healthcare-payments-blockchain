import { Router, Request, Response } from 'express';
import { make as paymentMake } from '../services/payment.service';
const router: Router = Router();

router.post('/make', async (req: Request, res: Response) => {
    try {
        const payment = req.body.payment;
        const { user } = req.query;
        await paymentMake(payment, user);
        res.send(200);
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

export const PaymentCtrl: Router = router;