import Api from '@/services/Api'

export default {
    fetchPayloads() {
        return Api.backend().get('payload')
    },
    fetchPayload(payload_id) {
        return Api.backend().get('payload?payload_id=' + payload_id)
    },
    createPayload(newPayload) {
        return Api.backend().post('payload', newPayload)
    },
    editPayload(payload_id, newPayload) {
        return Api.backend().put('payload?payload_id=' + payload_id, newPayload)
    },
    deletePayload(payload_id) {
        return Api.backend().delete('payload?payload_id=' + payload_id)
    }
}
