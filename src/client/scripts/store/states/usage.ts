import { StockTicker, TimePeriod } from '../../data_models/general';

export interface UsageState {
	activeStock: string;
	activeDateRangeId: string;
	activeToggle: string;
	validStocks: StockTicker[];
	validPeriods: TimePeriod[];
}
