import { Language } from "@/typedef/typedef";
import en from'../../lang/en.json';
import it from'../../lang/it.json';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
    language: Language;
    translations: {[key: string]:string};
}

const translationMap = {en, it};

const initialState: LanguageState = {
    language: 'en',
    translations: translationMap['en'],
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state,action:PayloadAction<Language>)=> {
        state.language= action.payload;
        state.translations = translationMap[action.payload];
    },},
});

export const { setLanguage} = languageSlice.actions;
export default languageSlice.reducer;