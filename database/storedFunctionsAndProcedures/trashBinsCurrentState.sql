DELIMITER //
CREATE PROCEDURE trashBinsCurrentState()
BEGIN
    CREATE TEMPORARY TABLE trashBinsLastPickup AS
    SELECT trashBinId, dateAndTime
    FROM trashBinsInPickups
    JOIN pickups ON trashBinsInPickups.pickupId = pickups.id
    WHERE pickups.dateAndTime =
    (
		SELECT MAX(dateAndTime) FROM pickups
        JOIN trashBinsInPickups trashBinsInPickupsN ON trashBinsInPickupsN.pickupId = pickups.id
        WHERE trashBinsInPickupsN.trashBinId = trashBinsInPickups.trashBinId
	);
    
	CREATE TEMPORARY TABLE lastUpdatesTime AS
	SELECT
		trashBinId,
		MAX(dateAndTime) AS dateAndTime
	FROM updates
	GROUP BY trashBinId;
    
    CREATE TEMPORARY TABLE lastUpdates AS
	SELECT
		DISTINCT updates.dateAndTime,
		updates.trashBinId,
		updates.fillLevel
	FROM updates
	JOIN lastUpdatesTime ON updates.trashBinId = lastUpdatesTime.trashBinId AND updates.dateAndTime = lastUpdatesTime.dateAndTime;
    
    SELECT
		trashBins.id,
        locations.lat,
        locations.lng,
        locations.address,
        lastUpdates.fillLevel,
        trashBinsLastPickup.dateAndTime,
        IF(lastUpdates.fillLevel >= 75 OR (lastUpdates.fillLevel != 0 AND (trashBinsLastPickup.dateAndTime < DATE_ADD(NOW(), INTERVAL -2 DAY)) OR trashBinsLastPickup.dateAndTime IS NULL), "Y", "N") AS readyForPickup,
        lastUpdates.dateAndTime AS lastUpdate,
        IF(lastUpdates.dateAndTime < DATE_ADD(NOW(), INTERVAL -2 DAY), "Y", "N") AS possibleBreak
	FROM trashBins
    JOIN locations ON trashBins.locationId = locations.id
    JOIN lastUpdates ON trashBins.id = lastUpdates.trashBinid
    LEFT JOIN trashBinsLastPickup ON trashBins.id = trashBinsLastPickup.trashBinId;
    
    DROP TABLE trashBinsLastPickup;
	DROP TABLE lastUpdatesTime;
	DROP TABLE lastUpdates; 
END//