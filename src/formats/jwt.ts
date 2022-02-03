import jwtDecode from "jwt-decode";

export type JSONJWTStringFormat = {
  name: "jwt";
};

export function inferJWT(value: string): JSONJWTStringFormat | undefined {
  try {
    const token = jwtDecode(value);

    if (token) {
      return {
        name: "jwt",
      };
    }
  } catch {
    // ignore
  }

  return undefined;
}
