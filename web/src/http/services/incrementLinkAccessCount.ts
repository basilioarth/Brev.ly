import apiClient from "../api";

export async function incrementLinkAccessCount(shortenedUrl: string): Promise<{originalUrl: string}> {
    try {
        const response = await apiClient.patch(`/urls/increment-access-count/${shortenedUrl}`);

        return response.data;
    } catch (error: any) {
        throw error;
    }
}