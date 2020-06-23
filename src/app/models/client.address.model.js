module.exports = (sequelize, Sequelize) => {
  const Address = require("./address.model")(sequelize, Sequelize);
  const Client = require("./client.model")(sequelize, Sequelize);

  const ClientAddressHistory = sequelize.define(
    "client_address_history",
    {
      ClientId: {
        field: "client_id",
        type: Sequelize.INTEGER,
        references: {
          model: Client,
          key: "id",
        },
      },
      AddressId: {
        field: "address_id",
        type: Sequelize.INTEGER,
        references: {
          model: Address,
          key: "id",
        },
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  //Address.belongsToMany(Client, { through: 'ActorMovies' });
  //Client.belongsToMany(Address, { through: 'ActorMovies' });

  return ClientAddressHistory;
};
