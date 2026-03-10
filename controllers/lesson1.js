const teekayRoute = (req, res) => {
    res.send("teekay");
}
const teoryRoute = (req, res) => {
    res.send("teory");
};

const joyRoute = (req, res) => {
    res.send("joy");
};

module.exports = {
    teekayRoute,
    teoryRoute,
    joyRoute,
};