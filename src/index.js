const emoji = require("./util/emoji");
const fetch = require("./util/fetch");
const other = require("./util/other");
const config = require("./util/config");
const axios = require("axios");

const main = async () => {
    const ebis = emoji
        .getRandomEmojiArray(config.ebiList, 3)
        .join(config.zwnbsp);
    const name = [config.name, ebis].join(config.zwnbsp);
    const body = {
        display_name: name,
    };

    const client = axios.create({
        baseURL: `https://${config.host}/api/v1/`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.token}`,
        },
    });

    const botClient = axios.create({
        baseURL: `https://${config.host}/api/v1/`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.botToken}`,
        },
    });

    // えあいのプロフィールを更新する
    client
        .patch(`accounts/update_credentials`, body)
        .then((response) => {
            console.log("new name: ", body.display_name);
            console.log("update_credentials status: ", response.status);
        })
        .catch((error) => console.error(error));

    // botがメンションする
    const ghURL = `https://github.com/${config.GITHUB_REPOSITORY}/actions/runs/${config.GITHUB_RUN_ID}`;
    const orderText = other.isEbisInOrder(ebis)
        ? "……本当に揃ってた！" +
          (await fetch.fetchLatestStatus()).diffDays +
          "日ぶり！ "
        : " ";
    const botStatus = `@Eai エビ揃えておいたぞ: ${ebis}
${orderText}${ghURL}`;

    botClient
        .post(`statuses`, { status: botStatus })
        .then((response) => {
            console.log("bot post: ", botStatus);
            console.log("post status: ", response.status);
        })
        .catch((error) => console.error(error));
};
main();
