const crudSupport = require('./src/api/CRUDSupport');

function logger(message) {
    console.log(message);
}

function mappedSchema() {

    const loja = {
        __entity: 'store',
        __schema: 'prd',
        id: { fieldName: 'id', isId: true },
        description: { fieldName: 'desc' },
        alias: { fieldName: 'alias' },
        type: { fieldName: 'storeType' },
        shippAddress: { fieldName: 'address' }
    };

    return loja;
};

async function findById(mappedSchema) {
    return await crudSupport.findById(mappedSchema);
}

logger('running tests...');

var store = mappedSchema();

store.status = crudSupport.innerJoin({
    __entity: 'storeStatus',
    __referencedBy: { origem: 'store', fromColumn: 'statusId', toColumn: 'statusId' },
    id: { fieldName: 'cd' }
}
);

store.id.value = 100;

findById(store).then(data => {
    console.log(JSON.stringify(data));
});

