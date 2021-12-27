import { text } from "stream/consumers";
import { inferType } from "../src";

describe("rfc3339", () => {
  test.each([
    "2019-01-01T00:00:00.000Z",
    "2019-01-01 00:00:00.000Z",
    "2019-10-12T14:20:50.52+07:00",
    "2019-10-12 14:20:50.52-12:00",
    "2016-05-25T09:08:34.123",
    "1983-10-14T13:30Z",
    "2016-05-25T09",
    "2016-05-25T09:24",
    "2016-05-25T09:24:15",
    "2016-05-25T09:24:15,123",
    "2016-05-25T09:24:15.1239999",
    "2016-W21-3T09:24:15.123Z", // Accepts ISO week date
    "2016-200T09:24:15.123", // Accepts ordinal date
  ])("%p should be inferred as an rfc3339 datetime", (value) => {
    expect(inferType(value)).toEqual({
      name: "string",
      format: {
        name: "datetime",
        parts: "datetime",
        variant: "rfc3339",
      },
    });
  });

  test.each([
    "2016-05",
    "2016-05-25",
    "+002016-05-25",
    "2016-W21",
    "2016-W21-3",
    "2016-200",
  ])("%p should be inferred as an rfc3339 date", (value) => {
    expect(inferType(value)).toEqual({
      name: "string",
      format: {
        name: "datetime",
        parts: "date",
        variant: "rfc3339",
      },
    });
  });

  test.each(["09:24:15.123Z", "09:24:15", "09:24"])(
    "%p should be inferred as an rfc3339 time",
    (value) => {
      expect(inferType(value)).toEqual({
        name: "string",
        format: {
          name: "datetime",
          parts: "time",
          variant: "rfc3339",
        },
      });
    }
  );
});

describe("rfc2822", () => {
  test.each([
    "Tue, 01 Nov 2016 13:23:12 +0630",
    "Sun, 12 Apr 2015 05:06:07 GMT",
    "Tue, 01 Nov 2016 01:23:45 +0000",
    "Tue, 01 Nov 16 04:23:45 Z",
    "01 Nov 2016 05:23:45 z",
    "Mon, 02 Jan 2017 06:00:00 -0800",
    "Mon, 02 Jan 2017 06:00:00 +0800",
    "Mon, 02 Jan 2017 06:00:00 +0330",
    "Mon, 02 Jan 2017 06:00:00 -0330",
    "Mon, 02 Jan 2017 06:00:00 PST",
    "Mon, 02 Jan 2017 06:00:00 PDT",
  ])("%p should be inferred as an rfc2822 datetime", (value) => {
    expect(inferType(value)).toEqual({
      name: "string",
      format: {
        name: "datetime",
        parts: "datetime",
        variant: "rfc2822",
      },
    });
  });
});

describe("timestamps", () => {
  test.each(["1596597629980", "1640273437757"])(
    "%p should be inferred as an timestamp",
    (value) => {
      expect(inferType(value)).toEqual({
        name: "string",
        format: {
          name: "timestamp",
          variant: "millisecondsSinceEpoch",
        },
      });
    }
  );

  test.each(["1640273389", "1608737603"])(
    "%p should be inferred as an timestamp",
    (value) => {
      expect(inferType(value)).toEqual({
        name: "string",
        format: {
          name: "timestamp",
          variant: "secondsSinceEpoch",
        },
      });
    }
  );

  test.each(["1596597839946364285"])(
    "%p should be inferred as an timestamp",
    (value) => {
      expect(inferType(value)).toEqual({
        name: "string",
        format: {
          name: "timestamp",
          variant: "nanosecondsSinceEpoch",
        },
      });
    }
  );
});

