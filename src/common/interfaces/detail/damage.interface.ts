export interface IDamage {
    score: number;
    box: number[];
}

export interface IPhotoDamage {
    photo: string;
    result: {
        photo: string;
        urlExpiry: string;
        isDamaged: boolean;
        damages: IDamage[]
    };
}