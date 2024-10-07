import { Character } from "./character.interface";
import { Links } from "./links.interface";
import { Meta } from "./meta.interface";

export interface ApiResponse {
    items: Character[];
    meta: Meta;
    links: Links;
}
