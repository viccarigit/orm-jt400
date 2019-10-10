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
  }
}