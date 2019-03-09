import {
    Controller,
    ConvectorController,
    Invokable,
    Param
} from '@worldsibu/convector-core-controller';
import { Organization } from './financial.model';
import { FQDNObjects } from './utils';


@Controller('organization')
export class OrganizationController extends ConvectorController {
    @Invokable()
    public async create(
        @Param(Organization)
        data: Organization) {
        data.id = data.id.includes(FQDNObjects.ORGANIZATION.toString()) ? data.id :
            `${FQDNObjects.ORGANIZATION}#${data.id}`;
        await data.save();
    }
}