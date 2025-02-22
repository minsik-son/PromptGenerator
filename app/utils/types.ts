export interface PromptOptions {
    genre?: string;
    mood?: string;
    instruments?: string;
    tempo?: string;
    vocalType?: string;
    songStructure?: string[];
    additionalMeta?: string[];
    soundEffects?: string;
}



//Advanced Lyrics Options
export interface LyricsOptionsAdvanced {
    theme: string;
    language: string;
    title?: string;
    hasTitle?: string;     // 제목 유무 (Yes/No)
    vocalType?: string;
    vocalEffect?: string;
    genres?: string;
    keys?: string;
    tempos?: string;
    moods?: string;
    structure: string;
    instruments?: string[];
    additionalMeta?: string;
}