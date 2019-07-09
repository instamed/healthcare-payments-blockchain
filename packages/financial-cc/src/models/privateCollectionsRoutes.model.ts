import { pickRightCollections } from '../utils/privateCollections';

export class PrivateCollectionsRoutes {
    claim = '';
    claimResponse = '';
    encounter = '';
    procedure = '';
    chargeItem = '';
    account = '';
    invoice = '';
    constructor(private patient: string, private provider: string, private payer: string) {
    }
    async load() {
        let colls = await pickRightCollections([
            [this.provider, this.payer],
            [this.patient, this.provider],
            [this.patient, this.provider, this.payer],
        ]);

        this.claim = colls[0];
        this.claimResponse = colls[0];
        this.encounter = colls[1];
        this.chargeItem = colls[2];
        this.procedure = colls[2];
        this.account = colls[1];
        this.invoice = colls[1];
        this.invoice = colls[2];
    }
}