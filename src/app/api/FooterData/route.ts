import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    message: string
}

export function GET(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const Footer = [
        "home",
        "sdfghj",
        "fghji",
        "ghjkl;"
    ];
    return Response.json(Footer);
}