describe("email addresses", () => {
  test.each([
    "eallam@icloud.com",
    "example+suffix@example.com",
    "example@127.0.0.1",
    "test.email.with+symbol@example.com",
    "id-with-dash@example.com",
    "id-with-dash@example.co.uk",
    "foo@example.accountants",
  ])("%p should be inferred as an email", (value) => {
    expect(inferType(value)).toEqual({
      name: "string",
      format: {
        name: "email",
        variant: "rfc5321",
      },
    });
  });

  test.each([
    "Example Name <example@example.com>",
    "John <johndoe@example.com>",
    "Example S. Name <example.s.name@example.com>",
  ])("%p should be inferred as an email", (value) => {
    expect(inferType(value)).toEqual({
      name: "string",
      format: {
        name: "email",
        variant: "rfc5322",
      },
    });
  });
});

describe("currencies", () => {
  test.each(["USD", "XPF", "BTC"])(
    "%p should be inferred as a currency code",
    (value) => {
      expect(inferType(value)).toEqual({
        name: "string",
        format: {
          name: "currency",
          variant: "iso4217",
        },
      });
    }
  );

  test.each(["LTC", "ETH", "XRP"])(
    "%p should be inferred as a crypto currency",
    (value) => {
      expect(inferType(value)).toEqual({
        name: "string",
        format: {
          name: "currency",
          variant: "crypto",
        },
      });
    }
  );

  test.each(["Euro", "United States dollar", "US Dollar"])(
    "%p should be inferred as a currency in english",
    (value) => {
      expect(inferType(value)).toEqual({
        name: "string",
        format: {
          name: "currency",
          variant: "english",
        },
      });
    }
  );
});

describe("country", () => {
  test.each(["USA", "UZB", "SGP", "NFK", "MMR", "KEN", "FJI"])(
    "%p should be inferred as a iso3166-3 country code",
    (value) => {
      expect(inferType(value)).toEqual({
        name: "string",
        format: {
          name: "country",
          variant: "iso3166-3",
        },
      });
    }
  );

  test.each(["US", "GB", "JP", "NZ", "SV", "DE", "IE"])(
    "%p should be inferred as a iso3166-2 country code",
    (value) => {
      expect(inferType(value)).toEqual({
        name: "string",
        format: {
          name: "country",
          variant: "iso3166-2",
        },
      });
    }
  );
});

describe("tlds", () => {
  test.each([
    ".com",
    ".co.uk",
    ".biz",
    ".com.mx",
    ".org.au",
    ".cf",
    ".nz.basketball",
    ".accountants",
    ".immobilien",
  ])("%p should be inferred as a tld", (value) => {
    expect(inferType(value)).toEqual({
      name: "string",
      format: {
        name: "tld",
      },
    });
  });
});

describe("ip address", () => {
  test.each(["192.168.0.1", "172.16.0.0"])(
    "%p should be inferred as an ipv4 address",
    (value) => {
      expect(inferType(value)).toEqual({
        name: "string",
        format: {
          name: "ip",
          variant: "v4",
        },
      });
    }
  );

  test.each(["2001:db8:1234::1", "2001:0:ce49:7601:e866:efff:62c3:fffe"])(
    "%p should be inferred as an ipv6 address",
    (value) => {
      expect(inferType(value)).toEqual({
        name: "string",
        format: {
          name: "ip",
          variant: "v6",
        },
      });
    }
  );
});

describe("language", () => {
  test.each(["en", "ab", "aa", "es"])(
    "%p should be inferred as a language iso693-1 code",
    (value) => {
      expect(inferType(value)).toEqual({
        name: "string",
        format: {
          name: "language",
          variant: "iso693-1",
        },
      });
    }
  );

  test.each(["eng", "eus", "ind", "zul"])(
    "%p should be inferred as a language iso693-2 code",
    (value) => {
      expect(inferType(value)).toEqual({
        name: "string",
        format: {
          name: "language",
          variant: "iso693-2",
        },
      });
    }
  );

  test.each(["Arabic", "Welsh", "Russian", "Swahili"])(
    "%p should be inferred as a language in english",
    (value) => {
      expect(inferType(value)).toEqual({
        name: "string",
        format: {
          name: "language",
          variant: "english",
        },
      });
    }
  );

  test.each(["eesti, eesti keel", "Afaan Oromoo", "dansk", "Español"])(
    "%p should be inferred as a native language",
    (value) => {
      expect(inferType(value)).toEqual({
        name: "string",
        format: {
          name: "language",
          variant: "native",
        },
      });
    }
  );
});

