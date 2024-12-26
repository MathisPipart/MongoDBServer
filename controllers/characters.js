const Model = require('../models/characters');

function insert(body) {
    return new Promise((resolve, reject) => {
        const mongoObj = new Model(body);
        mongoObj.save()
            .then(results => {
                const resultWithVirtuals = results.toObject({ virtuals: true });
                resolve(resultWithVirtuals);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports.insert = insert;



function query(body) {
    return new Promise((resolve, reject) => {
        Model.find(body)
            .then(results => {
                const filteredResults = results.map(character => {
                    const obj = character.toObject({ virtuals: true });
                    return {
                        id: obj._id,
                        first_name: obj.first_name,
                        family_name: obj.family_name,
                        dob: obj.dob,
                        age: obj.age
                    };
                });
                resolve(filteredResults);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports.query = query;


