import apiClient from "../api";
import { Link } from "../../interfaces/Link";

export async function createNewLink(originalUrl: string, shortenedUrl: string): Promise<Link> {
    const data = {
        "original_url": originalUrl,
        "shortened_url": shortenedUrl
    }

    try {
        const response = await apiClient.post<Link>('/urls', data);

        return response.data;
    } catch (error: any) {
        throw error;
    }
}