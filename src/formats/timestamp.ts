export type JSONTimestampFormat = {
  name: "timestamp";
  variant: "millisecondsSinceEpoch" | "nanosecondsSinceEpoch" | "secondsSinceEpoch";
};

const timestampSecondsSinceEpoch = /^\d{10}$/;
const timestampMsSinceEpoch = /^\d{13}$/;
const timestampNanoSinceEpoch = /^\d{19}$/;

// If the msSinceEpoch is within 2 years of the current time, then inRangeOfNow will be true
function inRangeOfNow(msSinceEpoch: number): boolean {
  const now = new Date().getTime();
  const acceptableRange = 2 * 365 * 24 * 60 * 60 * 1000;

  const lowerBound = msSinceEpoch - acceptableRange;
  const upperBound = msSinceEpoch + acceptableRange;

  return now >= lowerBound && now <= upperBound;
}

export function inferTimestamp(value: string | number): JSONTimestampFormat | undefined {
  if (typeof value === "number") {
    return inferTimestamp(`${value}`);
  }
  if (timestampSecondsSinceEpoch.test(value)) {
    const seconds = parseInt(value);

    if (inRangeOfNow(seconds * 1000)) {
      return {
        name: "timestamp",
        variant: "secondsSinceEpoch",
      };
    }
  }

  if (timestampMsSinceEpoch.test(value)) {
    const milliseconds = parseInt(value);

    if (inRangeOfNow(milliseconds)) {
      return {
        name: "timestamp",
        variant: "millisecondsSinceEpoch",
      };
    }
  }

  if (timestampNanoSinceEpoch.test(value)) {
    const nanoseconds = parseInt(value);

    if (inRangeOfNow(nanoseconds / 1000000)) {
      return {
        name: "timestamp",
        variant: "nanosecondsSinceEpoch",
      };
    }
  }

  return undefined;
}
