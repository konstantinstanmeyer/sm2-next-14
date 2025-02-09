export interface Card {
    _id: string;
    language: string;
    original: string;
    translation: string;
    phonetic?: string;
    isCharacter: boolean;
    context?: string;
    superMemo: {
        repititions: number;
        EF: number;
        interval: number;
    }
}

export interface UserModel {
    email: string;
    name: string;
    cards: Array<{language: string; cards: Array<Card>}>
}

export interface CardModel {
    text: string;
}