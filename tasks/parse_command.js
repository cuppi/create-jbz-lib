const cfonts = require('cfonts');
const inquirer = require('inquirer');
const {program} = require('commander');
const {series} = require('../tool/hook');


const pick_options = (pre) => {
    cfonts.say('CREATE-LIB', {
        font: 'block',
        align: 'left',
        letterSpacing: 1,
        lineHeight: 1,
        space: true,
        gradient: ['red', '#f80'],
    });
    program
        .name('create-jbz-lib')
        .usage('<project-name> [options]')
        .arguments('<project-name>')
        .option('-d, --debug')
        .parse(pre)

    const [projectName] = program.args;
    if (!projectName){
        program.help();
        return false;
    }
    return projectName;
};

const question_user = (pre, callback) => {
    inquirer
        .prompt([{
            type: 'confirm',
            message: '是否增加 test 目录',
            name: 'initTest',
            default: true // 默认值
        }])
        .then(answers => {
            callback(null, {answers, projectName: pre});
        })
        .catch(error => {
            callback(error);
        });
};

module.exports = series(pick_options, question_user);
