import { inferType } from "../src";

describe("timestamps", () => {
  test.each([1664976736123, 1664976736567])("%p should be inferred as an timestamp", (value) => {
    expect(inferType(value)).toEqual({
      name: "int",
      value,
      format: {
        name: "timestamp",
        variant: "millisecondsSinceEpoch",
      },
    });
  });

  test.each([1664976736, 1664976736])("%p should be inferred as an timestamp", (value) => {
    expect(inferType(value)).toEqual({
      name: "int",
      value,
      format: {
        name: "timestamp",
        variant: "secondsSinceEpoch",
      },
    });
  });
});

describe("without format", () => {
  test.each([46, 2244994945, 1212092628029698048])(
    "%p should be inferred as having no format",
    (value) => {
      expect(inferType(value)).toEqual({
        name: "int",
        value,
      });
    },
  );
});
