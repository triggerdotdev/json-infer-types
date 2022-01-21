import jwt from "jsonwebtoken";

export type JSONJWTStringFormat = {
  name: "jwt";
};

export function inferJWT(value: string): JSONJWTStringFormat | undefined {
  const token = jwt.decode(value);

  if (token) {
    return {
      name: "jwt",
    };
  }

  return undefined;
}
