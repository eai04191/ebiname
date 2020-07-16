const config = require("../util/config");
const other = require("../util/other");

test("エビが揃っているか確認する関数", () => {
    const trueEbis = ["🦐", "🦐", "🦐"].join(config.zwnbsp);
    expect(other.isEbisInOrder(trueEbis)).toBeTruthy();
});
