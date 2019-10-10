const crudSupport = require('./src/api/CRUDSupport');

function logger(message){
    console.log(message);
}

function mappedSchema(){

    const loja = {
        __entity: 'CO000T',
        __schema: 'PROD',
        id: {fieldName: 'CD_FL', isId: true},
        descricao: {fieldName: 'NO_FL'}
    };

    return loja;
};

function findById(mappedSchema){
    return crudSupport.findById(mappedSchema);
}

logger('iniciando teste...');

var loja = mappedSchema();
loja.id.value = 100;
loja.descricao.value = 'IBI';

const data = findById(loja);

console.log(data);