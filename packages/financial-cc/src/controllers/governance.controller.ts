import {
    Controller,
    ConvectorController,
    Invokable,
    Param
} from '@worldsibu/convector-core';
import * as yup from 'yup';
import { GovernanceCollections } from '../models/collections.model';
import { getCols } from '../utils/privateCollections';

@Controller('governance')
export class GovernanceController extends ConvectorController {
    static governanceCollectionKey = 'governanceCollections';
    @Invokable()
    public async updateOrganizationsList(
        @Param(yup.array(yup.string()))
        items: string[]) {
        let cols = new GovernanceCollections();
        cols.id = GovernanceController.governanceCollectionKey;
        cols.organizations = items;

        await cols.save();
    }
    @Invokable()
    public async getOrganizationsList() {
        return (await GovernanceCollections.getOne(GovernanceController.governanceCollectionKey));
    }
    @Invokable()
    public async getPrivateCollections() {
        return getCols();
    }
}