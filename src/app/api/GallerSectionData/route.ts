import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = [string];

export function GET(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const GallerySection = [
        "https://unitedestates.com/wp-content/uploads/2022/11/311710769_200494399033739_7424501755099942867_n.jpg",
        "https://unitedestates.com/wp-content/uploads/2022/11/Binghatti-pool.jpg",
        "https://unitedestates.com/wp-content/uploads/2022/11/binghatti-2.png",
        "https://unitedestates.com/wp-content/uploads/2022/11/Binghatti-1..jpg",
        "https://unitedestates.com/wp-content/uploads/2022/11/Binghatti-dubai-city-view.jpg",
    ];
    return Response.json(GallerySection);
}