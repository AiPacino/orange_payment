/**
 * 数据库ORM
 * 文档地址：http://docs.sequelizejs.com/manual/installation/getting-started.html
 * 
 */


const Sequelize = require('sequelize')
const dbConfig = require('./../config/index').database

const sequelize = new Sequelize(dbConfig.dbname, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.type,

  pool: {
    max: dbConfig.maxLimit,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

})

let Model = {
  Se : Sequelize,
  DB: sequelize,
  OP: Sequelize.Op,
  FIELD_TYPE: {
    STRING: Sequelize.STRING,                      // VARCHAR(255)
    STRING_LONG: Sequelize.STRING(1024),              // VARCHAR(1234)

    STRING_LEN : (len) => {
      return Sequelize.STRING(len)
    },
    BINARY: Sequelize.STRING.BINARY,               // VARCHAR BINARY
    TEXT: Sequelize.TEXT,                        // TEXT
    TINYTEXT: Sequelize.TEXT('tiny'),                // TINYTEXT

    INTEGER: Sequelize.INTEGER,                    // INTEGER
    BIGINT: Sequelize.BIGINT,                    // BIGINT
    INT: Sequelize.BIGINT(11),                  // BIGINT(11)
    INT_LEN : (len) => {
      return 'INT('+len+')'
    },

    FLOAT: Sequelize.FLOAT,                       // FLOAT
    FLOAT11: Sequelize.FLOAT(11),              // FLOAT(11)
    // Sequelize.FLOAT(11, 12)               // FLOAT(11,12)

    // Sequelize.REAL                        // REAL        PostgreSQL only.
    // Sequelize.REAL(11)                    // REAL(11)    PostgreSQL only.
    // Sequelize.REAL(11, 12)                // REAL(11,12) PostgreSQL only.

    DOUBLE: Sequelize.DOUBLE,                   // DOUBLE
    DOUBLE11: Sequelize.DOUBLE(11),               // DOUBLE(11)
    // DOUBLESequelize.DOUBLE(11, 12)              // DOUBLE(11,12)

    DECIMAL: Sequelize.DECIMAL,             // DECIMAL
    DECIMAL2: Sequelize.DECIMAL(10, 2),          // DECIMAL(10,2)

    DATE: Sequelize.DATE,                    // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
    DATE6: Sequelize.DATE(6),                 // DATETIME(6) for mysql 5.6.4+. Fractional seconds support with up to 6 digits of precision
    DATEONLY: Sequelize.DATEONLY,               // DATE without time.
    BOOLEAN: Sequelize.BOOLEAN,                  // TINYINT(1)

    // Sequelize.ENUM('value 1', 'value 2')  // An ENUM with allowed values 'value 1' and 'value 2'
    // Sequelize.ARRAY(Sequelize.TEXT)       // Defines an array. PostgreSQL only.

    // Sequelize.JSON                        // JSON column. PostgreSQL, SQLite and MySQL only.
    // Sequelize.JSONB                       // JSONB column. PostgreSQL only.

    // Sequelize.BLOB                        // BLOB (bytea for PostgreSQL)
    // Sequelize.BLOB('tiny')                // TINYBLOB (bytea for PostgreSQL. Other options are medium and long)

    // Sequelize.UUID                        // UUID datatype for PostgreSQL and SQLite, CHAR(36) BINARY for MySQL (use defaultValue: Sequelize.UUIDV1 or Sequelize.UUIDV4 to make sequelize generate the ids automatically)

    // Sequelize.RANGE(Sequelize.INTEGER)    // Defines int4range range. PostgreSQL only.
    // Sequelize.RANGE(Sequelize.BIGINT)     // Defined int8range range. PostgreSQL only.
    // Sequelize.RANGE(Sequelize.DATE)       // Defines tstzrange range. PostgreSQL only.
    // Sequelize.RANGE(Sequelize.DATEONLY)   // Defines daterange range. PostgreSQL only.
    // Sequelize.RANGE(Sequelize.DECIMAL)    // Defines numrange range. PostgreSQL only.

    // Sequelize.ARRAY(Sequelize.RANGE(Sequelize.DATE)) // Defines array of tstzrange ranges. PostgreSQL only.

    // Sequelize.GEOMETRY                    // Spatial column.  PostgreSQL (with PostGIS) or MySQL only.
    // Sequelize.GEOMETRY('POINT')           // Spatial column with geometry type. PostgreSQL (with PostGIS) or MySQL only.
    // Sequelize.GEOMETRY('POINT', 4326)     // Spatial column with geometry type and SRID.  PostgreSQL (with PostGIS) or MySQL only.
  },
 
  _transaction(cb) {

    return new Promise((resolve, reject) => {
      sequelize.transaction(function (t) {

        // // chain all your queries here. make sure you return them.
        // return User.create({
        //   firstName: 'Abraham',
        //   lastName: 'Lincoln'
        // }, {transaction: t}).then(function (user) {
        //   return user.setShooter({
        //     firstName: 'John',
        //     lastName: 'Boothe'
        //   }, {transaction: t});
        // });
        return cb({ transaction: t })

      }).then(function (result) {
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback
        resolve(result)
      }).catch(function (err) {
        reject(err)
      })
    })



  }
}

module.exports = Model
