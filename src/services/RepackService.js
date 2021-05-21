import Api from '@/services/Api'

export default {
    uploadApk(formData) {
        return Api.repack().post('upload', formData)
    },
    downloadApk(sha1) {
        return Api.repack().get('download/' + sha1, { responseType: 'blob' })
    },
    getEntries() {
        return Api.repack().get('entries')
    },
    createEntry(sha1, title, description) {
        return Api.repack().post('entries', {
            title: title,
            description: description,
            sha1: sha1
        })
    }
}