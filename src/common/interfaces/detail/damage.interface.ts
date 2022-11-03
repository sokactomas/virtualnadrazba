export interface IDamage {
    score: number;
    box: number[];
    damage_category: string;
    damage_location: string;
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