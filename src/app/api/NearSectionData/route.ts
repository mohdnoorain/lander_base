import type { NextApiRequest, NextApiResponse } from 'next'
import fs from "fs";
import { DB_PATHS, RES_STATUS } from '../constants/commonConst';
import RequestHelper from '../helpers/requestHelper';
import { NextRequest, NextResponse } from 'next/server';

type ResponseData = {
    NearBy: [];
    LocationUrl: string;
};

export function GET(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {

        const fileData = fs.readFileSync(DB_PATHS.Nearbysection, "utf-8");
        const Nearbysection = JSON.parse(fileData);
        return Response.json(Nearbysection);

    } catch (error: any) {

        const data = {
            message: error?.message || "Oops! something went wrong",
            errorStack: "admin/nearbysection"
        };

        return new Response(JSON.stringify(data),
            {
                status: RES_STATUS.badRequest,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}


export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const body = await RequestHelper.parseBody(request);

        const { } = body;
        console.log("body", body);

        fs.writeFileSync(DB_PATHS.Nearbysection, JSON.stringify(body, null, 2));

        return new Response(JSON.stringify({}),
            {
                status: RES_STATUS.success,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error: any) {

        const data = {
            message: error?.message || "Oops! something went wrong",
            errorStack: "admin/neaybysection"
        };

        return new Response(JSON.stringify(data),
            {
                status: RES_STATUS.badRequest,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}