import axios from 'axios'

export default{
    backend() {
        return axios.create({
            baseURL: `http://192.168.1.5:60001/api/`
        })
    },
    repack() {
        return axios.create({
            baseURL: `http://192.168.1.5:50000/api/`
        })
    }
}
