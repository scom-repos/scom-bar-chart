import { ModeType } from "../global/index";

export interface IConfigData {
  mode: ModeType;
  apiEndpoint: string;
  file?: {
    cid?: string,
    name?: string
  },
  chartData?: string;
}
