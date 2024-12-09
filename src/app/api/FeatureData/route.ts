import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = [string, string, string][];


export function GET(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const Feature = [
        [
            "https://unitedestates.com/wp-content/uploads/2022/08/wallet.png",
            "5,55,000",
            "Starting Price",
        ],
        [
            "https://unitedestates.com/wp-content/uploads/2022/08/percentage.png",
            "60/40",
            "Starting Price",
        ],
        [
            "https://unitedestates.com/wp-content/uploads/2022/08/give.png",
            "Q4 2023 TO Q1 2024",
            "Handover",
        ],
        [
            "https://unitedestates.com/wp-content/uploads/2022/08/bed.png",
            "JUMEIRAH VILLAGE CIRCLE, DUBAI",
            "Location",
        ],
        [
            "https://unitedestates.com/wp-content/uploads/2022/08/hook.png",
            "Binghatti Developers",
            "Developer",
        ],
    ];
    return Response.json(Feature);
}