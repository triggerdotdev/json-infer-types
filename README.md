# 🤔 JSON Infer Type

> Infer the types of JSON documents & values, with a large set of formats for strings

![Coverage lines](./badges/badge-lines.svg)
![Tests](https://github.com/jsonhero-io/json-infer-types/actions/workflows/test.yml/badge.svg?branch=main)
[![Downloads](https://img.shields.io/npm/dm/%40jsonhero%2Fjson-infer-types.svg)](https://npmjs.com/@jsonhero/json-infer-types)
[![Install size](https://packagephobia.com/badge?p=%40jsonhero%2Fjson-infer-types)](https://packagephobia.com/result?p=@jsonhero/json-infer-types)

## 🚀 Features

- Written in typescript
- Infers types of values inside objects and arrays
- Includes a large set of formats for strings
  - Dates and times (and timestamps)
  - Email addresses
  - Currencies
  - Countries
  - Top-Level Domains
  - IP Addresses
  - Languages
  - Phone Numbers
  - URIs
  - UUIDs
  - Hostnames

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

Objects have an additional `properties` property that infers its value types

```js
inferType({ foo: "bar" });
```

Will result in

```json
{ "name": "object", "properties": { "foo": { "name": "string" } } }
```
