///requirements
const gulp = require("gulp");
const clean = require("gulp-clean");
const browserSync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");

const sass = require("gulp-sass");
sass.compiler = require('node-sass');

const { src, dest, watch, parallel, series } = require("gulp");
let sourceFolder="./dist";
let devFolder="./src";

///paths

const path = {
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
    watchers: {
        scss: devFolder + "/scss/**/*.scss",
    },
    clean: sourceFolder,
};

///functions

//watcher (обе dev задачи из тз)
const watcher = () => {
    browserSync.init({
        server: {
            baseDir: "./",
        },
        port: 5000,
        notify: false,
    });

    watch(path.watchers.scss, style).on("change", browserSync.reload);
    watch(path.src.js, scripts).on("change", browserSync.reload);
    watch(path.src.img, img).on("change", browserSync.reload);
    watch("./*.html").on("change", browserSync.reload);
};

///clean
const cleanDist = () =>
    src(path.clean, { allowEmpty: true }, { read: false }).pipe(clean());

///все задачи связанные с стилями
const style = () =>
    src(path.src.scss)
        .pipe(concat("styles.min.css"))
        .pipe(sass().on("error", sass.logError))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 3 versions"],
            })
        )
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(dest(path.dist.css))
        .pipe(browserSync.stream());
///все задачи связанные с скриптом
const scripts = () =>
    src(["src/js/script.js"])
        .pipe(concat("scripts.min.js"))
        .pipe(uglify())
        .pipe(dest(path.dist.js))
        .pipe(browserSync.stream());

///все задачи связанные с картинками
const img = () =>
    src(path.src.img)
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3,
            })
        )
        .pipe(dest(path.dist.img))
        .pipe(browserSync.stream());

/// tasks
exports.cleanDist = cleanDist;
exports.style = style;
exports.scripts = scripts;
exports.img = img;
exports.watcher = watcher;
exports.build = series(
    cleanDist,
    parallel(style, scripts, img));
exports.dev = watcher;
exports.clean = cleanDist;