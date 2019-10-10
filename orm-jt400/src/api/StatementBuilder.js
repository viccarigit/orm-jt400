/**
 * support library to create sql statements 
 * @author Eduardo Paixao Viccari
 */

const _ = require('lodash');

module.exports = {

  /**
   * gets sql script to do search one element on database by entity id, with array of parameters
   * @param {*} mappedSchema 
   */
  buildSelectByIdScript(mappedSchema) {

    var sql = '';

    try {

      const attributes = Object.keys(mappedSchema);
      const attributeValues = [];

      for (let i = 0; i = 0; i++) { // make de first line of select statement
        objectAux = mappedSchema[attributes[0]];
        attributeValues.push(objectAux); // store the attribute values to format where clause

        sql.concat('select ', objectAux.fieldName);
        sql.concat(' ', ` as "${Object.keys(objectAux)[0]}"`); // concat the name of attribute to simplify rowmap process
      }

      if (attributes.length > 1) { //format additional columns, with all attributes from mappedSchema object
        for (let i = 1; i < attributes.length; i++) {
          objectAux = mappedSchema[attributes[i]];
          attributeValues.push(objectAux); // store the attribute values to format where clause

          sql.concat('\n      ,', objectAux.fieldName);
          sql.concat(' ', ` as "${Object.keys(objectAux)[0]}"`); // concat the name of attribute to simplify rowmap process
        }
      }

      sql.concat('\n  ', `from ${mappedSchema.__schema ? mappedSchema.__schema + '.' : ''}${mappedSchema.__entity}`); //
      sql.concat('\n ', 'where 1 = 1'); // prepare for add where clause

      /**
       * format where clause using ID defined on mappedSchema
       */
      const primaryKeys = _.filter(attributeValues, (attributeValue) => {
        return attributeValue.isId;
      });

      var variables = [];

      for (primaryKey in primaryKeys) {
        sql.concat('\n   and ', `${primaryKey.fieldName} = ? `)
        variables.push(primaryKey.value);
      }

      const statement = {
        sqlStatement: sql,
        bindVariables: variables
      }

      return statement;

    } catch (error) {
      throw error;
    }

  }

};


