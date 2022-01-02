export type JSONTimestampFormat = {
  name: "timestamp";
  variant: "millisecondsSinceEpoch" | "nanosecondsSinceEpoch" | "secondsSinceEpoch";
};

const timestampSecondsSinceEpoch = /^\d{10}$/;
const timestampMsSinceEpoch = /^\d{13}$/;
const timestampNanoSinceEpoch = /^\d{19}$/;

export function inferTimestamp(value: string): JSONTimestampFormat | undefined {
  if (timestampSecondsSinceEpoch.test(value)) {
    return {
      name: "timestamp",
      variant: "secondsSinceEpoch",
    };
  }

  if (timestampMsSinceEpoch.test(value)) {
    return {
      name: "timestamp",
      variant: "millisecondsSinceEpoch",
    };
  }

  if (timestampNanoSinceEpoch.test(value)) {
    return {
      name: "timestamp",
      variant: "nanosecondsSinceEpoch",
    };
  }

  return undefined;
}
