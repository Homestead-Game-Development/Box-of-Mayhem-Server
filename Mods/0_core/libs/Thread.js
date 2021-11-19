const {
    Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

if (isMainThread) {
    module.exports = 
        function run(script, data) {
            return new Promise((resolve, reject) => {
                const worker = new Worker(__filename, {
                    workerData: {"scr":script.toString(),"data":(data || {})}
                });
                worker.on('message', resolve);
                worker.on('error', reject);
                worker.on('exit', (code) => {
                    if (code !== 0)
                        reject(new Error(`Worker stopped with exit code ${code}`));
                });
            });
        }
} else {
    //const { parse } = require('some-js-parsing-library');
    const script = workerData.scr;
    try{
        parentPort.postMessage(new Function('return ' + script)()(workerData.data));
        return;
    }catch(e) {
        console.error(e);
    }
    parentPort.postMessage(null);
}
