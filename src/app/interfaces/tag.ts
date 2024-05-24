import { SafeUrl } from "@angular/platform-browser";
import {v4 as uuid} from 'uuid';

export interface TagItem {
    id: string;
    name: string;
    removed: boolean;
    creationDate: Date;
    modificationDate: Date;
}

export interface TagsResponse {
    data:  Array<TagItem>;
}