import { Router, Request, Response } from 'express';
import { create as createOrganization } from '../services/organization.service';
import { createConsumer, createProvider, createPayer } from '../services/participant.service';
const router: Router = Router();

router.post('/organization', async (req: Request, res: Response) => {
    try {
        const organization = req.body;
        await createOrganization(organization);
        res.status(201).send();
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

router.post('/participant/consumer', async (req: Request, res: Response) => {
    try {
        const participant = req.body;
        await createConsumer(participant);
        res.status(201).send();
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

router.post('/participant/provider', async (req: Request, res: Response) => {
    try {
        const participant = req.body;
        await createProvider(participant);
        res.status(201).send();
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

router.post('/participant/payer', async (req: Request, res: Response) => {
    try {
        const participant = req.body;
        await createPayer(participant);
        res.status(201).send();
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});


export const AdminCtrl: Router = router;