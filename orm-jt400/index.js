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

async function findById(mappedSchema){
    return await crudSupport.findById(mappedSchema);
}

logger('iniciando teste...');

var loja = mappedSchema();
loja.id.value = 100;

findById(loja).then(data =>{
    console.log(data);
});

