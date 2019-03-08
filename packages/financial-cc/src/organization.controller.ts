import {
    Controller,
    ConvectorController,
    Invokable,
    Param
} from '@worldsibu/convector-core-controller';
import { Organization } from './financial.model';


@Controller('organization')
export class OrganizationController extends ConvectorController {
    @Invokable()
    public async create(
        @Param(Organization)
        data: Organization) {
        data.id = data.id.includes('resource:org.fhir.core.Organization#') ? data.id :
            `resource:org.fhir.core.Organization#${data.id}`;
        await data.save();
    }
}