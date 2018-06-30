import { StockTicker } from '../../data_models/general';

export interface UsageState {
	activeStock: string;
	activeDateRangeId: string;
	fromDate: string;
	toDate: string;
	validStocks: StockTicker[];
}
