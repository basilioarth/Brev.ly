import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Link } from '../interfaces/Link';

interface LinksState {
    linksList: Link[];
    addLink: (newLink: Link) => void;
    removeLink: (linkId: string) => void;
    incrementLinkAccessCount: (shortenedUrl: string) => void;
    setLinksList: (links: Link[]) => void;
}

export const useLinksStore = create(
    persist<LinksState>(
        (set) => ({
            linksList: [],

            addLink: (newLink) =>
                set((state) => ({
                    linksList: [newLink, ...state.linksList],
                })),

            removeLink: (linkId) =>
                set((state) => ({
                    linksList: state.linksList.filter((link) => link.id !== linkId),
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
        {
            name: 'links-storage',
            onRehydrateStorage: () => {
                const listener = (event: StorageEvent) => {
                   if (event.key === 'links-storage') {
                       alert('Links storage updated!');
                       const newState = JSON.parse(event.newValue || '{}');
                       useLinksStore.setState(newState);
                   }
                };
                window.addEventListener('storage', listener);
                return () => window.removeEventListener('storage', listener);
            },
        }
    )
);