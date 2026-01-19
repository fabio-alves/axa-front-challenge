jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({
      json: async () => data,
      status: init?.status || 200,
    })),
  },
}));

import { GET } from '../../../api/holidays/route';

global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe('/api/holidays route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return holidays data successfully', async () => {
    const mockHolidays = [
      {
        date: '2025-01-01',
        name: 'Confraternização mundial',
        type: 'national',
      },
      {
        date: '2025-04-21',
        name: 'Tiradentes',
        type: 'national',
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockHolidays,
    });

    const response = await GET();
    const data = await response.json();

    expect(global.fetch).toHaveBeenCalledWith(
      'https://brasilapi.com.br/api/feriados/v1/2025'
    );
    expect(response).toBeDefined();
    expect(data).toEqual(mockHolidays);
  });

  it('should return error when API request fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toBe('API request failed: 404');
  });

  it('should return error when fetch throws exception', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Network error')
    );

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Network error');
  });

  it('should return generic error message when error is not an Error instance', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce('Unknown error');

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to fetch holidays');
  });

  it('should handle empty response from API', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    const response = await GET();
    const data = await response.json();

    expect(response).toBeDefined();
    expect(data).toEqual([]);
  });
});
