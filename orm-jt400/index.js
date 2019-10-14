const crudSupport = require('./src/api/CRUDSupport');

function logger(message) {
    console.log(message);
}

function mappedSchema() {

    const loja = {
        __entity: 'co000t',
        __schema: 'prod',
        id: { fieldName: 'cd_fl', isId: true },
        description: { fieldName: 'no_fl' },
        alias: { fieldName: 'mn_fl' },
        type: { fieldName: 'tp_fl' },
        shippAddress: { fieldName: 'ds_end' }
    };

    return loja;
};

async function findById(mappedSchema) {
    return await crudSupport.findById(mappedSchema);
}

logger('running tests...');

var store = mappedSchema();

store.status = crudSupport.innerJoin({
    __entity: 'co001t',
    __referencedBy: { origem: 'co000t', fromColumn: 'cd_sts', toColumn: 'cd_sts' },
    id: { fieldName: 'cd' }
}
);

store.status = crudSupport.leftJoin({
    __entity: 'co010t',
    __referencedBy: [
        { target: 'co000t', fromColumn: 'cd_user', toColumn: 'cd_user' },
        { target: 'co000t', fromColumn: 'cd_user', toColumn: 'cd_user' }
    ]
});


store.id.value = 100;

findById(store).then(data => {
    console.log(JSON.stringify(data));
});

