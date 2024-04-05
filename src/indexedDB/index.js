export const openDatabase = () => {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open('chatBotDatabase', 1);
        let db;

        request.onerror = function (event) {
            console.error("Database error: ", event.target.error);
            reject(event.target.error);
        };

        request.onsuccess = function (event) {
            db = event.target.result;
            resolve(db);
        };

        request.onupgradeneeded = function (event) {
            db = event.target.result;
            db.createObjectStore('nodesTable', { keyPath: 'id' });
            db.createObjectStore('edgesTable', { keyPath: 'id' });
            resolve(db);
        };
    });
};

//nodesTable
export const addDataToNodesTable = (db, data) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['nodesTable'], 'readwrite');
        const store = transaction.objectStore('nodesTable');
        const request = store.put(data);
        request.onerror = function (event) {
            console.error("Error adding data: ", event.target.error);
            reject(event.target.error);
        };
        request.onsuccess = function (event) {
            console.log("Data added successfully!");
            resolve(true);
        };
    });
};

export const getDataFromNodesTable = (db) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['nodesTable'], 'readonly');
        const store = transaction.objectStore('nodesTable');
        const request = store.getAll();

        request.onerror = function (event) {
            console.error("Error fetching data: ", event.target.error);
            reject(event.target.error);
        };

        request.onsuccess = function (event) {
            const data = event.target.result;
            // console.log("Data retrieved: ", data);
            resolve(data);
        };
    });
};

//edgestable
export const addDataToEdgesTable = (db, data) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['edgesTable'], 'readwrite');
        const store = transaction.objectStore('edgesTable');
        const request = store.put(data);
        request.onerror = function (event) {
            console.error("Error adding data: ", event.target.error);
            reject(event.target.error);
        };
        request.onsuccess = function (event) {
            console.log("Data added successfully!");
            resolve(true);
        };
    });
};

export const getDataFromEdgesTable = (db) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['edgesTable'], 'readonly');
        const store = transaction.objectStore('edgesTable');
        const request = store.getAll();

        request.onerror = function (event) {
            console.error("Error fetching data: ", event.target.error);
            reject(event.target.error);
        };

        request.onsuccess = function (event) {
            const data = event.target.result;
            // console.log("Data retrieved: ", data);
            resolve(data);
        };
    });
};