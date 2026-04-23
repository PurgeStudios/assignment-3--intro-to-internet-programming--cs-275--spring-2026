const { src, dest, series, watch } = require(`gulp`),
    htmlCompressor = require(`gulp-htmlmin`),
    cssLinter = require(`gulp-stylelint`),
    jsLinter = require(`gulp-eslint`),
    babel = require(`gulp-babel`),
    jsCompressor = require(`gulp-uglify`),
    cssCompressor = require(`gulp-clean-css`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;


let copyHtmlToDev = () => {
    return src(`./index.html`)
        .pipe(dest(`dev/`));
};

//develpment tasks
let lintCSS = () => {
    return src(`./styles/main.css`)
        .pipe(cssLinter({
            failAfterError: true,
            reporters: [
                {formatter: `verbose`, console: true}
            ]
        }))
        .pipe(dest(`dev/styles`));
};
let lintJS = () => {
    return src(`./scripts/main.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.format())
        .pipe(jsLinter.failAfterError())
        .pipe(dest(`dev/scripts`));
};

let transpileJSForDev = () => {
    return src(`dev/scripts/*js`)
        .pipe(babel())
        .pipe(dest(`dev/scripts`));
};

let browserChoice = `default`;
let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 1000,
        browser: browserChoice,
        server: {
            baseDir: [`dev`]
        }
    });

    watch(`./scripts/*.js`, series(lintJS, transpileJSForDev)).on(`change`, reload);
    watch(`./styles/*.css`, series(lintCSS)).on(`change`, reload);
    watch(`./*.html`, series(copyHtmlToDev)).on(`change`, reload);
};

//production tasks
let compressHTML = () => {
    return src(`dev/*.html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod/`));
};
let compressJS = () => {
    return src(`dev/scripts/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/scripts`));
};

let transpileJSForProd = () => {
    return src(`dev/scripts/*.js`)
        .pipe(babel())
        .pipe(dest(`prod/scripts`));
};

let compressCSS = () => {
    return src(`dev/styles/*.css`)
        .pipe(cssCompressor())
        .pipe(dest(`prod/styles`));
};

exports.default = series(
    copyHtmlToDev,
    lintCSS,
    lintJS,
    transpileJSForDev,
    serve
);

exports.build = series(
    transpileJSForProd,
    compressHTML,
    compressJS,
    compressCSS
);
