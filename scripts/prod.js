var spawn = require('child_process').spawn;
process.env.NODE_ENV = 'production';

var children  = [
    spawn('npm', ['run', 'build'], { stdio: 'inherit' }),
    spawn('npm', ['run', 'build:preact'], { stdio: 'inherit' }),
    spawn('npm', ['run', 'build:react-lite'], { stdio: 'inherit' }),
    spawn('npm', ['run', 'build:source'], { stdio: 'inherit' }),
];

process.on('exit', function() {
    children.forEach(function(child) {
        child.kill();
    });
});