/** general key/value object */
export interface KVMap<T> {
  [key: string]: T;
}

export interface ThresholdData {
	above: number;
	below: number;
}

export interface StockTicker {
  symbol: string;
  name: string;
}

export interface TimePeriod {
  startDateTime: Date;
  endDateTime: Date;
  code: string;
  description: string;
}

export type VoidCallback<T extends KVMap<any> | null> = (...T) => void;
