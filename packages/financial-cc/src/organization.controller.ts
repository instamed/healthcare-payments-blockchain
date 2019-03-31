import {
    Controller,
    ConvectorController,
    Invokable,
    Param
} from '@worldsibu/convector-core';
import * as yup from 'yup';
import { FQDNObjects } from './utils/enums';
import { Organization } from './financial.model';

@Controller('organization')
export class OrganizationController extends ConvectorController {
    @Invokable()
    public async create(
        @Param(Organization)
        data: Organization,
        @Param(yup.string())
        fingerprint: string) {
        data.id = data.id.includes(FQDNObjects.ORGANIZATION.toString()) ? data.id :
            `${FQDNObjects.ORGANIZATION}#${data.id}`;

        data.identities = [{
            status: true,
            fingerprint
        }];

        await data.save();
    }
}