var gulp = require('gulp')
var plumber = require('gulp-plumber')
var data = require('gulp-data')
var fs = require('fs')
var fm = require('front-matter')

gulp.task('data', function() {
	stream = gulp.src(['./static/data/**/*.md'])
	.pipe(plumber({
		errorHandler: function(error) {
			console.log(error)
		}
	}))
	.pipe(data(function(file) {
		var fmData = fm(fs.readFileSync(file.path, 'utf8'))
		var jsonObject = {attributes: fmData.attributes, body: fmData.body}
		file.contents = new Buffer(JSON.stringify(jsonObject), 'utf8')
		return file.path = file.path.replace('.md', '.json')
	}))
	.pipe(gulp.dest('./static/data/'))
});


gulp.task('watch', function() {
	gulp.watch( './static/data/**/*.md', ['data'])
})

gulp.task('default', ['data','watch'])
