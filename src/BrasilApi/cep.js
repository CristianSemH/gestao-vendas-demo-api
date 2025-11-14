const axios = require('axios');

exports.searchCep = async (cep) => {
    try {
        const response = await axios.get('https://brasilapi.com.br/api/cep/v1/' + cep + '?test')
        return response.data
    } catch (error) {
        return { ...error }
    }
};