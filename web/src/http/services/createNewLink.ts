import apiClient from "../api";

export async function createNewLink(originalUrl: string, shortenedUrl: string): Promise<{ urlID: string }> {
    const data = {
        "original_url": originalUrl,
        "shortened_url": shortenedUrl
    }

    try {
        const response = await apiClient.post<{ urlID: string}>('/urls', data);

        return response.data;
    } catch (error: any) {
        throw error;
    }
}