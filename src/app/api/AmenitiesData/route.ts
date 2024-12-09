import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = [string];

export function GET(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const Amenities = [
        "Concierge",
        "Gym",
        "Kids Pool",
        "Park",
        "Play Area",
        "Restaurant",
        "Retail",
        "Swimming Pool",
        "Leisure Areas",
        "Dining Outlets",
        "Healthcare Center",
        "Parking",
    ];
    return Response.json(Amenities);
}