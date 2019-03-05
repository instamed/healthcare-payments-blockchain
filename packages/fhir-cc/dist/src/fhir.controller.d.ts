import { ConvectorController } from '@worldsibu/convector-core-controller';
export declare class FhirController extends ConvectorController {
    createClaim(): Promise<void>;
    adjudicateClaim(): Promise<void>;
    makePayment(): Promise<void>;
}
