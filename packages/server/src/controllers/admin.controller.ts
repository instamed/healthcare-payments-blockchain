import { Router, Request, Response } from 'express';
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