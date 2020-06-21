const log4js = require("log4js");

class AppLogger {
  /**
   * @param {log4js} logger
   */
  constructor(logger) {
    if (AppLogger.instance) {
      return AppLogger.instance;
    }
    AppLogger.instance = this;

    this.appender = {
      DEVELOPMENT: "default",
      FILE: "file",
    };

    this.logger = logger;
    this.logger.configure({
      appenders: {
        file: {
          type: "dateFile",
          filename: "logs/application.log",
          keepFileExt: true,
          layout: { type: "pattern", pattern: "[%d] [%p] %m" },
        },
        console: {
          type: "console",
          layout: { type: "pattern", pattern: "%[[%d] [%p]%] %m" },
        },
      },
      categories: {
        default: { appenders: ["console"], level: "debug" },
        file: { appenders: ["file"], level: "debug" },
      },
    });
  }

  //Change this to set the log to a file instead of console
  getLogger() {
    return this.logger.getLogger(this.appender.DEVELOPMENT);
  }
}

const instance = new AppLogger(log4js);

module.exports.logger = instance.getLogger();
