export class Logger {
  constructor(private debugMode: boolean) {}

  public debug(msg: string, ...supportingDetails: any[]): void {
    this.emitLog("log", msg, ...supportingDetails);
  }

  public info(msg: string, ...supportingDetails: any[]): void {
    this.emitLog("info", msg, ...supportingDetails);
  }

  public warn(msg: string, ...supportingDetails: any[]): void {
    this.emitLog("warn", msg, ...supportingDetails);
  }

  public error(msg: string, ...supportingDetails: any[]): void {
    this.emitLog("error", msg, ...supportingDetails);
  }

  private emitLog(
    logType: "log" | "info" | "warn" | "error",
    msg: string,
    ...supportingDetails: any[]
  ) {
    if (logType === "log") {
      if (this.debugMode) {
        console[logType](msg, ...supportingDetails);
      }
    } else {
      console[logType](msg, ...supportingDetails);
    }
  }
}
