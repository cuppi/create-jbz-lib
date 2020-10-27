#!/usr/bin/env node
const {series} = require('../tool/hook');
const parse_command = require('../tasks/parse_command');
const dowload_template = require('../tasks/dowload_template');
const generate_project = require('../tasks/generate_project');



series(parse_command, dowload_template, generate_project)((error, res) => {
    console.log('结束')
});




