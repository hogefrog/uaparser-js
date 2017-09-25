# uaparser-js

Parsing user agent strings. Using uap-core(https://github.com/ua-parser/uap-core)

# Install

```
npm install
```

# Build

```
npm run build
```

# Start

```
npm run start
```

# Test

```
npm test
```

# LICENSE

Apache License, Version 2.0

# HOW TO USE

```
var uap = require('user-agent-parser')
var result = uap.parser('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:43.0) Gecko/20100101 Firefox/43.0')
 or
var result = uap.parser('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:43.0) Gecko/20100101 Firefox/43.0', 'your/custom/regexes.yaml/path')
```
