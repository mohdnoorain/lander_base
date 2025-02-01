import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest } from 'next/server';

type ResponseData = [string];

export function GET(
    req: NextRequest,

) {
    const countryNames = [
        "Afghanistan",
        "Albania",
        "Argentina",
        "Australia",
        "Austria",
        "Bangladesh",
        "Belgium",
        "Brazil",
        "Canada",
        "Chile",
        "China",
        "Colombia",
        "Cuba",
        "Czech Republic",
        "Denmark",
        "Egypt",
        "Finland",
        "France",
        "Germany",
        "Greece",
        "Hungary",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Japan",
        "Kenya",
        "Malaysia",
        "Mexico",
        "Netherlands",
        "New Zealand",
        "Nigeria",
        "Norway",
        "Pakistan",
        "Philippines",
        "Poland",
        "Portugal",
        "Russia",
        "Saudi Arabia",
        "Singapore",
        "South Africa",
        "South Korea",
        "Spain",
        "Sri Lanka",
        "Sweden",
        "Switzerland",
        "Thailand",
        "Turkey",
        "United Kingdom",
        "United States"
    ];

    return Response.json(countryNames);
}