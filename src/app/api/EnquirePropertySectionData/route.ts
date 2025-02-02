import type { NextApiRequest, NextApiResponse } from 'next'
import fs from "fs"
import { DB_PATHS, RES_STATUS } from '../constants/commonConst';
import { NextRequest, NextResponse } from 'next/server';
import RequestHelper from '../helpers/requestHelper';
type ResponseData = {
    message: string
}

export function GET(
    req: NextRequest,

) {
    try {

        // const fileData = fs.readFileSync(DB_PATHS.EnquirePropertSection, "utf-8");
        // const EnquirePropertSection = JSON.parse(fileData);
        return Response.json([
            "Download FAQS",
            "Download Brochure",
            "Download Floor Plan"
        ]);

    } catch (error: any) {

        const data = {
            message: error?.message || "Oops! something went wrong",
            errorStack: "admin/enquirysection"
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

        fs.writeFileSync(DB_PATHS.EnquirePropertSection, JSON.stringify(body, null, 2));

        return new Response(JSON.stringify({}),
            {
                status: RES_STATUS.success,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error: any) {

        const data = {
            message: error?.message || "Oops! something went wrong",
            errorStack: "admin/enquirysection"
        };

        return new Response(JSON.stringify(data),
            {
                status: RES_STATUS.badRequest,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}