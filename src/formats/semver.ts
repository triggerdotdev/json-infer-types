export type JSONSemverFormat = {
  name: "semver";
};

const regex =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

export function inferSemver(value: string): JSONSemverFormat | undefined {
  if (regex.test(value)) {
    return { name: "semver" };
  }

  return undefined;
}
