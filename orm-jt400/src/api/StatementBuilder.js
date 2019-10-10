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


    try {

      let sql = ' ';

      var attributes = Object.keys(mappedSchema).filter((element)=>{
        return (element !== '__entity' && element !== '__schema');
      });

      var attributeValues = [];

      for (let i = 0; i < 1; i++) { // make de first line of select statement
        let objectAux = mappedSchema[attributes[0]];
        attributeValues.push(objectAux); // store the attribute values to format where clause

       sql += _.join(['select', objectAux.fieldName], ' ');
       sql += _.join([' ', `as "${attributes[0]}"`], ' ');
      }

      if (attributes.length > 1) { //format additional columns, with all attributes from mappedSchema object
        for (let i = 1; i < attributes.length; i++) {
          let objectAux = mappedSchema[attributes[i]];
          attributeValues.push(objectAux); // store the attribute values to format where clause

          sql += _.join(['\n     ,', objectAux.fieldName], ' ');
          sql += _.join([' ', ` as "${attributes[i]}"`], ' ');
        }
      }

      sql += _.join([' ', '\n ', `from ${mappedSchema.__schema ? mappedSchema.__schema + '.' : ''}${mappedSchema.__entity}`], ' ');
      sql += _.join([' ', '\n', 'where 1 = 1'],' ');

      /**
       * format where clause using ID defined on mappedSchema
       */
      const primaryKeys = _.filter(attributeValues, (attributeValue) => {
        return attributeValue.isId;
      });

      var variables = [];

      for(var i = 0; i < primaryKeys.length; i++ ) { 
        sql += _.join([' ', '\n  and ', `${primaryKeys[i].fieldName} = ? `], ' ');
        variables.push(primaryKeys[i].value);
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


