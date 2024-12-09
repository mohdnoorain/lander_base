import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    message: string
}

export function GET(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const EnquirePropertSection = [
        "Download Floor Plan",
        "Download FAQS",
        "Download Brochure",
    ]
    return Response.json(EnquirePropertSection);
}