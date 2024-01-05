//Libraries
import axios from 'axios';

const getData = async (route, config) => {
    let result;
    if (config) {
        result = await axios.post(route, config);
    } else {
        result = await axios.get(route);
    }
    return result.data;
}

export default getData;