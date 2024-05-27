onmessage = async (event) => {
    try {
        const data = JSON.parse(event.data);
        const { db_version, database_name, objectstores, } = Array.isArray(data) ? data[0] : data;
        const request = indexedDB.open(database_name, db_version);
        request.onsuccess = (event) => {
            const db = event.target.result;
            const _transaction = db.transaction(objectstores, "readwrite");
            Array.isArray(data)
                ? data.forEach((data_each) => {
                    fetch_db(data_each);
                })
                : fetch_db(data);
            _transaction.oncomplete = function () {
                // console.log("All transaction finished");
                db.close();
                close();
            };
            _transaction.onerror = function (error) {
                console.error(error);
                db.close();
                close();
            };
            function fetch_db(data) {
                const { action, objectstore_name, key, value, } = data;
                const objectStore = _transaction.objectStore(objectstore_name);
                const request = [
                    () => objectStore.get(key),
                    () => objectStore.put(value, key),
                    () => objectStore.count(),
                    () => objectStore.getAll(),
                    () => objectStore.delete(key),
                ][action]();
                request.onsuccess = function () {
                    // const action_msg = [
                    //   "Reading",
                    //   "Writing",
                    //   "Counting",
                    //   "Reading all in",
                    //   "Deleting",
                    // ][action];
                    // console.log(`${action_msg} ${objectstore_name} successfully`);
                    const result = request.result;
                    [0, 2, 3].includes(action) &&
                        postMessage(action === 2 ? result : JSON.stringify(result));
                };
                request.onerror = (error) => {
                    console.error(error);
                };
            }
        };
        request.onerror = function (error) {
            // console.log(`${action_msg} DB failed`);
            console.error(error);
            close();
        };
        request.onupgradeneeded = (event) => {
            objectstores.forEach((objectstore_name) => {
                const db = event.target.result;
                !db.objectStoreNames.contains(objectstore_name) &&
                    db.createObjectStore(objectstore_name);
            });
        };
    }
    catch (err) {
        console.error(err);
        close();
    }
};
