import { StockTicker } from '../../data_models/general';

export interface UsageState {
	activeStock: string;
	activeDateRangeId: string;
	activeToggle: string;
	validStocks: StockTicker[];
}
