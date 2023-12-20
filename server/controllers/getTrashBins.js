const database = require('../database/dbConfig');

const getTrashBins = (req, res) => {
    const query = `
    CREATE TEMPORARY TABLE trashBinsLastPickup AS
	    SELECT trashBinId, timeOfPickup
        FROM trashbinpickups
        JOIN pickups ON trashbinpickups.pickUpId = pickups.id
        WHERE
            pickups.timeOfPickup = (SELECT 
                                        MAX(timeOfPickup) 
                                    FROM pickups 
                                    JOIN trashbinpickups trashbinpickupsN ON trashbinpickupsN.pickUpId = pickups.id 
                                    WHERE trashbinpickupsN.trashBinId = trashbinpickups.trashBinId);

    SELECT
	    trashbin.*,
        IF(trashbin.distance < 15 OR (trashbin.distance != 100 AND trashBinsLastPickup.timeOfPickup < DATE_ADD(NOW(), INTERVAL -2 DAY)), "Y", "N") AS readyForPickup
    FROM trashbin
    JOIN trashBinsLastPickup ON trashbin.id = trashBinsLastPickup.trashBinId;

    DROP TEMPORARY TABLE trashBinsLastPickup;`;
    database.query(query, (err, result) => {
        return res.status(200).json(result[1]);
    });
}
module.exports = getTrashBins;