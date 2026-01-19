import { NextResponse } from 'next/server';
import { BrasilApiResponse, ApiErrorResponse } from '../../types/brasilApi';

export async function GET(): Promise<
  NextResponse<BrasilApiResponse> | NextResponse<ApiErrorResponse>
> {
  try {
    const response = await fetch('https://brasilapi.com.br/api/feriados/v1/2025');
    
    if (!response.ok) {
      return NextResponse.json<ApiErrorResponse>(
        { error: `API request failed: ${response.status}` },
        { status: response.status }
      );
    }
    
    const data: BrasilApiResponse = await response.json();
    
    return NextResponse.json<BrasilApiResponse>(data);
  } catch (error) {
    return NextResponse.json<ApiErrorResponse>(
      { error: error instanceof Error ? error.message : 'Failed to fetch holidays' },
      { status: 500 }
    );
  }
}
