import apiClient from "../api";

export async function deleteLink(shortenedUrl: string): Promise<void> {
    try {
        await apiClient.delete(`/urls/${shortenedUrl}`);
    } catch (error: any) {
        throw error;
    }
};