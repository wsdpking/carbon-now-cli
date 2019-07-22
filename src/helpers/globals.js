// Native
const {homedir} = require('os');

const HOMEDIR = homedir();
const CONFIG_FILE = '.carbon-now.json';
const CONFIG_DUMMY = '.carbon-now-dummy.json';
const FULL_CONFIG_PATH = `${HOMEDIR}/${CONFIG_FILE}`;
const FULL_DUMMY_CONFIG_PATH = `${HOMEDIR}/${CONFIG_DUMMY}`;
const CARBON_URL = 'http://localhost:3009/';
const LATEST_PRESET = 'latest-preset';

module.exports = {
	HOMEDIR,
	CONFIG_FILE,
	FULL_CONFIG_PATH,
	FULL_DUMMY_CONFIG_PATH,
	CARBON_URL,
	LATEST_PRESET
};