describe("phone numbers", () => {
  test.each([
    "+1 684-633-5115",
    "+49 30 83050",
    "+355 4 224 7285",
    "+1 323-867-5309",
    "+1 (684) 633-5115",
  ])("%p should be inferred as an internation phone number", (value) => {
    expect(inferType(value)).toEqual({
      name: "string",
      format: {
        name: "phoneNumber",
        variant: "e.164",
      },
    });
  });
});

describe("uris", () => {
  test.each([
    "https://www.example.com/foo#bar",
    "file://host/path",
    "https://goole.com?hello=world",
  ])("%p should be inferred as a rfc3986 URI", (value) => {
    expect(inferType(value)).toEqual({
      name: "string",
      format: {
        name: "uri",
      },
    });
  });

  test("It should correctly infer the contentType of the uri", () => {
    expect(inferType("https://www.example.com/foo.json")).toEqual({
      name: "string",
      format: {
        name: "uri",
        contentType: "application/json",
      },
    });

    expect(inferType("https://www.example.com/foo.md")).toEqual({
      name: "string",
      format: {
        name: "uri",
        contentType: "text/markdown",
      },
    });

    expect(inferType("https://www.example.com/foo.jpg")).toEqual({
      name: "string",
      format: {
        name: "uri",
        contentType: "image/jpeg",
      },
    });

    expect(inferType("https://www.example.com/foo.png")).toEqual({
      name: "string",
      format: {
        name: "uri",
        contentType: "image/png",
      },
    });
  });
});

describe("uuids", () => {
  test.each(["4677658f-8865-47db-afb0-908e25246348"])(
    "%p should be inferred as a v4 uuid",
    (value) => {
      expect(inferType(value)).toEqual({
        name: "string",
        format: {
          name: "uuid",
          variant: "v4",
        },
      });
    }
  );

  test.each(["cfa649f0-650b-11ec-acb3-03462fc79f5d"])(
    "%p should be inferred as a v1 uuid",
    (value) => {
      expect(inferType(value)).toEqual({
        name: "string",
        format: {
          name: "uuid",
          variant: "v1",
        },
      });
    }
  );

  test.each(["bde4a7b9-5793-5a1f-b378-211205b15898"])(
    "%p should be inferred as a v5 uuid",
    (value) => {
      expect(inferType(value)).toEqual({
        name: "string",
        format: {
          name: "uuid",
          variant: "v5",
        },
      });
    }
  );
});

describe("hostnames", () => {
  test.each([
    "localhost",
    "example.com",
    "foo.example.com",
    "exa-mple.co.uk",
    "example.com.",
  ])("%p should be inferred as a rfc1123 hostname", (value) => {
    expect(inferType(value)).toEqual({
      name: "string",
      format: {
        name: "hostname",
        variant: "rfc1123",
      },
    });
  });

  test.each(["exa_mple.com"])(
    "%p should be inferred as a rfc5890 hostname",
    (value) => {
      expect(inferType(value)).toEqual({
        name: "string",
        format: {
          name: "hostname",
          variant: "rfc5890",
        },
      });
    }
  );

  test.each([`${"example".repeat(36)}.com`])(
    "%p should NOT be inferred as a hostname",
    (value) => {
      expect(inferType(value)).toEqual({
        name: "string",
      });
    }
  );
});

describe("file sizes", () => {
  test.each(["544B", "1.0MB", "377K", "1.87GB", "8MiB", "1 KB", "25kB"])(
    "%p should be inferred as a file size",
    (value) => {
      expect(inferType(value)).toEqual({
        name: "string",
        format: {
          name: "filesize",
          variant: "human",
        },
      });
    }
  );
});

describe("json", () => {
  test.each([
    '{ "foo": 1 }',
    '{"name":"string","format":{"name":"filesize","variant":"human"}}',
  ])("%p should be inferred as a json string", (value) => {
    expect(inferType(value)).toEqual({
      name: "string",
      format: {
        name: "json",
      },
    });
  });
});
