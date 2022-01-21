export type JSONFirestoreTimestampFormat = {
  name: "firestoreTimestamp";
};

type FirestoreTimestamp = {
  _seconds: number;
  _nanoseconds: number;
};

function isFirestoreTimestamp(value: object): value is FirestoreTimestamp {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as FirestoreTimestamp)._seconds === "number" &&
    typeof (value as FirestoreTimestamp)._nanoseconds === "number"
  );
}

export function inferFirestoreTimestamp(value: object): JSONFirestoreTimestampFormat | undefined {
  if (isFirestoreTimestamp(value)) {
    return {
      name: "firestoreTimestamp",
    };
  }

  return undefined;
}
