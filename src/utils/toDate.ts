interface FirebaseTimestamp {
  seconds: number;
  nanoseconds: number;
}

interface UnderscoreTimestamp {
  _seconds: number;
  _nanoseconds?: number;
}

interface HasToDateMethod {
  toDate: () => Date;
}

type TimestampInput =
  | Date
  | FirebaseTimestamp
  | UnderscoreTimestamp
  | number
  | string
  | HasToDateMethod
  | null
  | undefined;

const toDate = (input: TimestampInput): Date | null => {
  if (!input) {
    return null;
  }

  if (input instanceof Date) {
    return input;
  }

  if (typeof input === "object") {
    if ("toDate" in input && typeof input.toDate === "function") {
      return (input as HasToDateMethod).toDate();
    }
    if ("seconds" in input && typeof input.seconds === "number") {
      return new Date((input as FirebaseTimestamp).seconds * 1000);
    }
    if ("_seconds" in input && typeof input._seconds === "number") {
      return new Date((input as UnderscoreTimestamp)._seconds * 1000);
    }
  }

  if (typeof input === "number") {
    return new Date(input);
  }

  if (typeof input === "string") {
    const date = new Date(input);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }

  return null;
};

export default toDate;
