'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {


  // Criando tabela products com os seguintes campos:
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,  // 1, 2 ,3 ,4 Segue uma sequencia
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      path: {
        type: Sequelize.STRING(),
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING(),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE(),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE(),
        allowNull: false,
      },

    });

  },

  // Removendo tabela products
  async down(queryInterface) {
    await queryInterface.dropTable('products');

  }
};
