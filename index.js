const config = require('./config.js');
const https = require('https');
const { stringify } = require('querystring');

const request = params => {
    return new Promise((resolve, reject) => {
        https
            .get(params, res => {
                let data = '';
                res.on('data', chunk => (data += chunk));
                res.once('end', () => {
                    try {
                        resolve(JSON.parse(data));
                    } catch (err) {
                        reject(err);
                    }
                });
                res.once('error', err => reject(err));
            })
            .once('error', err => reject(err));
    });
};

exports.handler = function(event, context, callback) {
    if (!config.accessToken) {
        return callback('You need to set the accessToken in your config.js');
    }
    const params = {
        access_token: config.accessToken
    };

    if (context.min_id) {
        params.min_id = context.min_id;
    }

    if (context.max_id) {
        params.max_id = context.max_id;
    }

    if (context.count) {
        context.count = context.count;
    }

    request({
        host: 'api.instagram.com',
        path: `/v1/users/self/media/recent/?${stringify(params)}`
    })
        .then(data => {
            if (config.transform) {
                data = config.transform(data.data);
            }
            next_max_id = (data.pagination||{}).next_max_id || null;
            callback(null, { data, next_max_id });
        })
        .catch(err => {
            callback('error getting data from api, check your lambda logs', []);
        });
};