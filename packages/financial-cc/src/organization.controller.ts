import {
    Controller,
    ConvectorController,
    Invokable
} from '@worldsibu/convector-core-controller';
import { Organization } from './financial.model';


@Controller('organization')
export class OrganizationController extends ConvectorController {
    @Invokable()
    public async create(data: Organization) {
        debugger;
        await data.save();
    }
}