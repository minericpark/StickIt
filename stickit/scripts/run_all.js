const concurrently = require('concurrently');

const runBackend = {
    command: 'npm run backend-start',
    name: 'backend',
    prefixColor: 'white',
};
const runJS = {
    command: 'npm run start-js',
    name: 'frontend',
    prefixColor: 'grey',
};

concurrently([runBackend, runJS], {
    prefix: 'name',
    killOthers: ['failure'],
}).then(
    function onSuccess(exitInfo) {
        process.exit();
    },
    function onFailure(exitInfo) {
        process.exit(-1);
    }
);
