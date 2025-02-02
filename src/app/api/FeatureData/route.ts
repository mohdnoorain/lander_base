import type { NextApiRequest, NextApiResponse } from 'next'
import fs from "fs";
import { DB_PATHS, RES_STATUS } from '../constants/commonConst';
import RequestHelper from '../helpers/requestHelper';
import { NextRequest, NextResponse } from 'next/server';
import { features } from 'process';

type ResponseData = [string, string, string][];


export function GET(
    req: NextRequest,

) {
    try {

        // const fileData = fs.readFileSync(DB_PATHS.Feature, "utf-8");
        // const Feature = JSON.parse(fileData);
        return Response.json([
            [
                "https://unitedestates.com/wp-content/uploads/2022/08/wallet.png",
                "5,55,000",
                "Starting Price"
            ],
            [
                "https://unitedestates.com/wp-content/uploads/2022/08/percentage.png",
                "60/40",
                "Starting Price"
            ],
            [
                "https://unitedestates.com/wp-content/uploads/2022/08/give.png",
                "Q4 2023 TO Q1 2024",
                "Handover"
            ],
            [
                "https://unitedestates.com/wp-content/uploads/2022/08/bed.png",
                "JUMEIRAH VILLAGE CIRCLE, DUBAI",
                "Location"
            ],
            [
                "https://unitedestates.com/wp-content/uploads/2022/08/placeholder.png",
                "JUMEIRAH VILLAGE CIRCLE, DUBAI",
                "Location"
            ],
            [
                "https://unitedestates.com/wp-content/uploads/2022/08/hook.png",
                "Binghatti Developers",
                "Developer"
            ]
        ]);

    } catch (error: any) {

        const data = {
            message: error?.message || "Oops! something went wrong",
            errorStack: "admin/feature"
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

        fs.writeFileSync(DB_PATHS.Feature, JSON.stringify(body, null, 2));

        return new Response(JSON.stringify({}),
            {
                status: RES_STATUS.success,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error: any) {

        const data = {
            message: error?.message || "Oops! something went wrong",
            errorStack: "admin/feature"
        };

        return new Response(JSON.stringify(data),
            {
                status: RES_STATUS.badRequest,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}