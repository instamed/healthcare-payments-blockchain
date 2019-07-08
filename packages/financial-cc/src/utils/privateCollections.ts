import { GovernanceCollections } from '../collections.model';
import { GovernanceController } from '../governance.controller';
import { Organization } from '../financial.model';
import { FQDNObjects } from './enums';

export async function pickRightCollection(orgs: string[]) {
    let col = orgs.map(org => org.replace(`${FQDNObjects.ORGANIZATION}#`, '')).join('');
    // TODO: Maybe later will need a group of potential concats to get the 
    // right name
    let cols = await getCols();
    if (cols.indexOf(col) !== -1) {
        return col;
    }
    throw new Error('Queried collection does not exist');
}
export async function getCols(): Promise<Array<string>> {
    let input = (await GovernanceCollections.getOne(GovernanceController.governanceCollectionKey)).organizations;

    let result: Array<string> = [];
    let f = function (prefix, input) {
        for (var i = 0; i < input.length; i++) {
            result.push(prefix + input[i]);
            f(prefix + input[i], input.slice(i + 1));
        }
    }
    f('', input);
    return result;
}