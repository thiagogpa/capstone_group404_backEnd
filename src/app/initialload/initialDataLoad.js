//Created by Marins initial load
const db = require("../config/db.config");
const Bin = db.bins;
const Op = db.Sequelize.Op;
const { logger } = require("../config/logger");

const binlist = require('./binlist'); //this are bins for loading

// Create and Save a new Bin
exports.loadBins = () => {
  
     binlist.forEach((bin)=>Bin.create(bin)
                         .then(logger.trace(`Bin ${bin.id} added`)));

  };
