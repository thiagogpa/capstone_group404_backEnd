const log4js = require("log4js");
const {
  SERVER_LOG_LEVEL,
  SERVER_LOG_CATEGORY,
  SERVER_LOG_FILE,
} = require("./../../config");

class AppLogger {
  /**
   * @param {log4js} logger
   */
  constructor(logger) {
    if (AppLogger.instance) {
      return AppLogger.instance;
    }
    AppLogger.instance = this;


    this.logger = logger;
    this.logger.configure({
      appenders: {
        file: {
          type: "dateFile",
          filename: SERVER_LOG_FILE,
          keepFileExt: true,
          layout: { type: "pattern", pattern: "[%d] [%p] %m" },
        },
        console: {
          type: "console",
          layout: { type: "pattern", pattern: "%[[%d] [%p]%] %m" },
        },
      },
      categories: {
        default: { appenders: ["console"], level: SERVER_LOG_LEVEL },
        file: { appenders: ["file"], level: SERVER_LOG_LEVEL },
      },
    });
  }

  //Change this to set the log to a file instead of console
  getLogger() {
    return this.logger.getLogger(SERVER_LOG_CATEGORY);
  }
}

const instance = new AppLogger(log4js);

module.exports.logger = instance.getLogger();
