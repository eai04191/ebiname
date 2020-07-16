const config = require("./config");

const q = config.ebiList.map((ebi) =>
    new Array(3).fill(ebi).join(config.zwnbsp)
);

const isEbisInOrder = (ebis) => {
    return q.includes(ebis);
};

exports.isEbisInOrder = isEbisInOrder;
