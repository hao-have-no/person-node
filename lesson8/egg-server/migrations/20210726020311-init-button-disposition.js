'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const { INTEGER, DATE, STRING, } = Sequelize;
    await queryInterface.createTable('button-disposition', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      sourceName: STRING(30),
      sourceValue: STRING(30),
      projectId:STRING(30),
      role: STRING(30),
      introduce:STRING(200),
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('button-disposition');
  }
};
