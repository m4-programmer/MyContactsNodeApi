const success  = (message, data = [] ,code = 200) => ({ success: true,status: code, message, data });
const failure  = ( message = "", error = [], code = 500 ) => ({ success: false, status: code, message, error });

module.exports = {success, failure};