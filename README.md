# 🤔 JSON Infer Types

> Infer the types of JSON documents & values, with a large set of formats for strings

![Coverage lines](./badges/badge-lines.svg)
![Tests](https://github.com/jsonhero-io/json-infer-types/actions/workflows/test.yml/badge.svg?branch=main)
[![Downloads](https://img.shields.io/npm/dm/%40jsonhero%2Fjson-infer-types.svg)](https://npmjs.com/@jsonhero/json-infer-types)
[![Install size](https://packagephobia.com/badge?p=%40jsonhero%2Fjson-infer-types)](https://packagephobia.com/result?p=@jsonhero/json-infer-types)

- [🚀 Features](#-features)
- [💻 Usage](#-usage)
  - [Objects](#objects)
  - [Arrays](#arrays)
  - [Strings](#strings)
- [String Formats](#string-formats)
  - [Date/Time strings](#datetime-strings)
  - [URI strings](#uri-strings)
  - [Email address strings](#email-address-strings)
  - [Other formats](#other-formats)

## 🚀 Features

- Written in typescript
- Infers types of values inside objects and arrays
- Lightweight with only a few third-party dependencies
- Includes a large set of formats for strings
  - Dates and times (and timestamps)
  - URIs
  - Email addresses
  - Currencies
  - Countries
  - Top-Level Domains
  - IP Addresses
  - Languages
  - Phone Numbers
  - UUIDs
  - Hostnames
  - File sizes
  - Stringified JSON

## 💻 Usage

Install JSON Infer Types

```bash
$ npm install --save @jsonhero/json-infer-types
```

`inferType` takes any JSON value and returns a `JSONValueType` object:

```js
const { inferType } = require("@jsonhero/json-infer-types");

inferType(123); // => { name: "int" }
```

The following basic types are supported:

```js
inferType(null); // => { name: "null" }
inferType(true); // => { name: "bool" }
inferType(123); // => { name: "int" }
inferType(123.456); // => { name: "float" }
inferType("hello world"); // => { name: "string" }
```

### Objects

Objects have an additional `properties` property that infers its value types

```js
inferType({ foo: "bar" });
```

Will result in

```json
{ "name": "object", "properties": { "foo": { "name": "string" } } }
```

### Arrays

Arrays have an additional `items` property that infers the types of its items

```js
inferType([8, 176, 3, 49, 0]); // { name: "array", items: { name: "int" }}
```

This works for an array of objects as well

```js
inferType([
  { id: "1", email: "eric@example.com" },
  { id: "2", email: "matt@example.com" },
]);
```

Will result in

```json
{
  "name": "array",
  "items": {
    "name": "object",
    "properties": {
      "id": { "name": "string" },
      "email": {
        "name": "string",
        "format": {
          "name": "email",
          "variant": "rfc5321"
        }
      }
    }
  }
}
```

If they array has items of different types, `items` will be an array of objects representing each unique type found in the array

```js
inferType([1, "hello world"]);
```

Gives the result

```json
{
  "name": "array",
  "items": [
    {
      "name": "int"
    },
    {
      "name": "string"
    }
  ]
}
```

If you don't want or need the `properties` or `items` inferred you can pass the `shallow: true` option to `inferType`

```js
inferType(
  [
    { id: "1", email: "eric@example.com" },
    { id: "2", email: "matt@example.com" },
  ],
  { shallow: true }
); // => { name: "array" }
```

### Strings

JSON Infer Types will also recognize certain string formats and include that information in the result, for example if the string is a `URI`:

```js
inferType("https://www.example.com/foo#bar");
```

Will be

```json
{
  "name": "string",
  "format": {
    "name": "uri"
  }
}
```

Some formats have mutliple variants, like IP Address. `inferType("192.168.0.1")` will be interpreted as an IPV4 address

```json
{
  "name": "string",
  "format": {
    "name": "ip",
    "variant": "v4"
  }
}
```

And `inferType("2001:db8:1234::1")` will be interpreted as an IPV6 address

```json
{
  "name": "string",
  "format": {
    "name": "ip",
    "variant": "v6"
  }
}
```

## String Formats

### Date/Time strings

JSON Infer Types supports `rfc3339/iso8601` and `rfc2822` string formats

```js
inferType("2019-01-01 00:00:00.000Z");
```

Will result in

```json
{
  "name": "string",
  "format": {
    "name": "datetime",
    "parts": "datetime",
    "variant": "rfc3339"
  }
}
```

The `parts` field can be either `datetime`, `date` or `time`, depending on the contents of the string.

The following table illustrates the results of different Date/Time strings

| String                              | Variant | Parts    |
| ----------------------------------- | ------- | -------- |
| `"2019-01-01 00:00:00.000Z"`        | rfc3339 | datetime |
| `"2019-10-12T14:20:50.52+07:00"`    | rfc3339 | datetime |
| `"1983-10-14T13:30Z"`               | rfc3339 | datetime |
| `"2016-05-25"`                      | rfc3339 | date     |
| `"+002016-05-25"`                   | rfc3339 | date     |
| `"2016-W21-3"`                      | rfc3339 | date     |
| `"09:24:15.123Z"`                   | rfc3339 | time     |
| `"09:24:15.123Z"`                   | rfc3339 | time     |
| `"09:24:15"`                        | rfc3339 | time     |
| `"Mon, 02 Jan 2017 06:00:00 -0800"` | rfc2822 | datetime |
| `"Mon, 02 Jan 2017 06:00:00 PST"`   | rfc2822 | datetime |

JSON Infer Types also supports unix epoch timestamps

```js
inferType("1596597629980");
```

Will result in

```json
{
  "name": "string",
  "format": {
    "name": "timestamp",
    "variant": "millisecondsSinceEpoch"
  }
}
```

Also supported are seconds and nanoseconds since epoch timestamp strings

### URI strings

JSON Infer Types will interpret certain strings to be URIs

```js
inferType("https://www.example.com/foo#bar");
```

Will result in

```json
{
  "name": "string",
  "format": {
    "name": "uri"
  }
}
```

If the URI contains a file extension, the inferred `contentType` will be included in the result. For example `inferType("https://www.example.com/foo.json")` will result in

```json
{
  "name": "string",
  "format": {
    "name": "uri",
    "contentType": "application/json"
  }
}
```

The mapping of file extension to contentType is done using the [mime-types](https://github.com/jshttp/mime-types) package

### Email address strings

JSON Infer Types supports `rfc5321` and `rfc5321` style email address strings:

```js
inferType("eallam@example.com");
```

Will result in

```json
{
  "name": "string",
  "format": {
    "name": "email",
    "variant": "rfc5321"
  }
}
```

The following table illustrates the results of different email strings

| String                                           | Variant |
| ------------------------------------------------ | ------- |
| `"example+suffix@example.com"`                   | rfc5321 |
| `"example@127.0.0.1"`                            | rfc5321 |
| `"foo@example.accountants"`                      | rfc5321 |
| `"Example Name <example@example.com>"`           | rfc5322 |
| `"Example S. Name <example.s.name@example.com>"` | rfc5322 |

### Other formats

The following table illustrates the rest of the formats JSON Infer Types supports

| Example Strings                           | Name        | Variant   |
| ----------------------------------------- | ----------- | --------- |
| `"USD"`, `"BTC"`                          | currency    | iso4217   |
| `"United States dollar"`, `"Euro"`        | currency    | english   |
| `"ETH"`, `"LTC"`                          | currency    | crypto    |
| `"USA"`, `"MMR"`                          | country     | iso3166-3 |
| `"US"`, `"GB"`, `"JP"`                    | country     | iso3166-2 |
| `".com"`, `".co.uk"`, `".biz"`            | tld         |           |
| `"192.168.0.1"`, `"172.16.0.0"`, `".biz"` | ip          | v4        |
| `"2001:db8:1234::1"`                      | ip          | v6        |
| `"en"`, `"ab"`, `"es"`                    | language    | iso693-1  |
| `"eng"`, `"eus"`, `"zul"`                 | language    | iso693-2  |
| `"Arabic"`, `"Welsh"`, `"Russian"`        | language    | english   |
| `"dansk"`, `"Español"`                    | language    | native    |
| `"+1 (684) 633-5115"`, `"+49 30 83050"`   | phoneNumber | e.164     |
| `"4677658f-8865-47db-afb0-908e25246348"`  | uuid        | v4        |
| `"cfa649f0-650b-11ec-acb3-03462fc79f5d"`  | uuid        | v1        |
| `"bde4a7b9-5793-5a1f-b378-211205b15898"`  | uuid        | v5        |
| `"foo.example.com"`, `"localhost"`        | hostname    | rfc1123   |
| `"exa_mple.com"`                          | hostname    | rfc5890   |
| `"544B"`, `"1.0MB"`, `"377K"`, `"1.87GB"` | filesize    | human     |
| `'{ "foo": 1 }'`                          | json        | ecma262   |
| `'{ foo: 1, }'`                           | json        | json5     |

Please feel free to request additional formats by opening a [Github issue](https://github.com/jsonhero-io/json-infer-types/issues)
