'use strcict'
const SERVER_PROXY_HOST = 'http://127.0.0.1:8080'
// 
const SOURCE_FOLDER_ASSETS = './src/' // 静态资源源文件夹
const SOURCE_FOLDER_JS = './src/js/' // js源文件夹
const SOURCE_FOLDER_LESS = './src/less/' // less源文件夹
const SOURCE_FOLDER_FONTS = './src/fonts/' // 字体源文件夹
const SOURCE_FOLDER_IMAGES = './src/images/' // 图片源文件夹
const SOURCE_FOLDER_VIEWS = './src/views/' // 模板源文件夹
const SOURCE_FOLDER_STATIC = './src/static/' // static源文件夹
 
const DIST_FOLDER_JS = './public/assets/js/' // js编译输出文件夹 
const DIST_FOLDER_LESS = './public/assets/css/' // less编译输出文件夹 
const DIST_FOLDER_FONTS = './public/assets/fonts/' // 字体输出文件夹 
const DIST_FOLDER_IMAGES = './public/assets/images/' // 图片译输出文件夹 
const DIST_FOLDER_ASSETS = './public/assets/' // 静态资源编译输出文件夹 
const DIST_FOLDER_VIEWS = './app/views/' // 静态资源编译输出文件夹 

// 编译的文件夹
const DIST_FOLDER_DEL_FILES = [
  DIST_FOLDER_ASSETS + '*',
  DIST_FOLDER_VIEWS + '/*'
]



const gulp = require('gulp')
const gulpLoadPlugins = require('gulp-load-plugins')
const autoprefixer = require('autoprefixer')
const browserSync = require('browser-sync').create()
const del = require('del')
const runSequence = require('run-sequence')
const browserify = require('browserify')
// const watchify = require('watchify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const glob = require('glob')
const es = require('event-stream')

const fs = require('fs')

// 加载插件
const $ = gulpLoadPlugins()

const reload = browserSync.reload

// 处理图片
gulp.task('image', () => {
  let image = gulp.src(SOURCE_FOLDER_IMAGES + '**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(DIST_FOLDER_IMAGES))
    .pipe($.size({ title: '图片处理' }))

  return image
})

// 复制文件
gulp.task('copy', () => {
  let copy = gulp.src([
    SOURCE_FOLDER_STATIC + '**/*',
    SOURCE_FOLDER_VIEWS + '/**/*.html',
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/jquery/dist/jquery.min.map',
    './node_modules/font-awesome/css/*',
    './node_modules/font-awesome/fonts/*',
    './node_modules/webuploader/dist/webuploader.html5only.min.js',
  ]).pipe(gulp.dest((file) => {
    if (file.path.indexOf('static') > -1) {
      return DIST_FOLDER_ASSETS
    }
    if (file.path.indexOf('jquery.min') > -1) {
      return DIST_FOLDER_JS
    }
    if (file.path.indexOf('webuploader') > -1) {
      return DIST_FOLDER_JS
    }
    if (file.path.indexOf('views') > -1) {
      return DIST_FOLDER_VIEWS
    }
    if (file.path.indexOf('css') > -1) {
      return DIST_FOLDER_LESS
    }
    if (file.path.indexOf('fonts') > -1) {
      return DIST_FOLDER_FONTS
    }
    return DIST_FOLDER_ASSETS
  })).pipe(
    $.size({
      title: '复制文件'
    })
  )

  return copy
})

// 处理模板
gulp.task('ejs', () => {

  let dir = './src/views'
  let fileArr = []
  // let fileNameArr = []
  let checkDir = (dir) => {
    let currentDir = dir
    let files = fs.readdirSync(currentDir)

    files.forEach(file => {
      let currentFile = currentDir + '/' + file
      let stat = fs.lstatSync(currentFile)
      if (stat.isDirectory()) {
        checkDir(currentFile)
      } else {
        fileArr.push(currentFile)
      }
    })
  }

  checkDir(dir)

  fileArr.forEach(file => {
    let jsonName = file.replace('./src/views/', '').replace('.html', '')
    let jsonFile = './src/json/' + jsonName + '.json'
    let jsonData = {}
    if (fs.existsSync(jsonFile)) {
      jsonData = JSON.parse(fs.readFileSync(jsonFile).toString())
    }

    gulp.src(file).pipe(
      $.ejs(jsonData)
    ).pipe(
      gulp.dest('./public/demo')
    )
  })

  console.log('处理ejs模板完毕')
})

// 处理less
gulp.task('less', () => {
  let less = gulp.src([
    SOURCE_FOLDER_LESS + '**/*.less'
  ]).pipe(
    // 输出错误
    $.plumber({
      errorHandler: (err) => {
        console.log(err)
        this.emit('end')
      }
    })
    ).pipe(
    // css前缀预处理
    $.postcss([
      autoprefixer({
        browsers: ['last 2 versions']
      })
    ])
    ).pipe(
      $.less()
    ).pipe(
      gulp.dest(DIST_FOLDER_LESS)
    ).pipe(
      $.minifyCss({ compatibility: 'ie7' })
    ).pipe(
      $.rename({
        suffix: '.min'
      })
    ).pipe(
      gulp.dest(DIST_FOLDER_LESS)
    ).pipe(
      $.size({
        title: '处理less文件'
      })
    )

  return less
})

// 处理js
gulp.task('js', (done) => {
  glob(SOURCE_FOLDER_JS + '*.js', function (err, files) {
    if (err) {
      done(err)
    }
    // console.log('' , files)
    let tasks = files.map((file) => {
      console.log('处理js文件:' , file);
      let outName = file.replace(SOURCE_FOLDER_JS , '')
      return browserify({
        entries: [file]
      }).transform(
        'babelify', {
          'comments': false
        }).bundle().pipe(
          source(outName)
        ).pipe(
          buffer()
        ).pipe(
          gulp.dest(DIST_FOLDER_JS)
        )
    })

    es.merge(tasks).on('end', done)
  })
})

// 删除上次编译的文件
gulp.task('del', () => {
  return del( DIST_FOLDER_DEL_FILES, { dot: true })
})

// 监听
gulp.task('watch', () => {
  gulp.watch([SOURCE_FOLDER_VIEWS + '**/**/*'], ['copy', reload])
  gulp.watch([SOURCE_FOLDER_LESS + '**/**/*'], ['less', reload])
  gulp.watch([SOURCE_FOLDER_JS + '/**/**/*'], ['js', reload])
  gulp.watch([SOURCE_FOLDER_IMAGES + '/**/**/*'], ['image', reload])
})

gulp.task('start', ['default'], () => {

  browserSync.init({
    notify: false,
    logPrefix: 'ASK',
    // server: './public'
    proxy: SERVER_PROXY_HOST
  })

  // gulp.watch(['./src/**/*'] , reload)
})

gulp.task('default', () => {
  runSequence('del', ['copy', 'less', 'js' , 'image'], 'watch')
})





