let input = ["ABC_HEALTHCARE", "XYZ_PROVIDER", "InstaMed"];

input = input.sort();
let result = [];
let f = function (prefix, input) {
    for (var i = 0; i < input.length; i++) {
        result.push((prefix ? `${prefix}-` : prefix) + input[i]);
        f((prefix ? `${prefix}-` : prefix) + input[i], input.slice(i + 1));
    }
}
f('', input);


let resultCols = [];

result.map(item => {
    let orgs = item.split('-');

    resultCols.push({
        "name": item.toUpperCase(),
        "policy": `OR( ${orgs.map(org => `'${org}.member'`).join(',')} )`,
        "requiredPeerCount": 0,
        "maxPeerCount": 3,
        "blockToLive": 0,
        "memberOnlyRead": true
    });

}).join(',');

console.log(`${JSON.stringify(resultCols)}`);