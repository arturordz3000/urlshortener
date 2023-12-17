export const getMockFetch = (mockResponse: any) => {
    return jest.fn(() => {
        Promise.resolve({
            json: () => { console.log('oh yea'); return Promise.resolve(mockResponse) }
        })
    }) as jest.Mock;
}