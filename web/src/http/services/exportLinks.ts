import apiClient from "../api";

export async function exportLinks(): Promise<{ reportUrl: string }> {
    try {
        const response = await apiClient.post('/urls/exports');

        return response.data;
    } catch (error: any) {
        throw error;
    }
}