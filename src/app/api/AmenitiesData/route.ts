import type { NextApiRequest, NextApiResponse } from 'next'
import fs from "fs";
import RequestHelper from '../helpers/requestHelper';
import { NextRequest, NextResponse } from 'next/server';
import { DB_PATHS, RES_STATUS } from '../constants/commonConst';

type ResponseData = [string];

export function GET(
    req: NextRequest,

) {
    try {

        const fileData = fs.readFileSync(DB_PATHS.AmenitiesData, "utf-8");
        const AmenitiesData = JSON.parse(fileData);
        return Response.json(AmenitiesData);

    } catch (error: any) {

        const data = {
            message: error?.message || "Oops! something went wrong",
            errorStack: "admin/amenities"
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

        fs.writeFileSync(DB_PATHS.AmenitiesData, JSON.stringify(body, null, 2));

        return new Response(JSON.stringify({}),
            {
                status: RES_STATUS.success,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error: any) {

        const data = {
            message: error?.message || "Oops! something went wrong",
            errorStack: "admin/amenities"
        };

        return new Response(JSON.stringify(data),
            {
                status: RES_STATUS.badRequest,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}