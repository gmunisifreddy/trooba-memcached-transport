# trooba-memcached-transport
[![codecov](https://codecov.io/gh/trooba/trooba-memcached-transport/branch/master/graph/badge.svg)](https://codecov.io/gh/trooba/trooba-memcached-transport)
[![Build Status](https://travis-ci.org/trooba/trooba-memcached-transport.svg?branch=master)](https://travis-ci.org/trooba/trooba-memcached-transport) [![NPM](https://img.shields.io/npm/v/trooba-memcached-transport.svg)](https://www.npmjs.com/package/trooba-memcached-transport)
[![Downloads](https://img.shields.io/npm/dm/trooba.svg)](http://npm-stat.com/charts.html?package=trooba-memcached-transport)
[![Known Vulnerabilities](https://snyk.io/test/github/trooba/trooba-memcached-transport/badge.svg)](https://snyk.io/test/github/trooba/trooba-memcached-transport)

A [Memcached](https://github.com/3rd-Eden/memcached) transport for trooba pipeline. All APIs of [Memcached](https://github.com/3rd-Eden/memcached) are supported in this transport.

## Installation

```
npm install trooba-memcached-transport --save
```

## Usage

```js
var memcachedTransport = require('trooba-memcached-transport');    

const client = require('trooba')
                .use(memcachedTransport, {
                clientId: 'dev-memcached',
                servers: [ 
                    'memcached1.dev.myorg.com:11211',
                    'memcached2.dev.myorg.com:11211'],
                })
                .build()
                .create('client');

await client.set('test-key','test value', 0});
const retrievedValue = await client.get('test-key' );
console.log(retrievedValue);

```

## Get Involved

- **Contributing**: Pull requests are welcome!
    - Read [`CONTRIBUTING.md`](.github/CONTRIBUTING.md) and check out our [bite-sized](https://github.com/trooba/trooba-memcached-transport/issues?q=is%3Aissue+is%3Aopen+label%3Adifficulty%3Abite-sized) and [help-wanted](https://github.com/trooba/trooba-memcached-transport/issues?q=is%3Aissue+is%3Aopen+label%3Astatus%3Ahelp-wanted) issues
    - Submit github issues for any feature enhancements, bugs or documentation problems
- **Support**: Join our [gitter chat](https://gitter.im/trooba) to ask questions to get support from the maintainers and other Trooba developers
    - Questions/comments can also be posted as [github issues](https://github.com/trooba/trooba-memcached-transport/issues)

## Setting up memcached client
You can setup memcached client by configuring three properties `clientId`, `servers` and `options`. 
* `clientid` - an unique identifier associated with memcached client.
* `servers` - location of memcached servers. Please refer to the [documentation here](https://www.npmjs.com/package/memcached#server-locations) on various ways to configure server locations
* `options` - various options to configure the connection. Please refere to the [documentation here](https://www.npmjs.com/package/memcached#options) for various options to configure.

```js
const configs = {
                clientId: '<an unique id>',
                servers: '<location of memcached servers>',
                options: '<options to configure the client>'               
                };

const client = require('trooba')
                .use(memcachedTransport, configs)
                .build()
                .create('client');
```
## API

**client.touch** Touches the given key.

* `key`: **String** The key
* `lifetime`: **Number** After how long should the key expire measured in `seconds`

```js
await client.touch('key', 10);
```

**client.get** Get the value for the given key.

* `key`: **String**, the key

```js
const data = await client.get('foo')
console.log(data);
```

**client.gets** Get the value and the CAS id.

* `key`: **String**, the key

```js
const data = await client.gets('foo');
console.log(data.foo);
console.log(data.cas);
```
**client.getMulti** Retrieves a bunch of values from multiple keys.

* `keys`: **Array**, all the keys that needs to be fetched

```js
const data = await client.getMulti(['foo', 'bar']);
console.log(data.foo);
console.log(data.bar);
```

**client.set** Stores a new value in client.

* `key`: **String** the name of the key
* `value`: **Mixed** Either a buffer, JSON, number or string that you want to store.
* `lifetime`: **Number**, how long the data needs to be stored measured in `seconds`


```js
client.set('foo', 'bar', 10);
```

**client.replace** Replaces the value in client.

* `key`: **String** the name of the key
* `value`: **Mixed** Either a buffer, JSON, number or string that you want to store.
* `lifetime`: **Number**, how long the data needs to be replaced measured in `seconds`

```js
await client.replace('foo', 'bar', 10);
```

**client.add** Add the value, only if it's not in client already.

* `key`: **String** the name of the key
* `value`: **Mixed** Either a buffer, JSON, number or string that you want to store.
* `lifetime`: **Number**, how long the data needs to be replaced measured in `seconds`

```js
await client.add('foo', 'bar', 10);
```

**client.cas** Add the value, only if it matches the given CAS value.

* `key`: **String** the name of the key
* `value`: **Mixed** Either a buffer, JSON, number or string that you want to store.
* `lifetime`: **Number**, how long the data needs to be replaced measured in `seconds`
* `cas`: **String** the CAS value

```js
const data = await client.gets('foo');
await client.cas('foo', 'bar', data.cas, 10);
```

**client.append** Add the given value string to the value of an existing item.

* `key`: **String** the name of the key
* `value`: **Mixed** Either a buffer, JSON, number or string that you want to store.

```js
await client.append('foo', 'bar');
```

**client.prepend** Add the given value string to the value of an existing item.

* `key`: **String** the name of the key
* `value`: **Mixed** Either a buffer, JSON, number or string that you want to store.

```js
await client.prepend('foo', 'bar');
```

**client.incr** Increment a given key.

* `key`: **String** the name of the key
* `amount`: **Number** The increment

```js
await client.incr('foo', 10);
```

**client.decr** Decrement a given key.

* `key`: **String** the name of the key
* `amount`: **Number** The increment

```js
await client.decr('foo', 10);
```

**client.del** Remove the key from client.

* `key`: **String** the name of the key

```js
await client.del('foo');
```

**client.version** Retrieves the version number of your server.

**client.flush** Flushes the client server.

**client.stats** Retrieves stats from your client server.

**client.settings** Retrieves your `stats settings`.

**client.slabs** Retrieves `stats slabs` information.

**client.items** Retrieves `stats items` information.

**client.end** Closes all active client connections.
