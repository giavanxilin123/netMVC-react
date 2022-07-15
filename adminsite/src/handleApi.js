export const handleApi = callApi => {
    return callApi.then(res => {
        return res
    }).catch(err => {
        return err
    })
}

