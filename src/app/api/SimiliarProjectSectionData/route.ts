import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = [
    string[],
    string[],
    string[]
];
export function GET(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const SimiliarProjectSection = [
        [
            "https://unitedestates.com/wp-content/uploads/2022/11/Binghatti-1.2-1024x576.jpg",
            "https://unitedestates.com/wp-content/uploads/2022/09/creek-vista-cover-1024x464.jpg",
            "https://unitedestates.com/wp-content/uploads/2022/08/binghatti-Luna-1024x585.jpg",
        ],
        ["BINGHATTI CORNER", "SOBHA CREEK VISTA DISTRICT", "BINGHATTI LUNA"],
        [
            " CHOICE OF 1 & 2 BR LUXURY APARTMENTS JUMEIRAH VILLAGE CIRCLE, DUBAI",
            "PRE LAUNCHING AT CREEK VISTA DISTRICT The Height Of Sheer Class 1 to 3.5 Bed Bespoke Luxury Apartments",
            "1, 2 & 3 BR LUXURY APARTMENTS JUMEIRAH VILLAGE CIRCLE, DUBAI",
        ],
    ];
    return Response.json(SimiliarProjectSection);
}