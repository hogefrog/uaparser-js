# uaparser-js

Parsing user agent strings. Using uap-core(https://github.com/ua-parser/uap-core)

## Install

```
npm install uaparser-js
```

## Usage

### Node

```javascript
const uap = require('uaparser-js');

// get parser
const parser = uap();
// parse
let result = parser.parse('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:43.0) Gecko/20100101 Firefox/43.0');

// or 
// let result = uap().parse('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:43.0) Gecko/20100101 Firefox/43.0');

console.log(result.toString());
// {
//     "ua": {
//         "family": "Firefox",
//         "major": "43",
//         "minor": "0",
//         "patch": ""
//     },
//     "os": {
//         "family": "Mac OS X",
//         "major": "10",
//         "minor": "11",
//         "patch": "",
//         "patchMinor": ""
//     },
//     "device": {
//         "family": "Other",
//         "brand": "",
//         "model": ""
//     }
// }
```

### Browser

```html
<script src="uaparser.min.js"></script>
<script>

// get parser
var parser = uap();
// parse
var result = parser.parse('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:43.0) Gecko/20100101 Firefox/43.0');

// or
// var result = uap().parse('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:43.0) Gecko/20100101 Firefox/43.0');

console.log(result.toString());
// {
//     "ua": {
//         "family": "Firefox",
//         "major": "43",
//         "minor": "0",
//         "patch": ""
//     },
//     "os": {
//         "family": "Mac OS X",
//         "major": "10",
//         "minor": "11",
//         "patch": "",
//         "patchMinor": ""
//     },
//     "device": {
//         "family": "Other",
//         "brand": "",
//         "model": ""
//     }
// }
</script>
```

# Using your own regex patterns

If you pass optional regex patterns when getting the parser, it will be merged with the embedded regex patterns.  
Optional patterns have higher priority than the embedded patterns so if you pass a user agent string which matches both, optional patterns replacement will be applied.  
Be aware that optional patterns will override the embedded patterns if you pass the same `regex` value. 

```javascript
const uap = require('uaparser-js');

const regex = {
    user_agent_parsers: [
        {
            regex: 'Mozilla',
            family_replacement: 'MyFamRep',
            v1_replacement: 'MyMajorRep',
            v2_replacement: 'MyMinorRep',
            v3_replacement: 'MyPatchRep'
        }
    ],
    os_parsers: [
        {
            regex: 'Macintosh',
            os_replacement: 'MyOSFamRep',
            os_v1_replacement: 'MyOSMajorRep',
            os_v2_replacement: 'MyOSMinorRep',
            os_v3_replacement: 'MyOSPatchRep',
            os_v4_replacement: 'MyOSPatchMinorRep'
        }
    ],
    device_parsers: []
}


let embeddedResult = uap().parse('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:43.0) Gecko/20100101 Firefox/43.0');
console.log(embeddedResult.toString());
// {
//     "ua": {
//         "family": "Firefox",
//         "major": "43",
//         "minor": "0",
//         "patch": ""
//     },
//     "os": {
//         "family": "Mac OS X",
//         "major": "10",
//         "minor": "11",
//         "patch": "",
//         "patchMinor": ""
//     },
//     "device": {
//         "family": "Other",
//         "brand": "",
//         "model": ""
//     }
// }


let optionalResult = uap(regex).parse('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:43.0) Gecko/20100101 Firefox/43.0');
console.log(optionalResult.toString());
// {
//     "ua": {
//         "family": "MyFamRep",
//         "major": "MyMajorRep",
//         "minor": "MyMinorRep",
//         "patch": "MyPatchRep"
//     },
//     "os": {
//         "family": "MyOSFamRep",
//         "major": "MyOSMajorRep",
//         "minor": "MyOSMinorRep",
//         "patch": "MyOSPatchRep",
//         "patchMinor": "MyOSPatchMinorRep"
//     },
//     "device": {
//         "family": "Other",
//         "brand": "",
//         "model": ""
//     }
// }
```


## License

Apache License, Version 2.0