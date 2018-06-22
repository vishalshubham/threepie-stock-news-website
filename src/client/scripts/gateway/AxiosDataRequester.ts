'use strict';

import axios, { AxiosResponse } from 'axios';
import { flatten } from 'lodash';
import { KVMap } from 'src/client/scripts/data_models/general';

export let baseURL;
let withCredentials;

// Sample URL: http://ec2-18-188-188-147.us-east-2.compute.amazonaws.com/api/v1/stockAndNews/getAll?symbol=AMZN
const endpoints = {
	beta: 'http://ec2-18-188-188-147.us-east-2.compute.amazonaws.com',
	prod: 'http://ec2-18-188-188-147.us-east-2.compute.amazonaws.com'
};

baseURL = endpoints.beta;
withCredentials = false;

export default class AxiosDataRequester {
	public static async get(url: string, params: KVMap<any>, timeout?: number, headers?: KVMap<any>) {
 		try {
 			const response: AxiosResponse = await axios.get(url, {
 				baseURL,
 				withCredentials,
 				timeout,
 				params,
 				headers,
 			});
 			return response.data;
 		} catch (error) {
 			console.error('API' + url + ' failed to get result');
 			throw error;
 		}
 	}

 	public static async post(url: string, data: KVMap<any>, timeout?: number, params?: KVMap<any>) {
 		try {
 			const response: AxiosResponse = await axios.post(url, data, {
 				baseURL,
 				withCredentials,
 				timeout,
 				params
 			});
 			return response.data;
 		} catch (error) {
 			console.error('API: ' + url + ' failed to get result');
 			throw error;
 		}
 	}
}

