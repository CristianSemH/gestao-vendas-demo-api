
exports.messages = (errors) => {
    if (errors.errors) {
        if (errors.errors.length > 0) {
            return errors.errors.map(e => {
                return {
                    message: e.message
                }
            })
        } else {
            const message = [{ message: errors.parent.detail }]
            return message
        }
    } else {
        return errors
    }
};
