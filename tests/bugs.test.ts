import { inferType } from "../src";

test("https://www.mattaitken.com is a string with format of uri", () => {
  expect(inferType("https://www.mattaitken.com")).toEqual({
    name: "string",
    value: "https://www.mattaitken.com",
    format: {
      name: "uri",
    },
  });
});
