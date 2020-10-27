const path = require('path');
const fs = require('fs');
const glob = require('glob');
const nunjucks = require('nunjucks');
const {series} = require('../tool/hook');


const update_template = ({projectName}, callback) => {
    const list = glob.sync('*');
    // const rootName = path.basename(process.cwd());
    if (list.indexOf(projectName) === -1){
        // fs.mkdirSync(projectName)
    }
    const source = fs.readFileSync(path.resolve(__dirname, '..', 'packages', 'index.html'), 'utf8');
    nunjucks.renderString(source, { username: 'James' }, function(error, res) {
        if (error)
            callback(error);
        else
            callback(null, res)
    })
}

const generate_output = (pre, callback) => {
    const dest = path.resolve(__dirname, '..', 'packages', '_index.html');
    fs.writeFileSync(dest, pre);
    callback(null, dest)
};

module.exports = series(update_template, generate_output);
