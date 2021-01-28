export interface Game {
    name: string;
    background_image: string;
    rating: string;
    slug: string;
    description: string;
}

export interface SearchResponse {
    next: string;
    results: Game[];
}
