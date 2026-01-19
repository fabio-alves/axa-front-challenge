export interface BrasilApiHoliday {
  date: string; 
  name: string;
  type: 'national' | 'municipal' | 'state';
}

export interface BrasilApiResponse extends Array<BrasilApiHoliday> {}

export interface ApiErrorResponse {
  error: string;
}
