//simple local storage base on indexedDB

 export function savefile(file, name = file.name, dbname = 'files') {
    let request = window.indexedDB.open(dbname, 3);
    request.onerror = function (event) {
        // Handle errors.
        console.log('error when open db', dbname)
    };
    request.onupgradeneeded = function (event) {
        var db = event.target.result;
        db.createObjectStore('epubs');

        console.log('fileapi:upgraded')
    };

    request.onsuccess = function (event) {
        var db = request.result;
        var transaction = db.transaction(['epubs'], 'readwrite');
        var objectStore = transaction.objectStore('epubs');

        // add a new data to developers object store
        objectStore.add(file, name);
        db
            .transaction('epubs')
            .objectStore('epubs')
            .get(name)
            .onsuccess = function (event) {
                console.log('save file succesed')
                console.log(event.target.result);
            };
    }
}

export function getfile(name, dbname = 'files') {
    let request = window.indexedDB.open(dbname, 3);
    request.onerror = function (event) {
        // Handle errors.
        console.log('error when open db', dbname)
    };
    return new Promise(resolve=>{
        request.onsuccess = function (event) {
        var db = request.result;

        // add a new data to developers object store
        db
            .transaction('epubs')
            .objectStore('epubs')
            .get(name)
            .onsuccess = function (event) {
                console.log('got the file:', event.target.result);
                resolve(event.target.result);
            };

    };
    });
    
}

export function getAllFiles(onsuccess,dbname = 'files') {
    let request = window.indexedDB.open(dbname, 3);
    request.onerror = function (event) {
        // Handle errors.
        console.log('error when open db', dbname);
    };

    request.onupgradeneeded = function (event) {
        var db = event.target.result;
        db.createObjectStore('epubs');

        console.log('fileapi:upgraded')
    };

    request.onsuccess = function (event) {
        var db = request.result;
        var transaction = db.transaction(['epubs'], 'readwrite');
        var objectStore = transaction.objectStore('epubs');

        let keys;
        let getAllKeysReq = objectStore.getAll();
        getAllKeysReq.onsuccess = onsuccess;
        return keys;
    }
}

export function rmFiles(names = [], dbname = 'files') {
    let request = window.indexedDB.open(dbname, 3);
    request.onerror = function (event) {
        // Handle errors.
        console.log('error when open db', dbname)
    };


    request.onsuccess = function (event) {
        var db = request.result;
        var transaction = db.transaction(['epubs'], 'readwrite');
        var objectStore = transaction.objectStore('epubs');

        names.map((name) => {
            objectStore.delete(name);
            return 0;
        })
    }
}
