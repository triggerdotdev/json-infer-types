import { inferType } from "../src";

test("It should infer basic types", () => {
  expect(inferType(null)).toEqual({ name: "null" });
  expect(inferType(undefined)).toEqual({ name: "null" });
  expect(inferType(true)).toEqual({ name: "bool" });
  expect(inferType(1.1)).toEqual({ name: "float" });
  expect(inferType(1)).toEqual({ name: "int" });
  expect(inferType("hello world")).toEqual({ name: "string" });
  expect(inferType("")).toEqual({ name: "string" });
});

test("It should handle object properties", () => {
  expect(inferType({ foo: "bar" })).toEqual({
    name: "object",
    properties: { foo: { name: "string" } },
  });

  expect(inferType({ foo: 1 })).toEqual({
    name: "object",
    properties: { foo: { name: "int" } },
  });

  expect(inferType({ foo: 1, bar: { baz: "hello world" } })).toEqual({
    name: "object",
    properties: {
      foo: { name: "int" },
      bar: { name: "object", properties: { baz: { name: "string" } } },
    },
  });
});

test("It should handle array items", () => {
  expect(inferType([1, 2, 3])).toEqual({
    name: "array",
    items: { name: "int" },
  });

  expect(inferType([1, "hello world"])).toEqual({
    name: "array",
    items: [{ name: "int" }, { name: "string" }],
  });

  expect(inferType([1, { foo: "bar" }])).toEqual({
    name: "array",
    items: [{ name: "int" }, { name: "object", properties: { foo: { name: "string" } } }],
  });

  expect(inferType([1, { foo: "bar" }, { foo: "baz" }])).toEqual({
    name: "array",
    items: [{ name: "int" }, { name: "object", properties: { foo: { name: "string" } } }],
  });
});

it("Should handle arrays inside objects", () => {
  expect(inferType({ foo: [1, 2, 3] })).toEqual({
    name: "object",
    properties: {
      foo: { name: "array", items: { name: "int" } },
    },
  });
});

it("Should handle string formats inside objects inside arrays", () => {
  expect(
    inferType({
      foo: [
        {
          ts: "2019-01-01T00:00:00.000Z",
        },
        {
          ts: "2019-10-12T14:20:50.52+07:00",
        },
      ],
    }),
  ).toEqual({
    name: "object",
    properties: {
      foo: {
        name: "array",
        items: {
          name: "object",
          properties: {
            ts: {
              name: "string",
              format: {
                name: "datetime",
                parts: "datetime",
                variant: "rfc3339",
              },
            },
          },
        },
      },
    },
  });
});

it("should allow for shallow inference", () => {
  expect(
    inferType(
      {
        foo: [
          {
            ts: "2019-01-01T00:00:00.000Z",
          },
          {
            ts: "2019-10-12T14:20:50.52+07:00",
          },
        ],
      },
      { shallow: true },
    ),
  ).toEqual({
    name: "object",
  });
});
