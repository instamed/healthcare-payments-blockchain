import { Router, Request, Response } from 'express';
import {
    createConsumer, createProvider, createPayer,
    getAllConsumer, getAllProvider, getAllPayer
} from '../services/participant.service';
const router: Router = Router();

router.get('/consumer', async (req: Request, res: Response) => {
    try {
        let results = await getAllConsumer();
        res.send(results);
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});
router.get('/provider', async (req: Request, res: Response) => {
    try {
        let results = await getAllProvider();
        res.send(results);
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});
router.get('/payer', async (req: Request, res: Response) => {
    try {
        let results = await getAllPayer();
        res.send(results);
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

router.post('/consumer', async (req: Request, res: Response) => {
    try {
        const { participant, fingerprint } = req.body;
        await createConsumer(participant, fingerprint);
        res.status(201).send();
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

router.post('/provider', async (req: Request, res: Response) => {
    try {
        const participant = req.body;
        await createProvider(participant);
        res.status(201).send();
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

router.post('/payer', async (req: Request, res: Response) => {
    try {
        const participant = req.body;
        await createPayer(participant);
        res.status(201).send();
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

export const ParticipantCtrl: Router = router;
