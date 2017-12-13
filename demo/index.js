const py_logging = require('../dist/logging.js');
const NiceConsoleHandler = require('../dist/niceconsolehandler.js').NiceConsoleHandler;
const NiceConsoleFormatter = require('../dist/niceconsoleformatter.js').NiceConsoleFormatter;
const NameCutterFilter = require('../dist/namecutterfilter.js').NameCutterFilter;
const NameShortenerFilter = require('../dist/nameshortenerfilter.js').NameShortenerFilter;
const NameRenamerFilter = require('../dist/namerenamerfilter.js').NameRenamerFilter;

function App(config) {
	this.logger = py_logging.getLogger('App');
	this.logger.info('Created with config', null, { data: config });
	this.config = config;
	this.module = new Module();
}

App.prototype.run = function (mode, timeout) {
	this.logger.debug('#run', null, { data: [mode, timeout] });
	try {
		this.module.start(timeout);
	}
	catch (error) {
		this.logger.critical('Failed to start', error);
	}
};

function Module() {
	this.logger = py_logging.getLogger('App.Module');
	this.logger.info('Created');
}

Module.prototype.start = function (timeout) {
	this.logger.debug('#start', null, { data: [timeout] });
	
	callSomeFunction();
};

// setup
var level = py_logging.DEBUG;
var formatter = new NiceConsoleFormatter(
	'%(message)-s%(data)-o'
);
var handler = new NiceConsoleHandler();
var filters = [
	//new NameCutterFilter('src.')
	//new NameRenamerFilter(/\./g, '/')
];
var rootLogger = py_logging.getLogger();

rootLogger.setLevel(level);
filters.forEach(function (filter) {
	handler.addFilter(filter);
	rootLogger.addFilter(filter);
});
handler.setFormatter(formatter);
rootLogger.addHandler(handler);

// run
var logger = py_logging.getLogger();
logger.info('Ready to start');
logger.info('Running...');

var app = new App({ id: 'da20171' });
app.run('prod', 2000);
