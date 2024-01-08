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

## Video presentation
To be added

## Installation
1. Clone the repository
```
git clone https://github.com/Elnur1337/smart-waste-management-system.git
```
2. Navigate to `./database`
```
cd ./database
```
3. Run `npm install` command
```
npm install
```
4. Run `createScript.sql` in MySQL Workbench.
5. Replace MySQL config in `loadData.js` with your config.
6. Run `loadData.js` with command
```
node loadData.js
```
7. Run `updateDatesToCurrentDates.sql` in MySQL Workbench.
8. Navigate to `./database/storedFunctionsAndProcedures`
```
cd ./database/storedFunctionsAndProcedures
```
9. Run `trashBinsCurrentState.sql` in MySQL Workbench.
10. Navigate to `../../client`
```
cd ../../client
```
11. Run `npm install command`
```
npm install
```
12. Replace Google Maps API key in `Map.jsx` with your key.
13. Open second terminal.
14. In second terminal navigate to `./server`
```
cd ./server
```
15. In second terminal run `npm install` command
```
npm install
```
16. Replace MySQL config in `./server/database/dbConfig.js` with your config.
17. In first terminal run `npm start` command
```
npm start
```
18. In second terminal run `npm start` command
```
npm start
```
19. Open your browser and navigate to `http://localhost:3000/`.

## Arduino setup (Optional)
To be added

## Usage
To be added

## Contact
To be added

## Acknowledgements
To be added