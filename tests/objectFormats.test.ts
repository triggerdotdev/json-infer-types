import { inferType } from "../src";

describe("firestore timestamps", () => {
  test("it should infer an object with the firestore timestamp shape", () => {
    const value = {
      _seconds: 1642533020,
      _nanoseconds: 932000000,
    };

    expect(inferType(value)).toEqual({
      name: "object",
      format: { name: "firestoreTimestamp" },
      value,
    });
  });
});
