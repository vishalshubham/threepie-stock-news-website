import { StockTicker } from "../../data_models/general";

export interface UsageState {
	activeStock: string;
	activeTimeRangeId: string;
	validStocks: StockTicker[];
}
