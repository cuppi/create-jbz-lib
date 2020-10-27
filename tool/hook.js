
const sync = (fn) => {
    const wrap = (...args) => {
        fn(...args);
    };
    wrap.hookType = 'sync';
    return wrap;
};

const async = (fn) => {
    const wrap = (...args) => {
        fn(...args)
    };
    wrap.hookType = 'async';
    return wrap;
};


const series = (...tasks) => {
    const seriesHook = (callback) => {
        let next = Promise.resolve(process.argv);
        for (let i = 0, l = tasks.length; i < l; i++){
            const task = tasks[i];
            ((task) => {
                next = next.then(pre => {
                    if (task.isSeries){
                        return new Promise((resolve, reject) => {
                            task((error, res) => {
                                if (error) reject(error);
                                else resolve(res);
                            })
                        })
                    }
                    let hookType = task.hookType;
                    if (hookType === undefined){
                        if (task.length === 1) hookType = 'sync';
                        if (task.length === 2) hookType = 'async';
                    }
                    if (hookType === 'sync'){
                        const res = task(pre);
                        if (res === false){
                            const error = new Error('task end');
                            error.isUserStop = true;
                            throw error
                        }
                        return res
                    }
                    if (hookType === 'async'){
                        return new Promise((resolve, reject) => {
                            task(pre, (error, res) => {
                                if (error)
                                    reject(error);
                                else
                                    resolve(res);
                            })
                        })
                    }
                    return Promise.reject(new Error('不支持的任务钩子'))
                });
            })(task)
        }
        if (callback){
            next.then(data => {
                callback(null, data);
                return data;
            })
        }
        next.catch(error => {
            if (callback) callback(error);
            if (!error.isUserStop) {
                // or throw error
                return Promise.reject(error);
            }
        });
        return next;
    };
    seriesHook.isSeries = true;
    return seriesHook;
};


module.exports = {
    series,
    sync,
    async,
};
