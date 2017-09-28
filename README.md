# uaparser-js

Parsing user agent strings. Using uap-core(https://github.com/ua-parser/uap-core)

# Install

```
npm install uaparser-js
```

# LICENSE

Apache License, Version 2.0

# HOW TO USE

```
const filePath = path.join('node_modules', 'uap-core', 'regexes.yaml');
const regexesData = fs.readFileSync(filePath, 'utf8');

let uap = require('uaparser-js');
let result = uap.parse('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:43.0) Gecko/20100101 Firefox/43.0', regexesData);
```
