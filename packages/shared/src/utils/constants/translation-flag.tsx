import React from 'react';
import {
    FlagArabLeagueIcon,
    FlagBangladeshIcon,
    FlagCambodiaIcon,
    FlagChinaSimplifiedIcon,
    FlagChinaTraditionalIcon,
    FlagFranceIcon,
    FlagGermanyIcon,
    FlagIndonesiaIcon,
    FlagItalyIcon,
    FlagMongoliaIcon,
    FlagPolandIcon,
    FlagPortugalIcon,
    FlagRussiaIcon,
    FlagSouthKoreaIcon,
    FlagSpainIcon,
    FlagSriLankaIcon,
    FlagTanzaniaIcon,
    FlagThailandIcon,
    FlagTurkeyIcon,
    FlagUnitedKingdomIcon,
    FlagUzbekistanIcon,
    FlagVietnamIcon,
} from '@deriv/quill-icons';

const flagComponents = {
    AR: FlagArabLeagueIcon,
    EN: FlagUnitedKingdomIcon,
    ES: FlagSpainIcon,
    BN: FlagBangladeshIcon,
    DE: FlagGermanyIcon,
    FR: FlagFranceIcon,
    ID: FlagIndonesiaIcon,
    IT: FlagItalyIcon,
    KM: FlagCambodiaIcon,
    KO: FlagSouthKoreaIcon,
    MN: FlagMongoliaIcon,
    PL: FlagPolandIcon,
    PT: FlagPortugalIcon,
    RU: FlagRussiaIcon,
    SI: FlagSriLankaIcon,
    SW: FlagTanzaniaIcon,
    TR: FlagTurkeyIcon,
    UZ: FlagUzbekistanIcon,
    VI: FlagVietnamIcon,
    ZH_CN: FlagChinaSimplifiedIcon,
    ZH_TW: FlagChinaTraditionalIcon,
    TH: FlagThailandIcon,
};

type TTranslationFlag = {
    [key: string]: (width?: number, height?: number) => React.ReactNode;
};

export const TranslationFlag: TTranslationFlag = Object.fromEntries(
    Object.entries(flagComponents).map(([key, FlagComponent]) => [
        key,
        (width, height) => <FlagComponent width={width} height={height} />,
    ])
);
