import Api from '@/services/Api'

export default {
    fetchDevices () {
        return Api().get('devices')
    },
    activate (device, payload_id, arg) {
        let data = {
            payload_id: payload_id,
            device: device,
            payload_args: arg
        };
        return Api().post('devices', data)
    }
}
