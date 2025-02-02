import type { NextApiRequest, NextApiResponse } from 'next'
import fs from "fs"
import { DB_PATHS, RES_STATUS } from '../constants/commonConst';
import { NextRequest, NextResponse } from 'next/server';
import RequestHelper from '../helpers/requestHelper';
type ResponseData = [
    string[],
    string[],
    string[]
];
export function GET(
    req: NextRequest,

) {
    try {

        // const fileData = fs.readFileSync(DB_PATHS.similiarprojectsection, "utf-8");
        // const Feature = JSON.parse(fileData);
        return Response.json([
            [
                "https://unitedestates.com/wp-content/uploads/2022/11/Binghatti-1.2-1024x576.jpg",
                "https://unitedestates.com/wp-content/uploads/2022/09/creek-vista-cover-1024x464.jpg",
                "https://unitedestates.com/wp-content/uploads/2022/08/binghatti-Luna-1024x585.jpg"
            ],
            [
                "BINGHATTI CORNER56",
                "SOBHA CREEK VISTA DISTRICT",
                "BINGHATTI LUNA"
            ],
            [
                " CHOICE OF 1 & 2 BR LUXURY APARTMENTS JUMEIRAH VILLAGE CIRCLE, DUBAI",
                "PRE LAUNCHING AT CREEK VISTA DISTRICT The Height Of Sheer Class 1 to 3.5 Bed Bespoke Luxury Apartments",
                "1, 2 & 3 BR LUXURY APARTMENTS JUMEIRAH VILLAGE CIRCLE, DUBAI"
            ]
        ]);

    } catch (error: any) {

        const data = {
            message: error?.message || "Oops! something went wrong",
            errorStack: "admin/similarpropertysection"
        };

        return new Response(JSON.stringify(data),
            {
                status: RES_STATUS.badRequest,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await RequestHelper.parseBody(request);

        const { } = body;
        console.log("body", body);

        fs.writeFileSync(DB_PATHS.similiarprojectsection, JSON.stringify(body, null, 2));

        return new Response(JSON.stringify({}),
            {
                status: RES_STATUS.success,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error: any) {

        const data = {
            message: error?.message || "Oops! something went wrong",
            errorStack: "admin/similarprojectsection"
        };

        return new Response(JSON.stringify(data),
            {
                status: RES_STATUS.badRequest,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}