const crudSupport = require('./src/api/CRUDSupport');

function logger(message){
    console.log(message);
}

function mappedSchema(){

    const loja = {
        __entity: 'store',
        __schema: 'development',
        id: {fieldName: 'store_id', isId: true},
        description: {fieldName: 'store_description'}
    };

    return loja;
};

async function findById(mappedSchema){
    return await crudSupport.findById(mappedSchema);
}

logger('running tests...');

var store = mappedSchema();
store.id.value = 100;

findById(store).then(data =>{
    console.log(data);
});

