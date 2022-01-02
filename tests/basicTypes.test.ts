import { inferType } from "../src";

test("It should infer basic types", () => {
  expect(inferType(null)).toEqual({ name: "null", value: null });
  expect(inferType(undefined)).toEqual({ name: "null", value: null });
  expect(inferType(true)).toEqual({ name: "bool", value: true });
  expect(inferType(1.1)).toEqual({ name: "float", value: 1.1 });
  expect(inferType(1)).toEqual({ name: "int", value: 1 });
  expect(inferType("hello world")).toEqual({
    name: "string",
    value: "hello world",
  });
  expect(inferType("")).toEqual({ name: "string", value: "" });
  expect(inferType({ foo: "bar" })).toEqual({ name: "object", value: { foo: "bar" } });
  expect(inferType([{ foo: "bar" }])).toEqual({ name: "array", value: [{ foo: "bar" }] });
});

test("It should narrow the type of the value", () => {
  const unknownInfer = (value: unknown): number | undefined => {
    const result = inferType(value);

    if (result.name === "int") {
      return result.value;
    }
  };

  const narrowedValue = unknownInfer(1);

  expect(narrowedValue == 1).toBe(true);
});

test("It should be useful for gathering type information from a JSON string", () => {
  const jsonString = `{ "foo": "bar", "baz": 1 }`;
  const jsonObject = JSON.parse(jsonString);

  const jsonType = inferType(jsonObject);

  if (jsonType.name === "object") {
    expect(jsonType.value).toEqual({ foo: "bar", baz: 1 });
  }
});
