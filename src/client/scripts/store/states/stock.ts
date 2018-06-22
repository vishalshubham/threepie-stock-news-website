export interface StockInfoState {
  loading: boolean;
  error: boolean;
  result: StockInfoResult;
}

export interface StockInfoResult {
	data: StockData;
	news: StockNews;
}

export interface StockData {
  information: string;
  symbol: string;
  lastRefreshed: string;
  interval: string;
  outputSize: string;
	timeZone: string;
	values: StockValue[];
}

export interface StockValue {
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	time: Date;
}

export interface StockNews {
	articles: StockArticle[];
}

export interface StockArticle {
	source: string;
	author: string;
	title: string;
	description: string;
	url: string;
	urlToImage: string;
	publishedAt: string;
}


