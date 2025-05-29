import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { syncTabs } from 'zustand-sync-tabs';
import { Link } from '../interfaces/Link';

interface LinksState {
    linksList: Link[];
    addLink: (newLink: Link) => void;
    removeLink: (shortenedUrl: string) => void;
    incrementLinkAccessCount: (shortenedUrl: string) => void;
    setLinksList: (links: Link[]) => void;
}

export const useLinksStore = create(
    persist(
        syncTabs<LinksState>(
            (set) => ({
                linksList: [],

                addLink: (newLink) =>
                    set((state) => ({
                        linksList: [newLink, ...state.linksList],
                    })),

                removeLink: (shortenedUrl) =>
                    set((state) => ({
                        linksList: state.linksList.filter((link) => link.shortenedUrl !== shortenedUrl),
                    })),

                incrementLinkAccessCount: (shortenedUrl) =>
                    set((state) => ({
                        linksList: state.linksList.map((link) =>
                            link.shortenedUrl === shortenedUrl
                                ? { ...link, accessCount: link.accessCount + 1 }
                                : link
                        ),
                    })),
                    
                setLinksList: (links) => set(() => ({ linksList: links })),
            }),
            { name: 'links-storage-channel' }
        ),
        {
            name: 'links-storage'
        }
    )
);