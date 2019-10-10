/**
 * build a connection to IBM DB2 running on AS400 systems
 * @author Eduardo Paixao Viccari
 */

const db2AS400 = require('node-jt400');

module.exports = {

  build(params) {

    try {

/*      const config = {
        localUser: params.user ? params.user : process.env.DB2AS400_USER,
        localHost: params.host ? params.host : process.env.DB2AS400_HOST,
        localPasswd: params.password ? params.password : process.env.DB2AS400_PASSWD
      }*/

      const config = {
        user: 'br3pcg',
        host: '10.16.0.162',
        password: 'cea12345'
      }

      pool = db2AS400.pool(config);
      return pool;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}