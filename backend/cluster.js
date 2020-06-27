const cluster = require('cluster'),
    os        = require('os'),
    pid       = process.pid;

if(cluster.isMaster){
    const cpusCount = os.cpus().length;
    console.log("CPUs: ", cpusCount);
    console.log("Master started. Pid: ", pid);

    for(let i = 0; i < cpusCount - 1; i++){
        const worker = cluster.fork();
        console.log("Worker start. Pid: ", worker.process.pid);
        worker.on("exit", () => {
            console.log("Worker died. Pid: ", worker.process.pid);
            cluster.fork()
        })
    }

} else {
    require('./server');
}