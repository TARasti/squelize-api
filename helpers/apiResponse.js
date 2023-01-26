const apiResponse = (success, statusCode, message, data) => {
    return {
        success: success,
        status: statusCode,
        message: message,
        data: data
    };    
}

module.exports = apiResponse;