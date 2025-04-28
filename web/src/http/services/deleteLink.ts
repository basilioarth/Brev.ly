import apiClient from "../api";

export async function deleteLink(linkId: string): Promise<void> {
    try {
        await apiClient.delete(`/urls/${linkId}`);
    } catch (error: any) {
        throw error;
    }
};