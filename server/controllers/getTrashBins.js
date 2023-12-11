const database = require('../database/dbConfig');

const getTrashBins = (req, res) => {
    const query = "SELECT * FROM trashBin";
    database.query(query, (err, result) => {
        return res.status(200).json(result);
    });
}
module.exports = getTrashBins;