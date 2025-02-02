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
    req: NextRequest,

) {
    try {

        // const fileData = fs.readFileSync(DB_PATHS.Nearbysection, "utf-8");
        // const Nearbysection = JSON.parse(fileData);
        return Response.json({
            "NearBy": [
                [
                    "9",
                    "to Mall of Emirates"
                ],
                [
                    "10",
                    "Dubai Marina"
                ],
                [
                    "12",
                    "to Downtown Dubai"
                ],
                [
                    "30",
                    "to DXB International Airport"
                ]
            ],
            "LocationUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28853.986752406946!2d55.1783!3d25.0657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6d74fbe71459%3A0x2eaf10d05d9f8c74!2sBinghatti%20Corner!5e0!3m2!1sen!2s!4v1699689478337!5m2!1sen!2s&hl=en&mapaction=embed&output=embed"
        });

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


export async function POST(request: NextRequest) {
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