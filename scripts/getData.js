let axios = require('axios');

let config = {
    method: 'get',
    url: 'http://api.data.go.kr/openapi/tn_pubr_public_free_mlsv_api?serviceKey=b7%2BNGZ' +
            '%2BxRbFG9ApCFAM3aCNPNwrEvmCyzXzVfIfbaXEpSDY8kSqxnU9j3eUAkZYKaVVzIlZMscxVYmyHKO' +
            'rarg%3D%3D&pageNo=1&numOfRows=1500&type=json',
    headers: {
        'Cookie': 'SCOUTER=x4n12f8688mjeh; clientid=040027336549'
    }
};

axios(config)
    .then(function (response) {
        // console.log(JSON.stringify(response.data));
        if(response.data) {
            console.log('Success get Data!');
        }
    })
    .catch(function (error) {
        console.log(error);
    });
