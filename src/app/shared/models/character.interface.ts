export interface FilterResponse {
    value:  string;
    label:  string;
    color?:  string;
}
export interface Character {
    id: number;
    name: string;
    ki: string;
    maxKi: string;
    race: string;
    gender: string;
    description: string;
    image: string;
    affiliation: string;
    deletedAt: string | null;
    originPlanet?:  OriginPlanet;
    transformations?:   Transformation[];
}

export interface OriginPlanet {
    id:          number;
    name:        string;
    isDestroyed: boolean;
    description: string;
    image:       string;
    deletedAt:   null;
}

export interface Transformation {
    id:        number;
    name:      string;
    image:     string;
    ki:        string;
    deletedAt: null;
}