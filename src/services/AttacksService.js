import Api from '@/services/Api'

export default {
    fetchAttacks() {
        return Api.backend().get('attacks')
    },
    fetchAttack(attack_id) {
        return Api.backend().get('attacks?attack_id=' + attack_id)
    },
    deleteAttack(attack_id) {
        return Api.backend().delete('attacks?attack_id=' + attack_id)
    }
}
