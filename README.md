# Smart waste management system
<p align="justify">
Smart waste management system is a web application with which the city administration can intelligently manage the garbage disposal process. The application allows monitoring the current fill level of any trash bin in the city. Application allows creation of smart routes for garbage trucks so that only the trash bins that really need to be picked up are picked up.
</p>

## Tech stack
- React.js
- Node.js
- Express.js
- MySQL
- SocketIO
- Arduino

## Screenshots
To be added

## Installation
1. Navigate to `./database`
```
cd ./database
```
2. Run `npm install` command
```
npm install
```
3. Run `createScript.sql` in MySQL Workbench.
4. Replace MySQL config in `loadData.js` with your config.
5. Run `loadData.js` with command
```
node loadData.js
```
6. Run `updateDatesToCurrentDates.sql` in MySQL Workbench.
7. Navigate to `./database/storedFunctionsAndProcedures`
```
cd ./database/storedFunctionsAndProcedures
```
8. Run `trashBinsCurrentState.sql` in MySQL Workbench.
9. Navigate to `../../client`
```
cd ../../client
```
10. Run `npm install command`
```
npm install
```
11. Replace Google Maps API key in `Map.jsx` with your key.
12. Open second terminal.
13. In second terminal navigate to `./server`
```
cd ./server
```
14. In second terminal run `npm install` command
```
npm install
```
15. Replace MySQL config in `./server/database/dbConfig.js` with your config.
16. In first terminal run `npm start` command
```
npm start
```
17. In second terminal run `npm start` command
```
npm start
```
18. Open your browser and navigate to `http://localhost:3000/`.