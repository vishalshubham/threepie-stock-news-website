/** general key/value object */
export interface KVMap<T> {
  [key: string]: T;
}

export interface ThresholdData {
	above: number;
	below: number;
}
