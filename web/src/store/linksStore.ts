import { create } from 'zustand';
import { Link } from '../interfaces/Link';

interface LinksState {
    linksList: Link[];
    addLink: (newLink: Link) => void;
    removeLink: (linkId: string) => void;
    setLinksList: (links: Link[]) => void;
}

export const useLinksStore = create<LinksState>((set) => ({
    linksList: [],

    addLink: (newLink) =>
        set((state) => ({
            linksList: [newLink, ...state.linksList],
        })),
    
    removeLink: (linkId) => 
        set((state) => ({
            linksList: state.linksList.filter((link) => link.id !== linkId),
        })),

    setLinksList: (links) =>
        set(() => ({
            linksList: links,
        })),
}));