import { GovernanceCollections } from '../models/collections.model';
import { GovernanceController } from '../controllers/governance.controller';
import { Organization } from '../models/financial.model';
import { FQDNObjects } from './enums';

/** Validate a collection combination exists */
export async function pickRightCollections(objects: string[][]) {
    let results = [];
    for (let object of objects) {
        object = object.sort();
        let col = object.map(org => org.replace(`${FQDNObjects.ORGANIZATION}#`, '')).join('');
        // TODO: Maybe later will need a group of potential concats to get the 
        // right name
        let cols = await getCols();
        if (cols.indexOf(col) !== -1) {
            results.push(col);
        } else {
            debugger;
            throw new Error('Queried collection does not exist');
        }
    }
    return results;
}

/** Build all possible permutations */
export async function getCols(): Promise<Array<string>> {
    let input = (await GovernanceCollections.getOne(GovernanceController.governanceCollectionKey)).organizations;
    // Need a deterministic order
    input = input.sort();
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