export interface Photos {
    page: number;
    pages: number;
    perpage: number;
    photo: Photo[];
    total: number;
}
export interface Photo {
    id: string;
    owner: string;
    secret: string;
    server: string;
    farm: string;
    title: string;
    ispublic: string;
    isfriend: string;
    isfamily: string;
    imageUrl: string;
}
