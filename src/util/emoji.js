const MersenneTwister = require("mersenne-twister");
const generator = new MersenneTwister();

const getRandomEmoji = (emojiArray) => {
    return emojiArray[Math.floor(generator.random() * emojiArray.length)];
};

const getRandomEmojiArray = (emojiArray, amount) => {
    let array = [];
    [...Array(amount)].map(() => array.push(getRandomEmoji(emojiArray)));
    return array;
};

exports.getRandomEmojiArray = getRandomEmojiArray;
