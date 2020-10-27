const fs = require('fs');
const path = require('path');
const https = require('https');


const download = (url, dest, cb) => {
    const file = fs.createWriteStream(dest);
    const request = https.get(url,  (response) => {
        response.pipe(file);
        file.on('finish', function () {
            file.close(cb);
        });
    }).on('error', (err) => {
        fs.unlink(dest);
        if (cb) cb(err.message);
    });
}

const zip = (src, dest) => {

}

// const branch = 'master';
// const project_name = 'chips-ui'
// const project_org = 'jinbaozheng'
// const url = `https://github.com/${project_org}/${project_name}/archive/${branch}.zip`;
// download(url, path.resolve(__dirname, 'chips-ui.zip'), function(){
//     console.log('Done')
// })

// module.exports = download;
