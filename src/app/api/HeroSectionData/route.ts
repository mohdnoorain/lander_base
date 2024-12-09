import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    message: string;
}


export function GET(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const HeroSection = {
        imgUrl:
            "https://unitedestates.com/wp-content/uploads/2022/11/Binghatti-1.2-1024x576.jpg",
        AddressTitle: "BINGHATTI CORNER",
        AddressInfo1: "JUMEIRAH VILLAGE CIRCLE, DUBAI",
        AddressInfo2: "THE TALLEST AND LARGEST TOWER IN JUMEIRAH CIRCLE",
    };
    return Response.json(HeroSection);
}