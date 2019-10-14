/**
 * makes basic CREATE, READ, UPDATE, DELETE (CRUD) operations on database 
 * @author Eduardo Paixao Viccari
 */

const _ = require('lodash');
const connectionBuilder = require('./ConnectionBuilder');

const statementBuilder = require('./StatementBuilder');

module.exports = {

  /**
   * find a record by your mapped key
   * @param {*} mappedSchema 
   */
  async findById(mappedSchema) {

    try {

      const statement = statementBuilder.buildSelectByIdScript(mappedSchema);

      const pool = connectionBuilder.build({ user: null, host: null, password: null });

      const results = await pool.query(statement.sqlStatement, statement.bindVariables);
      return results;
    }
    catch (error) {
      console.log(error);
      throw error;
    }

  },

  /**
   * makes the left join relationship 
   * @param {*} anotherSchema 
   */
  leftJoin(anotherSchema) {

    try {

      this.joinValidate(anotherSchema);
      anotherSchema.leftJoin = true;

      return anotherSchema;

    } catch (error) {
      throw error;
    }

  },

  /**
   * makes the right join relationship 
   * @param {*} anotherSchema 
   */
  innerJoin(anotherSchema) {

    try {

      this.joinValidate(anotherSchema);
      anotherSchema.innerJoin = true;

      return anotherSchema;

    } catch (error) {
      throw error;
    }

  },

  /**
   * basic validations to prevent api errors
   * @param {*} anotherSchema 
   */
  joinValidate(anotherSchema) {

    if (anotherSchema.__entity === undefined || anotherSchema.__entity === null || anotherSchema.__entity === '') {
      throw Error(` the __entity field must be declared`);
    }

    if (anotherSchema.__referencedBy === undefined) {
      throw Error(` the __referenced object must be declared`);
    }

    if (((typeof anotherSchema.__referencedBy) === Array) && (anotherSchema.__referencedBy.length === 0)) {
      throw Error(` There's no relationship(s) defined on __referencedBy object`);
    }

  }

}