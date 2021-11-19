const egg = require('egg');

// const workers = Number(require('os').cpus().length);

const workers = 1;
console.log('egg----->---',workers);

egg.startCluster({
   workers,
   baseDir:__dirname
});
