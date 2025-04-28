import { create } from 'zustand';
import { Link } from '../interfaces/Link';

interface LinksState {
    linksList: Link[];
    addLink: (newLink: Link) => void;
    setLinksList: (links: Link[]) => void;
}

export const useLinksStore = create<LinksState>((set) => ({
    linksList: [],

    addLink: (newLink) =>
        set((state) => ({
            linksList: [newLink, ...state.linksList],
        })),

    setLinksList: (links) =>
        set(() => ({
            linksList: links,
        })),
}));