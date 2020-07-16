const config = require("../util/config");
const fetch = require("../util/fetch");
const axios = require("axios");
const { advanceTo } = require("jest-date-mock");

jest.mock("axios");

test("notestock API", () => {
    advanceTo(new Date("2020-07-16T18:47:16Z"));

    const response = require("./notestock-response.json");
    const expectData = {
        date: new Date("2020-07-10T15:11:07Z"),
        diffDays: 6,
        humanreadableDate: "2020/07/11",
        url: "https://stellaria.network/@bot/104490196456289281",
    };
    axios.get.mockResolvedValue({ data: response });

    return fetch
        .fetchLatestStatus()
        .then((data) => expect(data).toEqual(expectData));
});
