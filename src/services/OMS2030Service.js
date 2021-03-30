import axios from 'axios';
import data from '../../public/data/OMS2030.json';

export default class OMS2030Service {
    get() {
        return axios.get(data).then(res => { res.config.url.data; console.log('PIDIENDO DATA', res) });
    }
}