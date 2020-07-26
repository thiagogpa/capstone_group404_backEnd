const db = require("../config/db.config");
const Order = db.orders;
const User = db.users;
const Address = db.addresses;
const Bins = db.bins;
const OrdersBins=db.ordersbins;
const Op = db.Sequelize.Op;
const { logger } = require("../config/logger");

// Create and Save a new Order
exports.create = async (req, res) => {
  logger.trace("Calling Order Creation Api");

        // Validate request
        if (!req.body) {
          res.status(400).send({
            message: "Content can not be empty!",
          });
          return;
        }else if(!req.body.ordersbins){
          res.status(400).send({
            message: "Bins arrray can not be empty!",
          });
          return;
        }
        

  // Create an Order
  const order = {
    orderDate: req.body.orderDate,
    dropOffDate: req.body.dropOffDate,
    pickUpDate: req.body.pickUpDate,
    subtotal: req.body.subtotal,
    taxes: req.body.taxes,
    status: req.body.status,
    userId: req.body.userId,
    addressId: req.body.addressId,
    bins:[],
  };

  req.body.ordersbins.forEach((bin)=>{
                                order.bins.push({binId:bin.id,selected:bin.selected });
                              });
  
   

                            
    // Save Order in the database
    //with assosiations in one transaction 
    
    try{
      const result = await db.sequelize.transaction(async (t)=>{
          const orderResponse={ordersbins:[]};
          const o = await Order.create(order,{transaction:t});
          orderResponse.order=o.dataValues;
          for(i=0;i<order.bins.length;i++){
              let bin = order.bins[i];
                let b = await o.addBins(bin.binId,{ through: { selected: bin.selected },
                                            transaction:t });
              orderResponse.ordersbins.push(b);
          }//for each
          return orderResponse;
        }).then(orderResponse =>res.send(orderResponse) )
        .catch(err=>res.status(500).send({ message: err.message || "Error placing Order.",}));
  }catch(err){
    res.status(500).send({ message: err.message || "Error placing Order.",})
  }
  };


// Retrieve all Order records from the database.
exports.findAll = async (req, res) => {
  logger.trace("Calling Order FindAll Api");

  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Order.findAll({ where: condition, paranoid: false })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Order.",
      });
    });
};

// Find a single Order by its Id
exports.findOne = async (req, res) => {
  logger.trace("Calling Order FindOne Api");
  const id = req.params.id;
  Order.findByPk(id, {
    paranoid: false,
    include: [
      {
        model: User,
        paranoid: false,
      },
      {
        model: Address,
        paranoid: false,
      },
      {
        model: Bins,
        paranoid: false,
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Order with id=" + id,
      });
    });
};

// Updates Order by id
exports.update = async (req, res) => {
  logger.trace("Calling Order update Api");

  const id = req.params.id;

  Order.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Order successfully updated.",
        });
      } else {
        res.send({
          message:
            "Cannot update Order with id=" +
            id +
            ". [Order not found or Id not provided",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Order with id=" + id,
      });
    });
};

// Deletes an Order by Id
exports.delete = async (req, res) => {
  logger.trace("Calling Order Delete Api");

  const id = req.params.id;

  Order.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Order successfully deleted.",
        });
      } else {
        res.send({
          message:
            "Cannot delete Order with id=" +
            id +
            ". [Order not found or Id not provided",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Order with id=" + id,
      });
    });
};

// Delete all Order entries from the database.
exports.deleteAll = async (req, res) => {
  logger.trace("Calling Order Delete All Api");

  Order.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Orders successfully deleted!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error removing all Orders.",
      });
    });
};

// // find all published Orders
// exports.findAllPublished = async (req, res) => {
//   logger.trace('Calling Order FindAll Api');

//   Order.findAll({ where: { published: true } })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Error.",
//       });
//     });
// };
