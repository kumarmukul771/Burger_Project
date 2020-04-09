import axios from 'axios';

const instances = axios.create({
    baseURL : 'https://react-my-burger-5c636.firebaseio.com/'
})

export default instances;