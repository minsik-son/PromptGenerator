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
    title?: string;
    theme: string;
    language: string;
    genres?: string;
    keys?: string;
    tempos?: string;
    moods?: string;
    vocalType?: string;
    vocalEffect?: string;
    instruments?: string[];
    structure?: string;
    additionalMeta?: string;
    hasTitle?: string;
}