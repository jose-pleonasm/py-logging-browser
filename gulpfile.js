const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const template = require('gulp-template');
const runSequence = require('run-sequence');
const uglify = require('gulp-uglify');

const libFiles = [
	'./lib/polyfills/*.js',
	'./lib/internal/*.js',
	'./lib/core/strftime.js',
	'./lib/core/Filterer.js',
	'./lib/core/Logger.js',
	'./lib/core/Formatter.js',
	'./lib/core/Filter.js',
	'./lib/core/Handler.js',
	'./lib/core/logging.js',
];
const libFileTemplate = './templates/logging.js';
const libFilename = 'logging.js';
const addonFiles = [
	'./lib/addons/NiceConsoleFormatter.js',
	'./lib/addons/NameRenamerFilter.js',
	'./lib/addons/NameCutterFilter.js',
	'./lib/addons/NameShortenerFilter.js',
	'./lib/addons/ConsoleHandler.js',
	'./lib/addons/NiceConsoleHandler.js',
];
const addonFileTemplate = './templates/addon.js';
const addonFilenames = addonFiles.map((addonPath) => {
	return path.basename(addonPath).toLowerCase();
});
const destFolder = 'dist';

async function readFile(path, options) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, options, (error, data) => {
			if (error) {
				return reject(error);
			}

			resolve(data);
		});
	});
}


gulp.task('prepare:core', () => {
	return gulp.src(libFiles)
		.pipe(concat(libFilename))
		.pipe(gulp.dest(destFolder));
});

gulp.task('arrange:core', async () => {
	const content = await readFile(`${destFolder}/${libFilename}`);

	return gulp.src(libFileTemplate)
		.pipe(template({ content }))
		.pipe(rename(libFilename))
		.pipe(gulp.dest(destFolder));
});

gulp.task('prepare:addons', () => {
	const tasks = addonFiles.map((addonFile, idx) => {
		const stream = gulp.src(addonFile)
			.pipe(rename(addonFilenames[idx]))
			.pipe(gulp.dest(destFolder));

		return new Promise((resolve, reject) => {
			stream.on('finish', resolve);
		});
	});

	return Promise.all(tasks);
});

gulp.task('arrange:addons', async () => {
	const tasks = addonFilenames.map(async (addonFilename) => {
		const content = await readFile(`${destFolder}/${addonFilename}`);

		const stream = gulp.src(addonFileTemplate)
			.pipe(template({ content }))
			.pipe(rename(addonFilename))
			.pipe(gulp.dest(destFolder));

		return new Promise((resolve, reject) => {
			stream.on('finish', resolve);
		});
	});

	return Promise.all(tasks);
});

gulp.task('uglify', function () {
	return gulp.src(`${destFolder}/*.js`)
		.pipe(uglify())
		.pipe(gulp.dest(destFolder));
});

gulp.task('build:core', (cb) => {
	runSequence('prepare:core', 'arrange:core', cb);
});

gulp.task('build:addons', (cb) => {
	runSequence('prepare:addons', 'arrange:addons', cb);
});

gulp.task('build', (cb) => {
	runSequence(['build:core', 'build:addons'], 'uglify', cb);
});
