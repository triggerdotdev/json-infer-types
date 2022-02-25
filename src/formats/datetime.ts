type Rfc3339Extensions = Array<"timezone" | "calendar"> | undefined;

export type JSONDateTimeFormat = {
  name: "datetime";
  parts: "datetime" | "date" | "time";
  variant: "rfc2822" | "rfc3339";
  extensions?: Rfc3339Extensions;
};

export function inferDatetime(value: string): JSONDateTimeFormat | undefined {
  const rfc3339Match = inferRFC3339(value);

  if (rfc3339Match) {
    return rfc3339Match;
  }

  const rfc2822Match = inferRFC2822(value);

  if (rfc2822Match) {
    return rfc2822Match;
  }

  return undefined;
}

const rfc3339WithYmd =
  /^([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?(?:[T\s](\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?(?:(Z?)|([+-]\d\d)(?::?(\d\d))?))?(?:\[([A-Za-z/_-]+)\])?(?:\[(u-ca=(?:buddhist|chinese|coptic|dangi|ethioaa|ethiopic|gregory|hebrew|indian|islamic|islamic-umalqura|islamic-tbla|islamic-civil|islamic-rgsa|islamicc|iso8601|japanese|persian|roc))\])?$/;

const rfc3339WithWeekIndex =
  /^(\d{4})-?W(\d\d)(?:-?(\d))?(?:[T\s](\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?(?:(Z?)|([+-]\d\d)(?::?(\d\d))?))?(?:\[([A-Za-z/_-]+)\])?(?:\[(u-ca=(?:buddhist|chinese|coptic|dangi|ethioaa|ethiopic|gregory|hebrew|indian|islamic|islamic-umalqura|islamic-tbla|islamic-civil|islamic-rgsa|islamicc|iso8601|japanese|persian|roc))\])?$/;

const rfc3339WithOrdinal =
  /^(\d{4})-?(\d{3})?(?:[T\s](\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?(?:(Z?)|([+-]\d\d)(?::?(\d\d))?))?(?:\[([A-Za-z/_-]+)\])?(?:\[(u-ca=(?:buddhist|chinese|coptic|dangi|ethioaa|ethiopic|gregory|hebrew|indian|islamic|islamic-umalqura|islamic-tbla|islamic-civil|islamic-rgsa|islamicc|iso8601|japanese|persian|roc))\])?$/;

const rfc3339TimeOnly =
  /^(?:(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?(?:(Z?)|([+-]\d\d)(?::?(\d\d))?))?(?:\[([A-Za-z/_-]+)\])?(?:\[(u-ca=(?:buddhist|chinese|coptic|dangi|ethioaa|ethiopic|gregory|hebrew|indian|islamic|islamic-umalqura|islamic-tbla|islamic-civil|islamic-rgsa|islamicc|iso8601|japanese|persian|roc))\])?$/;

const rfc3339 = [
  {
    matches: rfc3339WithYmd,
    parts: rfc3339Parts,
    extensions: rfc3339Extensions(11, 12),
  },
  {
    matches: rfc3339WithWeekIndex,
    parts: rfc3339Parts,
    extensions: rfc3339Extensions(11, 12),
  },
  {
    matches: rfc3339WithOrdinal,
    parts: rfc3339WithOrdinalParts,
    extensions: rfc3339Extensions(10, 11),
  },
  {
    matches: rfc3339TimeOnly,
    parts: () => <const>"time",
    extensions: rfc3339Extensions(8, 9),
  },
];

function matchFilter(matches: RegExpMatchArray | null): boolean {
  if (!matches) {
    return false;
  }

  const truthyMatches = matches.filter((match) => !!match);

  return truthyMatches.length > 2;
}

function inferRFC3339(value: string): JSONDateTimeFormat | undefined {
  const rfc3339Matches = rfc3339
    .map((rfc) => {
      return {
        matches: rfc.matches.exec(value),
        parts: rfc.parts,
        extensions: rfc.extensions,
      };
    })
    .filter((rfc) => matchFilter(rfc.matches));

  const rfc3339BestMatch = rfc3339Matches.sort(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    (a, b) => b.matches!.length - a.matches!.length,
  )[0];

  if (rfc3339BestMatch) {
    return {
      name: "datetime",
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      parts: rfc3339BestMatch.parts(rfc3339BestMatch.matches!),
      variant: "rfc3339",
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      extensions: rfc3339BestMatch.extensions(rfc3339BestMatch.matches!),
    };
  }

  return undefined;
}

function rfc3339Parts(match: RegExpMatchArray): "datetime" | "date" {
  const dateParts = [1, 2, 3];
  const timeParts = [4, 5, 6, 7];

  const hasSomeDateParts = dateParts.some((i) => match[i] !== undefined);
  const hasSomeTimeParts = timeParts.some((i) => match[i] !== undefined);

  if (hasSomeDateParts && hasSomeTimeParts) {
    return "datetime";
  }

  return "date";
}

function rfc3339Extensions(
  timezoneIndex = 11,
  calendarIndex = 12,
): (match: RegExpMatchArray) => Rfc3339Extensions {
  return (match: RegExpMatchArray): Rfc3339Extensions => {
    const extensions: Array<"timezone" | "calendar"> = [];

    if (match[timezoneIndex] !== undefined) {
      extensions.push("timezone");
    }

    if (match[calendarIndex] !== undefined) {
      extensions.push("calendar");
    }

    return extensions.length > 0 ? extensions : undefined;
  };
}

function rfc3339WithOrdinalParts(match: RegExpMatchArray): "datetime" | "date" {
  const dateParts = [1, 2];
  const timeParts = [3, 4, 5, 6];

  const hasSomeDateParts = dateParts.some((i) => match[i] !== undefined);
  const hasSomeTimeParts = timeParts.some((i) => match[i] !== undefined);

  if (hasSomeDateParts && hasSomeTimeParts) {
    return "datetime";
  }

  return "date";
}

const rfc2822 =
  /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;

function inferRFC2822(value: string): JSONDateTimeFormat | undefined {
  const rfc2822Matches = rfc2822.exec(value);

  if (rfc2822Matches) {
    return {
      name: "datetime",
      parts: "datetime",
      variant: "rfc2822",
    };
  }

  return undefined;
}
