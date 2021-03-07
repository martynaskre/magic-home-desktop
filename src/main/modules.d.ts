declare module 'electron-positioner' {
  interface Position {
    x: number;
    y: number;
  }

  class Positioner {
    constructor(browserWindow: BrowserWindow): void;
    calculate(position: string, trayPos: Electron.Rectangle): Position;
  }

  export = Positioner;
}

declare module 'tray-window-state-manager' {
  interface TrayWindowStateManager {
    togglePopup(): void;
    hidePopup(): void;
    showPopup(): void;
  }

  export = TrayWindowStateManager;
}

declare module 'magic-home' {
  interface Ack {
    power: boolean;
    color: boolean;
    pattern: boolean;
    custom_pattern: boolean;
  }

  interface ControlOptions {
    wait_for_reply: boolean;
    log_all_received: boolean;
    apply_masks: boolean;
    cold_white_support: boolean;
    connect_timeout: number;
    command_timeout: number;
    ack: Ack;
  }

  interface Color {
    red: number;
    green: number;
    blue: number;
  }

  interface QueryResponse {
    type: number;
    on: boolean;
    mode: string;
    pattern: string | null;
    speed: number;
    color: Color;
    warm_white: number;
    cold_white: number;
  }

  interface Device {
    address: string;
    id: string;
    model: string;
  }

  class Control {
    _address: string;
    _commandQueue: Array<>;

    constructor(address: string, options: ControlOptions = {});

    setPower(on: boolean);
    queryState(): QueryResponse;
    setColorWithBrightness(red: number, green: number, blue: number, brightness: number): boolean;
  }

  class Discovery {
    scan(timeout: number = 500): Array<Device>;
  }
}
