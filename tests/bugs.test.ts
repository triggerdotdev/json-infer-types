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

test(`"creditCardNumber:NullValue,\ncreditCardExpirationMonth:NullValue,\ncreditCardExpirationYear:NullValue,\ncardSecurityCode:NullValue,\ncreditCardState:NullValue,\n" is a string with no format`, () => {
  expect(
    inferType(
      "creditCardNumber:NullValue,\ncreditCardExpirationMonth:NullValue,\ncreditCardExpirationYear:NullValue,\ncardSecurityCode:NullValue,\ncreditCardState:NullValue,\n",
    ),
  ).toEqual({
    name: "string",
    value:
      "creditCardNumber:NullValue,\ncreditCardExpirationMonth:NullValue,\ncreditCardExpirationYear:NullValue,\ncardSecurityCode:NullValue,\ncreditCardState:NullValue,\n",
  });
});
