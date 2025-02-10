export interface CardModel {
    _id: string;
    language: string;
    original: string;
    translation: string;
    phonetic?: string;
    context?: string;
    superMemo: {
        repititions: number;
        EF: number;
        interval: number;
    },
    image?: string;
}

export interface UserModel {
    email: string;
    name: string;
    cards: Array<{language: string; cards: Array<CardModel>}>
}