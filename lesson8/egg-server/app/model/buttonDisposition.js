'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const ButtonDisposition =  app.model.define('button-disposition', {
        id: {type: INTEGER, primaryKey: true, autoIncrement: true},
        sourceName: STRING(30),
        sourceValue: INTEGER,
        projectId: STRING(30),
        role: STRING(30),
        introduce: STRING(200),
        created_at: DATE,
        updated_at: DATE,
    });

    return ButtonDisposition;
};
