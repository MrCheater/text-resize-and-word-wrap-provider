var spawn = require('child_process').spawn;

var children  = [
    spawn('npm', ['run', 'start'], { stdio: 'inherit' }),
    spawn('npm', ['run', 'build'], { stdio: 'inherit' }),
    spawn('npm', ['run', 'build:preact'], { stdio: 'inherit' }),
    spawn('npm', ['run', 'build:react-lite'], { stdio: 'inherit' }),
];

process.on('exit', function() {
    children.forEach(function(child) {
        child.kill();
    });
});