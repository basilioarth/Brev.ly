import apiClient from "../api";

export async function getOriginalLinkByShortenedLink(shortenedUrl: string): Promise<{originalUrl: string}> {
    try {
        const response = await apiClient.get(`/urls/original-url/${shortenedUrl}`);

        return response.data;
    } catch (error: any) {
        throw error;
    }
}