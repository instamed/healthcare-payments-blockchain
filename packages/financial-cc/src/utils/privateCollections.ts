import { GovernanceCollections } from '../models/collections.model';
import { GovernanceController } from '../controllers/governance.controller';
import { Organization } from '../models/financial.model';
import { FQDNObjects } from './enums';

/** Validate a collection combination exists */
export async function pickRightCollections(objects: string[][]) {
    let results = [];
    for (let object of objects) {
        let tempList = object.map(org =>
            extractOrganizationId(extractPatientOrganizationId(org)));
        tempList = tempList.sort();
        const col = tempList.join('_');
        
        let cols = await getCols();
        if (cols.indexOf(col) !== -1) {
            results.push(col);
        } else {
            
            throw new Error('Queried collection does not exist');
        }
    }
    return results;
}

/** Make sure to extract the patient organization part so the need appears */
function extractPatientOrganizationId(path: string) {
    path = path.toUpperCase();
    if (path.toUpperCase().indexOf(`${FQDNObjects.PATIENT}#com.`.toUpperCase()) !== -1) {
        let removedNS = path.replace(`${FQDNObjects.PATIENT}#com.`.toUpperCase(), '');
        return removedNS.slice(0, removedNS.indexOf('.')).toUpperCase();
    }
    return path;
}

/** Make sure to extract the organization part so the need appears */
function extractOrganizationId(path: string) {
    path = path.toUpperCase();
    if (path.toUpperCase().indexOf(`${FQDNObjects.ORGANIZATION}`.toUpperCase()) !== -1) {
        return path.replace(`${FQDNObjects.ORGANIZATION}#`.toUpperCase(), '').toUpperCase();
    }
    return path;
}

/** Build all possible permutations */
export async function getCols(): Promise<Array<string>> {
    let input = (await GovernanceCollections.getOne(GovernanceController.governanceCollectionKey)).organizations;
    // Need a deterministic order
    input = input.sort();
    let result: Array<string> = [];
    let f = function (prefix, input) {
        for (var i = 0; i < input.length; i++) {
            result.push((prefix ? `${prefix}_` : prefix) + input[i]);
            f((prefix ? `${prefix}_` : prefix) + input[i], input.slice(i + 1));
        }
    }
    f('', input);
    return result;
}