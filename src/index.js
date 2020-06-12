const axios = require("axios");
const MersenneTwister = require("mersenne-twister");

const host = process.env.MASTODON_HOST;
const token = process.env.MASTODON_TOKEN;
const name = process.env.MASTODON_NAME;

const ebiList = ["🦐", ":straight_shrimp:", ":win98_shrimp:"];
const zwnbsp = String.fromCharCode(parseInt("0xFEFF", 16));

const body = {
    display_name:
        name +
        zwnbsp +
        getRandomEbi(ebiList) +
        zwnbsp +
        getRandomEbi(ebiList) +
        zwnbsp +
        getRandomEbi(ebiList),
};

console.log(body);

const client = axios.create({
    baseURL: `https://${host}/api/v1/`,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
});

client
    .patch(`accounts/update_credentials`, body)
    .then((res) => console.log(res.status))
    .catch((err) => console.error(err));

function getRandomEbi(array) {
    const generator = new MersenneTwister();
    return array[Math.floor(generator.random_incl() * array.length)];
}
