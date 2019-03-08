import { Router, Request, Response } from 'express';
import { make as paymentMake } from '../services/payment.service';
const router: Router = Router();

router.post('/payment/make', async (req: Request, res: Response) => {
    try {
        const payment = req.body.data;
        await paymentMake(payment);
    } catch (ex) {
        console.log(ex);
        res.send();
    }
});

export const PatientCtrl: Router = router;