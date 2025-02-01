import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest } from 'next/server';

type ResponseData = {
    message: string
}

export function GET(
    req: NextRequest,

) {
    const Footer = [
        "home",
        "sdfghj",
        "fghji",
        "ghjkl;"
    ];
    return Response.json(Footer);
}