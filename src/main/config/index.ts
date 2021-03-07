import ControllerInterface from 'main/services/controllers/ControllerInterface';

import MagicHomeController from 'main/services/controllers/MagicHomeController';

interface IConfig {
  controllers: ControllerInterface[];
}

const config: IConfig = {
  controllers: [
    new MagicHomeController(),
  ],
};

export default config;
