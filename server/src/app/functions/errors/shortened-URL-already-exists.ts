export class ShortenedURLAlreadyExists extends Error {
    constructor() {
        super('Shortened URL already exists.')
    }
}