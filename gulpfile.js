const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanBuild = require('gulp-clean-css');
const sass = require("gulp-sass");
const concat = require('concat');
const imagemin = require('imagemin');
const watcher = require('watcher');
const autoprefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');
browserSync = require("browser-sync").create();

//paths here

const paths = {
    html: "./index.html",
    src: {
      scss: "./src/scss/**/*.scss",
      js: "./src/js/*.js",
      img: "./src/img/*",
    },
    dist: {
      css: "./dist/css/",
      js: "./dist/js/",
      img: "./dist/img/",
      self: "./dist/",
    },
  };

//functions here

const cleanBuild = () => {
  gulp.src(paths.dist.self, { allowEmpty: true }).pipe(clean());
}

const buildJS = () => {
    gulp
    .src(paths.src.js)
    .pipe(concat("main.js"))
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browserSync.stream());
};

const buildCSS = () => {
    gulp
    .src(paths.src.scss)
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("main.css"))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(browserSync.stream());
};

 const autoprefixer = () => {
    gulp
    .src(paths.src.scss)
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(gulp.dest('dist'))
 }

const imagemin = () => {
    gulp
    .src(paths.src.img)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist.img))
};


///dev tasks

///Запуск сервера и последующее отслеживание изменений *.js и *.scss файлов в папке src;

    const watcher = () => {
        browserSync.init({
        server: {
            baseDir: "./",
        },
    });
///При изменении - пересборка и копирование объединенных и минифицированных файлов styles.min.css и scripts.min.js в папку dist, перезагрузка вашей html-страницы.
      
      gulp.watch(paths.src.scss, buildCSS).on("change", browserSync.reload);
      gulp.watch(paths.src.js, buildJS).on("change", browserSync.reload);
      gulp.watch(paths.src.img, buildIMG).on("change", browserSync.reload);
      gulp.watch(paths.html, build).on("change", browserSync.reload);
      };


//tasks here: (задания для dev и build): (ШАБЛОН)

gulp.task("cleanBuild", cleanBuild);
gulp.task("buildCSS", buildCSS);
gulp.task("buildJS", buildJs);
gulp.task("imagemin", imagemin);
gulp.task("browser-sync", browserSync);
gulp.task("autoprefixer", autoprefixer);
gulp.task("concat", concat);
gulp.task("watcher", watcher);

gulp.task("default", gulp.series(
    cleanBuild, 
    buildCSS, 
    buildJs,
    imagemin,
    browserSync,
    watcher,
    autoprefixer,
    concat
));
