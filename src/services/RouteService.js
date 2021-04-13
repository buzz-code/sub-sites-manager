import firebase from "../firebase";

const db = firebase.ref("/routes");

const getAll = () => {
    return db;
};

const create = (data) => {
    return db.push(data);
};

const update = (key, data) => {
    return db.child(key).update(data);
};

const remove = (key) => {
    return db.child(key).remove();
};

const removeAll = () => {
    return db.remove();
};

const service = {
    getAll,
    create,
    update,
    remove,
    removeAll,
};

export default service;
