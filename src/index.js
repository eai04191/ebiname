const axios = require("axios");
const MersenneTwister = require("mersenne-twister");

const host = process.env.MASTODON_HOST;
const token = process.env.MASTODON_TOKEN;
const name = process.env.MASTODON_NAME;
const botToken = process.env.MASTODON_BOT_TOKEN;
const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY;
const GITHUB_RUN_ID = process.env.GITHUB_RUN_ID;

const ebiList = ["🦐", ":straight_shrimp:", ":win98_shrimp:"];
const zwnbsp = String.fromCharCode(parseInt("0xFEFF", 16));

const ebis = getRandomEmojiArray(ebiList, 3).join(zwnbsp);

const body = {
    display_name: name + zwnbsp + ebis,
};

const client = axios.create({
    baseURL: `https://${host}/api/v1/`,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
});

const botClient = axios.create({
    baseURL: `https://${host}/api/v1/`,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${botToken}`,
    },
});

client
    .patch(`accounts/update_credentials`, body)
    .then((res) => {
        console.log("new name: ", body.display_name);
        console.log("update_credentials status: ", res.status);
    })
    .catch((err) => console.error(err));

const botStatus = `エビ揃えておいたで: ${ebis} @Eai https://github.com/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}`;
botClient
    .post(`statuses`, { status: botStatus })
    .then((res) => {
        console.log("bot post: ", botStatus);
        console.log("post status: ", res.status);
    })
    .catch((err) => console.error(err));

function getRandomEmoji(emojiArray) {
    const generator = new MersenneTwister();
    return emojiArray[Math.floor(generator.random() * emojiArray.length)];
}

function getRandomEmojiArray(emojiArray, amount) {
    let array = [];
    [...Array(amount)].map(() => array.push(getRandomEmoji(emojiArray)));
    return array;
}
