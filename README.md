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
var uap = require('uaparser-js')
var result = uap.parse('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:43.0) Gecko/20100101 Firefox/43.0')
 or
var result = uap.parse('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:43.0) Gecko/20100101 Firefox/43.0', 'your/custom/regexes.yaml/path')
```
