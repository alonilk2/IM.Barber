exports.Error0 = (err) => {
    return {
        error: err,
        success: false,
        status: 0
    };
}
exports.Error1 = (err) => {
    return {
        error: err,
        success: false,
        status: 1
    };
}


exports.Success0 = () => {
    return {
        success: true
    };
}
exports.SuccessExtended = (info) => {
    return {
        success: true,
        message: info
    };
}