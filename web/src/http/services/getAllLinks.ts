import apiClient from "../api";
import { Link } from "../../interfaces/Link";

export async function getAllLinks(): Promise<Link[]> {
    try {
        const response = await apiClient.get('/urls');

        return response.data;
    } catch (error: any) {
        throw error;
    }
}