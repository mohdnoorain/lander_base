import type { NextApiRequest, NextApiResponse } from 'next'
import fs from "fs";
import { DB_PATHS, DB_PATHS_FALLBACK, RES_STATUS } from '../constants/commonConst';
import { NextRequest, NextResponse } from 'next/server';
import RequestHelper from '../helpers/requestHelper';
type ResponseData = {
    message: string;
}


export function GET(
    req: NextRequest,

) {
    try {
        // const path = fs.existsSync(DB_PATHS.MainSection) ? DB_PATHS.MainSection : DB_PATHS_FALLBACK.MainSection;
        // console.log(path);
        // const fileData = fs.readFileSync(path, "utf-8");
        // const mainSection = JSON.parse(fileData);
        return Response.json({
            "imgUrl": "https://unitedestates.com/wp-content/uploads/2022/11/Binghatti-1.2-1024x576.jpg",
            "AddressTitle": "BINGHATTI CORNER AAAAAAA",
            "AddressInfo1": "JUMEIRAH VILLAGE CIRCLE, DUBAI",
            "AddressInfo2": "THE TALLEST AND LARGEST TOWER IN JUMEIRAH CIRCLE"
        });

    } catch (error: any) {

        const data = {
            message: error?.message || "Oops! something went wrong",
            errorStack: "admin/mainSection"
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
        fs.writeFileSync(DB_PATHS.MainSection, JSON.stringify(body, null, 2));

        return new Response(JSON.stringify({}),
            {
                status: RES_STATUS.success,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error: any) {

        const data = {
            message: error?.message || "Oops! something went wrong",
            errorStack: "admin/mainSection"
        };

        return new Response(JSON.stringify(data),
            {
                status: RES_STATUS.badRequest,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}