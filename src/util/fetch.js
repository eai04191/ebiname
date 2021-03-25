const config = require("./config");
const axios = require("axios");
const dayjs = require("dayjs");

const fetchLatestStatus = async () => {
    const botAcct = "bot@stellaria.network";
    const q = "本当に揃ってた！"

    return await axios
        .get(`https://notestock.osa-p.net/api/v1/search.json`, {
            params: { q: q, acct: botAcct },
        })
        .then((res) => {
            const data = res.data;
            const status = data.statuses[0];
            const latestDate = new Date(status.published);

            return {
                date: latestDate,
                humanreadableDate: dayjs(latestDate).format("YYYY/MM/DD"),
                diffDays: dayjs().diff(latestDate, "day"),
                url: status.url,
            };
        });
};

exports.fetchLatestStatus = fetchLatestStatus;
