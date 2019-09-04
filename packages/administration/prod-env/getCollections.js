let input = ["instamedycb-fhirfinancialfqaMSP", "allamericanhealthvkj-fhirfinancialzbeMSP", "southbendflucliniclff-fhirfinancialxwaMSP"];

String.prototype.replaceAll = function(str1, str2, ignore) 
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 

input = input.sort();
let result = [];
let f = function (prefix, input) {
    for (var i = 0; i < input.length; i++) {
        result.push((prefix ? `${prefix}+` : prefix) + input[i]);
        f((prefix ? `${prefix}+` : prefix) + input[i], input.slice(i + 1));
    }
}
f('', input);


let resultCols = [];

result.map(item => {
    let orgs = item.split('+');

    resultCols.push({
        "name": item.toLowerCase().replaceAll('+','-'),
        "policy": `OR( ${orgs.map(org => `'${org}.member'`).join(',')} )`,
        "requiredPeerCount": 0,
        "maxPeerCount": 3,
        "blockToLive": 0,
        "memberOnlyRead": true
    });

}).join(',');

console.log(`${JSON.stringify(resultCols)}`);