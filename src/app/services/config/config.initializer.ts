import { ConfigService } from "..";

export function initializeConfig(configService: ConfigService) {
    return () => configService.init();
  }